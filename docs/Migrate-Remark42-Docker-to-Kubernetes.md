# Remark42 Migration

This guide describes how to migrate Remark42 data from a Docker container (deployed with Ansible) to the new Helm chart deployment on Kubernetes.

## Prerequisites

- Access to the Docker host running the existing Remark42 container
- `kubectl` configured to access the target Kubernetes cluster and namespace
- The Helm chart deployed with a `ReadWriteOnce` PVC (`data-remark42`)
- The Remark42 container exposes the export/import commands via the `remark42` binary

## Overview

Remark42 stores all state — comments, users and uploaded images — on disk under `/srv/var`. The simplest and most reliable migration is to copy the entire data directory from the old container into the new PVC.

Alternatively, Remark42 provides an export/import API that can transfer comments per site. The file-copy approach is preferred because it preserves everything.

## Option 1: Copy the data directory (recommended)

### 1. Stop the old container

Stop the Docker container so that no new comments are written during the migration:

```bash
docker stop remark01
```

### 2. Export the data from the Docker volume

Create a tar archive of the Remark42 data volume. Replace `remark_data01` with the volume name configured in your Ansible role (`remark42_volume_name`).

```bash
docker run --rm -v remark_data01:/srv/var -v "$PWD":/backup alpine \
  tar czf /backup/remark42-data.tar.gz -C /srv/var .
```

This writes `remark42-data.tar.gz` to the current directory.

### 3. Prepare the target PVC

The Remark42 pod must not be running while you write to its PVC. Scale the deployment down:

```bash
kubectl scale deployment remark42-remark42 --replicas=0
```

Use a helper pod that mounts the `data-remark42` PVC to copy the archive into it:

```bash
kubectl run remark42-restore --rm -i --restart=Never \
  --image alpine \
  --overrides='{
    "spec": {
      "containers": [{
        "name": "remark42-restore",
        "image": "alpine",
        "command": ["sh", "-c", "tar xzf /backup/remark42-data.tar.gz -C /srv/var && chown -R 100:100 /srv/var"],
        "volumeMounts": [
          {"name": "data", "mountPath": "/srv/var"},
          {"name": "backup", "mountPath": "/backup"}
        ]
      }],
      "volumes": [
        {"name": "data", "persistentVolumeClaim": {"claimName": "data-remark42"}},
        {"name": "backup", "hostPath": {"path": "'"$PWD"'"}}
      ]
    }
  }'
```

If the cluster does not allow mounting host directories, first copy the archive into the helper pod with `kubectl cp`:

```bash
kubectl run remark42-restore --image alpine --restart=Never \
  --command -- sleep 3600 \
  --overrides='{"spec":{"containers":[{"name":"remark42-restore","image":"alpine","command":["sleep","3600"],"volumeMounts":[{"name":"data","mountPath":"/srv/var"}]}],"volumes":[{"name":"data","persistentVolumeClaim":{"claimName":"data-remark42"}}]}}'

kubectl cp remark42-data.tar.gz remark42-restore:/tmp/remark42-data.tar.gz
kubectl exec remark42-restore -- tar xzf /tmp/remark42-data.tar.gz -C /srv/var
kubectl exec remark42-restore -- chown -R 100:100 /srv/var
kubectl delete pod remark42-restore
```

### 4. Start the new deployment

```bash
kubectl scale deployment remark42-remark42 --replicas=1
```

### 5. Verify

Check that the pod starts and Remark42 serves the migrated comments:

```bash
kubectl logs -f deployment/remark42-remark42
```

Open `https://comment.janikvonrotz.ch` and confirm the comments are present.

## Option 2: Use the Remark42 export/import API

Remark42 exposes an import endpoint that accepts the export archive produced by the `export` command. This is useful when the source and target instances run different versions or you cannot copy files directly.

### 1. Export from the old container

```bash
docker exec remark01 /srv/remark42 export \
  --site "remark,janikvonrotz.ch" \
  --secret "$REMARK42_SECRET" \
  --file /srv/var/backup/remark42-export.json.gz
```

Copy the export file out of the container:

```bash
docker cp remark01:/srv/var/backup/remark42-export.json.gz ./remark42-export.json.gz
```

### 2. Import into the new instance

```bash
curl -X POST \
  -H "Authorization: Bearer $REMARK42_SECRET" \
  -F "file=@remark42-export.json.gz" \
  "https://comment.janikvonrotz.ch/api/v1/admin/import?site=janikvonrotz.ch"
```

Refer to the [Remark42 documentation](https://remark42.com/docs/manuals/backup/) for the exact export/import flags of your version.

## Post-migration

- Update the DNS records for `comment.janikvonrotz.ch` to point to the Kubernetes ingress.
- Remove the old Docker container and volume once the migration is verified.
- Enable K8up backups (`k8up.enabled: true`) and create the `s3-credentials` secret.

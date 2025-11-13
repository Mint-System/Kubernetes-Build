# Backup

All charts use [k8up](https://k8up.io/) for backup definitions.

You can enable backups with `k8up.enabled`. And if you have setup the S3 bucket secrets properly, your service will be backed up automatically.

## Tutorial

The following section is meant to be tutorial and an example on how the backup and restore procedure works for the Odoo chart.

Let's assume we have successfully deployed an Odoo chart with these values:

```yaml
kind: deployment
image: mintsystem/odoo:18.0.20251008
ingress:
  host: restic.knd.local
staging:
  enabled: true
k8up:
  enabled: true
  endpoint: https://sos-ch-gva-2.exo.io
  bucket: k8up.mintcloud.ch
```

The required secrets have been created.

After the deployment of the Odoo chart we list the pods:

```bash
*[main][~/Kubernetes-Build]$ k get pods
NAME                                 READY   STATUS      RESTARTS   AGE
backup-odoo-backup-0-xdc7p           0/1     Completed   0          53s
odoo-odoo-6856f7c7d-d8v77            1/1     Running     0          53s
odoo-odoo-staging-6bdb8b546d-qp4lv   1/1     Running     0          53s
odoo-postgresql-1                    1/1     Running     0          30m
```

The backup pod is in status completed. This means there should be a backup object.

```bash
*[main][~/Kubernetes-Build]$ k get backup
NAME          SCHEDULE REF   COMPLETION   PREBACKUP              AGE
odoo-backup                  Succeeded    NoPreBackupPodsFound   4m2s
```

Under the Odoo the k8up backup operator uses restic. Lets list the restic snapshots:

```bash
*[main][~/Kubernetes-Build]$ kubectl get snapshots
NAME       DATE TAKEN             PATHS                     REPOSITORY
598a5152   2025-11-04T18:35:06Z   /data/odoo-postgresql-1   s3:https://sos-ch-gva-2.exo.io/k8up.mintcloud.ch/restic.knd.local
915ad685   2025-11-04T18:35:04Z   /data/data-odoo-staging   s3:https://sos-ch-gva-2.exo.io/k8up.mintcloud.ch/restic.knd.local
9563a938   2025-11-04T18:35:01Z   /data/data-odoo-main      s3:https://sos-ch-gva-2.exo.io/k8up.mintcloud.ch/restic.knd.local
```

The k8up operator has backed up all persistent volumes.

Let's change something and then do a restore. Forward the ingress port with `task forward ingress-nginx` and log into Odoo, then install the To-do app.

Now let's restore the snapshot `9563a938`. Create a pvc for the restore:

```bash
kubectl apply -f - <<EOF
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: restore-test-mfw
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 250Mi
EOF
```

Then create the restore object to start the restore process:

```bash
kubectl apply -f - <<EOF
apiVersion: k8up.io/v1
kind: Restore
metadata:
  name: restore-test-mfw
spec:
  snapshot: 9563a938
  restoreMethod:
    folder:
      claimName: restore-test-mfw
  backend:
    repoPasswordSecretRef:
      name: backup-repo
      key: password
    s3:
      endpoint: https://sos-ch-gva-2.exo.io
      bucket: k8up.mintcloud.ch/restic.knd.local
      accessKeyIDSecretRef:
        name: s3-credentials
        key: username
      secretAccessKeySecretRef:
        name: s3-credentials
        key: password
EOF
```

Check the pods and you will see a restore pod:

```bash
*[main][~/Kubernetes-Build]$ k get pods
NAME                                 READY   STATUS      RESTARTS   AGE
backup-odoo-backup-0-xdc7p           0/1     Completed   0          31m
odoo-odoo-6856f7c7d-jtxrq            1/1     Running     0          18m
odoo-odoo-staging-6bdb8b546d-jr656   1/1     Running     0          18m
odoo-postgresql-1                    1/1     Running     0          61m
restore-restore-test-mfw-kfptq       0/1     Completed   0          11s
```

Once the pods is completed so should the restore object.

```bash

*[main][~/Kubernetes-Build]$ k get restores
NAME               SCHEDULE REF   COMPLETION   AGE
restore-test-mfw                  Succeeded    105s
```

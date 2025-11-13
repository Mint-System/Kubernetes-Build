# Mint System Nextcloud

This Helm chart deploys Nextcloud with PostgreSQL.

## Secrets

Setup a `nextcloud-creds` secret with any additional environment variables you want to pass to Nextcloud.

```bash
NEXTCLOUD_ADMIN_USER="admin"
NEXTCLOUD_ADMIN_PASSWORD="*******"
kubectl create secret generic nextcloud-creds \
    --from-literal=NEXTCLOUD_ADMIN_USER="$NEXTCLOUD_ADMIN_USER" \
    --from-literal=NEXTCLOUD_ADMIN_PASSWORD="$NEXTCLOUD_ADMIN_PASSWORD" \
    -n <namespace>
```

The K8up backup requires a `s3-credentials` and a `backup-repo` secret. Here is an example for Exoscale SOS:

```bash
EXOSCALE_IAM_KEY="*******"
EXOSCALE_IAM_SECRET="*******"
kubectl create secret generic s3-credentials \
    --from-literal=username="$EXOSCALE_IAM_KEY" \
    --from-literal=password="$EXOSCALE_IAM_SECRET" \
    -n <namespace>
```

## Parameters

### Ingress parameters

| Name                       | Description                                  | Value   |
| -------------------------- | -------------------------------------------- | ------- |
| `ingress.enabled`          | Enable or disable the ingress                | `true`  |
| `ingress.className`        | The class name for the ingress               | `nginx` |
| `ingress.clusterIssuerRef` | The cluster issuer reference for the ingress | `""`    |
| `ingress.host`             | The host for the ingress                     | `""`    |
| `ingress.customDomain`     | The custom domain for the ingress            | `""`    |

### CloudNativePG parameters

| Name                | Description                                                  | Value                                    |
| ------------------- | ------------------------------------------------------------ | ---------------------------------------- |
| `cnpg.enabled`      | Enable or disable CloudNativePG                              | `true`                                   |
| `cnpg.nameOverride` | Override the name of the CloudNativePG cluster               | `""`                                     |
| `cnpg.instances`    | Number of instances (1 for single, 2+ for high availability) | `1`                                      |
| `cnpg.imageName`    | PostgreSQL image to use                                      | `ghcr.io/cloudnative-pg/postgresql:16.0` |
| `cnpg.storage.size` | Persistent volume size for each instance                     | `8Gi`                                    |
| `cnpg.database`     | Name of the CloudNativePG database to create                 | `nextcloud`                              |
| `cnpg.owner`        | Name of the database user                                    | `app`                                    |

### Nextcloud parameters

| Name               | Description                     | Value    |
| ------------------ | ------------------------------- | -------- |
| `image`            | The image for Nextcloud         | `""`     |
| `imagePullPolicy`  | Pull policy for Nextcloud image | `Always` |
| `storageSize`      | Set the storage size            | `40Gi`   |
| `storageClassName` | Set the storage class           | `""`     |

### K8up parameters

| Name            | Description            | Value   |
| --------------- | ---------------------- | ------- |
| `k8up.enabled`  | Enable or disable K8up | `false` |
| `k8up.endpoint` | S3 endpoint            | `""`    |
| `k8up.bucket`   | S3 bucket name         | `""`    |

## Troubleshooting

### The config.php is not updated

**Problem**

The `config.php` of Nextcloud is not updated with new env values.

**Solution**

Delete the `config.php` file and the pods.

```bash
kubectl exec <pod> -- rm /var/www/html/config/config.php
kubectl delete pod <pod>
```
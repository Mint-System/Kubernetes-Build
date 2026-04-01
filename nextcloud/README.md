# Mint System Nextcloud

This Helm chart deploys Nextcloud with PostgreSQL.

## Secrets

Setup a `nextcloud-creds` secret with any additional environment variables you want to pass to Nextcloud.

```bash
kubectl create secret generic nextcloud-creds \
    --from-literal=NEXTCLOUD_ADMIN_USER="$nextcloud_admin_user" \
    --from-literal=NEXTCLOUD_ADMIN_PASSWORD="$nextcloud_admin_password" \
    -n $namespace
```

The K8up backup requires a `s3-credentials` and a `backup-repo` secret. Here is an example for Exoscale SOS:

```bash
kubectl create secret generic s3-credentials \
    --from-literal=username="$exoscale_iam_key" \
    --from-literal=password="$exoscale_iam_secret" \
    -n $namespace
```

## Parameters

### Nextcloud parameters

| Name                                                    | Description                                                         | Value                      |
| ------------------------------------------------------- | ------------------------------------------------------------------- | -------------------------- |
| `nextcloud.enabled`                                     | Enable or disable Nextcloud                                         | `true`                     |
| `nextcloud.host`                                        | The host for Nextcloud and Ingress                                  | `""`                       |
| `nextcloud.externalDatabase.enabled`                    | Enable or disable external database usage                           | `true`                     |
| `nextcloud.externalDatabase.type`                       | Type of external database (e.g., postgresql, mysql)                 | `postgresql`               |
| `nextcloud.externalDatabase.host`                       | Hostname or service name of the external database                   | `nextcloud-postgresql-rw`  |
| `nextcloud.externalDatabase.database`                   | Name of the database to use                                         | `nextcloud`                |
| `nextcloud.externalDatabase.existingSecret.enabled`     | Enable or disable using an existing secret for database credentials | `true`                     |
| `nextcloud.externalDatabase.existingSecret.name`        | Name of the existing Kubernetes secret                              | `nextcloud-postgresql-app` |
| `nextcloud.externalDatabase.existingSecret.passwordKey` | Key in the secret containing the database password                  | `password`                 |

### CloudNativePG parameters

| Name                | Description                                                  | Value                                    |
| ------------------- | ------------------------------------------------------------ | ---------------------------------------- |
| `cnpg.enabled`      | Enable or disable CloudNativePG                              | `true`                                   |
| `cnpg.instances`    | Number of instances (1 for single, 2+ for high availability) | `1`                                      |
| `cnpg.imageName`    | PostgreSQL image to use                                      | `ghcr.io/cloudnative-pg/postgresql:16.0` |
| `cnpg.storage.size` | Persistent volume size for each instance                     | `8Gi`                                    |
| `cnpg.database`     | Name of the CloudNativePG database to create                 | `nextcloud`                              |
| `cnpg.owner`        | Name of the database user                                    | `app`                                    |

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
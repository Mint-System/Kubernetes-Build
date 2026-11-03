# Mint System Nextcloud

This Helm chart deploys Nextcloud with PostgreSQL.

This chart is a wrapper for the official Nextcloud chart: https://github.com/nextcloud/helm/blob/main/charts/nextcloud/README.md#configuration

## Secrets

Setup a `nextcloud-creds` secret with any additional environment variables you want to pass to Nextcloud:

```bash
kubectl create secret generic nextcloud-creds \
    --from-literal=nextcloud-username="$nextcloud_admin_user" \
    --from-literal=nextcloud-password="$nextcloud_admin_password" \
    --from-literal=smtp-host="$smtp_host" \
    --from-literal=smtp-username="$smtp_username" \
    --from-literal=smtp-password="$smtp_password" \
    -n $namespace
```

The K8up backup requires a `s3-credentials` and a `backup-repo` secret. Here is an example for Exoscale SOS:

```bash
kubectl create secret generic s3-credentials \
    --from-literal=username="$exoscale_iam_key" \
    --from-literal=password="$exoscale_iam_secret" \
    -n $namespace
```

## Values

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| cnpg.database | string | `"nextcloud"` | Name of the CloudNativePG database to create |
| cnpg.enabled | bool | `true` | Enable or disable CloudNativePG |
| cnpg.imageName | string | `"ghcr.io/cloudnative-pg/postgresql:16.0"` | PostgreSQL image to use |
| cnpg.instances | int | `1` | Number of instances (1 for single, 2+ for high availability) |
| cnpg.owner | string | `"app"` | Name of the database user |
| cnpg.storage.size | string | `"8Gi"` | Persistent volume size for each instance |
| ingress.className | string | `""` | The class name for the ingress |
| ingress.clusterIssuerRef | string | `nil` | The cluster issuer reference for the ingress |
| ingress.enabled | bool | `true` | Enable or disable the ingress |
| ingress.host | string | `""` | The host for the ingress |
| k8up.bucket | string | `""` | S3 bucket name |
| k8up.enabled | bool | `false` | Enable or disable K8up |
| k8up.endpoint | string | `""` | S3 endpoint |
| nextcloud.enabled | bool | `true` | Enable or disable Nextcloud |
| nextcloud.externalDatabase.database | string | `"nextcloud"` | Name of the database to use |
| nextcloud.externalDatabase.enabled | bool | `true` | Enable or disable external database usage |
| nextcloud.externalDatabase.existingSecret.enabled | bool | `true` | Enable or disable using an existing secret for database credentials |
| nextcloud.externalDatabase.existingSecret.passwordKey | string | `"password"` | Key in the secret containing the database password |
| nextcloud.externalDatabase.existingSecret.secretName | string | `"nextcloud-postgresql-app"` | Name of the existing Kubernetes secret |
| nextcloud.externalDatabase.existingSecret.usernameKey | string | `"username"` | Key in the secret containing the database username |
| nextcloud.externalDatabase.host | string | `"nextcloud-postgresql-rw"` | Hostname or service name of the external database |
| nextcloud.externalDatabase.type | string | `"postgresql"` | Type of external database (e.g., postgresql, mysql) |
| nextcloud.externalRedis.enabled | bool | `true` | Enable or disable external Redis |
| nextcloud.externalRedis.host | string | `"nextcloud-redis"` | Hostname or service name of the external Redis |
| nextcloud.ingress.enabled | bool | `false` | Enable or disable the Nextcloud subchart ingress |
| nextcloud.internalDatabase.enabled | bool | `false` | Enable or disable the internal SQLite database |
| nextcloud.nextcloud.existingSecret | object | `{"enabled":true,"secretName":"nextcloud-creds"}` | Use an existing secret for credentials |
| nextcloud.nextcloud.existingSecret.enabled | bool | `true` | Enable or disable using an existing secret |
| nextcloud.nextcloud.existingSecret.secretName | string | `"nextcloud-creds"` | Name of the existing Kubernetes secret |
| nextcloud.nextcloud.host | string | `""` | The host for Nextcloud and Ingress |
| nextcloud.nextcloud.mail.enabled | bool | `true` | Whether to enable/disable email settings |
| nextcloud.persistence | object | `{"enabled":true}` | Enable persistence using PVC |
| nextcloud.phpClientHttpsFix.enabled | bool | `true` | Fix HTTPS protocol detection behind reverse proxy |
| nextcloud.redis.auth.enabled | bool | `false` | Enable or disable Redis authentication |
| nextcloud.redis.enabled | bool | `false` | Enable or disable the bitnami Redis subchart |
| nextcloud.resources.limits.memory | string | `"2Gi"` | Memory limit for the container |
| nextcloud.resources.requests.cpu | string | `"250m"` | CPU request for the container |
| nextcloud.resources.requests.memory | string | `"1Gi"` | Memory request for the container |
| redis.enabled | bool | `true` | Enable or disable Redis |
| redis.image | string | `"redis:alpine"` | The image for Redis |

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

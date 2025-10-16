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

The K8up backup requires a `s3-credentials` secret. Here is an example for Exoscale SOS:

```bash
EXOSCALE_IAM_KEY="*******"
EXOSCALE_IAM_SECRET="*******"
kubectl create secret generic s3-credentials \
    --from-literal=endpoint="https://sos-ch-gva-2.exo.io" \
    --from-literal=bucket="k8up.mintcloud.ch" \
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
| `ingress.clusterIssuerRef` | The cluster issuer reference for the ingress | `nil`   |
| `ingress.host`             | The host for the ingress                     | `""`    |
| `ingress.customDomain`     | The custom domain for the ingress            | `""`    |

### CloudNativePG parameters

| Name                | Description                                                  | Value       |
| ------------------- | ------------------------------------------------------------ | ----------- |
| `cnpg.enabled`      | Enable or disable CloudNativePG                              | `true`      |
| `cnpg.nameOverride` | Override the name of the CloudNativePG cluster               | `""`        |
| `cnpg.instances`    | Number of instances (1 for single, 2+ for high availability) | `1`         |
| `cnpg.storage.size` | Persistent volume size for each instance                     | `8Gi`       |
| `cnpg.database`     | Name of the CloudNativePG database to create                 | `nextcloud` |
| `cnpg.owner`        | Name of the database user                                    | `app`       |

### External Postgres parameters

| Name                        | Description                                 | Value                |
| --------------------------- | ------------------------------------------- | -------------------- |
| `postgres.enabled`          | Enable or disable external Postgres         | `false`              |
| `postgres.db`               | The database name for Postgres              | `nextcloud`          |
| `postgres.user`             | The username for Postgres                   | `nextcloud`          |
| `postgres.secretRef`        | The secret reference for Postgres           | `nextcloud-postgres` |
| `postgres.userPasswordKey`  | The key for the user password in the secret | `password`           |
| `postgres.storageClassName` | Set the storage class                       | `standard`           |

### Nextcloud parameters

| Name               | Description                                | Value              |
| ------------------ | ------------------------------------------ | ------------------ |
| `enabled`          | Enable or disable Nextcloud                | `true`             |
| `image`            | The image for Nextcloud                    | `nextcloud:latest` |
| `imagePullPolicy`  | Pull policy for Nextcloud image            | `Always`           |
| `proxyMode`        | Enable or disable proxy mode for Nextcloud | `true`             |
| `adminUser`        | The admin username for Nextcloud           | `admin`            |
| `adminPassword`    | The admin password for Nextcloud           | `""`               |
| `dbType`           | The database type for Nextcloud            | `pgsql`            |
| `secretRef`        | The secret reference for Nextcloud         | `nextcloud-creds`  |
| `storageClassName` | Set the storage class                      | `""`               |

### K8up parameters

| Name           | Description            | Value   |
| -------------- | ---------------------- | ------- |
| `k8up.enabled` | Enable or disable K8up | `false` |

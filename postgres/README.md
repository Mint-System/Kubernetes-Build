# Mint System Postgres

This chart deploys a Postgres container and stores the credentials in a secret.

## Values

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| db | string | `"postgres"` | The database name for Postgres |
| enabled | bool | `true` | Enable or disable Postgres |
| image | string | `"postgres:16-alpine"` | The Docker image for Postgres |
| password | string | `nil` | If not set a password will be generated |
| port | int | `5432` | The port for Postgres |
| resources.limits.memory | string | `"1Gi"` | Memory limit for the container |
| resources.requests.cpu | string | `"100m"` | CPU request for the container |
| resources.requests.memory | string | `"500Mi"` | Memory request for the container |
| secretRef | string | `"postgres"` | The secret reference for Postgres |
| storageClassName | string | `""` | Set the storage class |
| user | string | `"postgres"` | The username for Postgres |
| userPasswordKey | string | `"password"` | The user password key for Postgres |

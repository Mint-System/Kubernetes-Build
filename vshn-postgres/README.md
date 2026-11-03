# VSHN Postgres

This chart deploys a VSHN Postgres service.

## Values

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| client.enabled | bool | `false` | Enable or disable the vshn-postgres client # |
| enabled | bool | `false` | Enable or disable vshn-postgres # |
| resources.limits.memory | string | `"1Gi"` | Memory limit for the container |
| resources.requests.cpu | string | `"100m"` | CPU request for the container |
| resources.requests.memory | string | `"500Mi"` | Memory request for the container |
| secretRef | string | `"postgres-creds"` | The secret reference for vshn-postgres # |

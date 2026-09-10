# VSHN Postgres

This chart deploys a VSHN Postgres service.

## Parameters

### vshnPostgres parameters

| Name             | Description                               | Value            |
| ---------------- | ----------------------------------------- | ---------------- |
| `enabled`        | Enable or disable vshnPostgres            | `false`          |
| `secretRef`      | The secret reference for vshnPostgres     | `postgres-creds` |
| `client.enabled` | Enable or disable the vshnPostgres client | `false`          |

### Resources requests and limits

| Name                        | Description                      | Value   |
| --------------------------- | -------------------------------- | ------- |
| `resources.requests.memory` | Memory request for the container | `500Mi` |
| `resources.requests.cpu`    | CPU request for the container    | `100m`  |
| `resources.limits.memory`   | Memory limit for the container   | `1Gi`   |

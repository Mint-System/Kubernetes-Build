# VSHN Postgres

This chart deploys a VSHN Postgres service.

## Parameters

### vshn-postgres parameters

| Name             | Description                                | Value            |
| ---------------- | ------------------------------------------ | ---------------- |
| `enabled`        | Enable or disable vshn-postgres            | `false`          |
| `secretRef`      | The secret reference for vshn-postgres     | `postgres-creds` |
| `client.enabled` | Enable or disable the vshn-postgres client | `false`          |

### Resources requests and limits

| Name                        | Description                      | Value   |
| --------------------------- | -------------------------------- | ------- |
| `resources.requests.memory` | Memory request for the container | `500Mi` |
| `resources.requests.cpu`    | CPU request for the container    | `100m`  |
| `resources.limits.memory`   | Memory limit for the container   | `1Gi`   |

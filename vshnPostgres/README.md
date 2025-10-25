# VSHN Postgres

This chart deploys a VSHN Postgres service.

## Parameters

### vshnPostgres parameters

| Name             | Description                               | Value            |
| ---------------- | ----------------------------------------- | ---------------- |
| `enabled`        | Enable or disable vshnPostgres            | `false`          |
| `secretRef`      | The secret reference for vshnPostgres     | `postgres-creds` |
| `client.enabled` | Enable or disable the vshnPostgres client | `false`          |

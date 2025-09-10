# Mint System Odoo

This Helm chart deploys Odoo with PostgreSQL.

## Secrets

The K8up backup requires a `s3-credentials` secret. Here is an example for Exoscale SOS:

```bash
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

### vshnPostgres parameters

| Name                          | Description                               | Value             |
| ----------------------------- | ----------------------------------------- | ----------------- |
| `vshnPostgres.enabled`        | Enable or disable vshnPostgres            | `false`           |
| `vshnPostgres.secretRef`      | The secret reference for vshnPostgres     | `odoo-postgresql` |
| `vshnPostgres.client.enabled` | Enable or disable the vshnPostgres client | `false`           |

### Postgres parameters

| Name                        | Description                       | Value           |
| --------------------------- | --------------------------------- | --------------- |
| `postgres.enabled`          | Enable or disable Postgres        | `false`         |
| `postgres.db`               | The database name for Postgres    | `odoo`          |
| `postgres.user`             | The username for Postgres         | `odoo`          |
| `postgres.secretRef`        | The secret reference for Postgres | `odoo-postgres` |
| `postgres.storageClassName` | Set the storage class             | `standard`      |

### PostgreSQL parameters

| Name                                          | Description                                     | Value               |
| --------------------------------------------- | ----------------------------------------------- | ------------------- |
| `postgresql.enabled`                          | Enable or disable PostgreSQL                    | `false`             |
| `postgresql.auth.username`                    | The username for PostgreSQL authentication      | `odoo`              |
| `postgresql.auth.database`                    | The database name for PostgreSQL authentication | `odoo`              |
| `postgresql.auth.existingSecret`              | Name of the secret key.                         | `odoo-postgresql`   |
| `postgresql.auth.secretKeys.adminPasswordKey` | The admin password key for PostgreSQL           | `postgres-password` |
| `postgresql.auth.secretKeys.userPasswordKey`  | The user password key for PostgreSQL            | `password`          |

### CloudNativePG parameters

| Name                | Description                                                  | Value  |
| ------------------- | ------------------------------------------------------------ | ------ |
| `cnpg.enabled`      | Enable or disable CloudNativePG                              | `true` |
| `cnpg.nameOverride` | Override the name of the CloudNativePG cluster               | `""`   |
| `cnpg.instances`    | Number of instances (1 for single, 2+ for high availability) | `1`    |
| `cnpg.storage.size` | Persistent volume size for each instance                     | `8Gi`  |
| `cnpg.database`     | Name of the CloudNativePG database to create                 | `odoo` |
| `cnpg.owner`        | Name of the database user                                    | `app`  |

### Odoo parameters

| Name                        | Description                                   | Value                                                                                                                                                         |
| --------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `enabled`                   | Enable or disable Odoo                        | `true`                                                                                                                                                        |
| `image`                     | The image for odoo                            | `mintsystem/odoo:18.0.20250725`                                                                                                                               |
| `imagePullPolicy`           | Pull policy for Odoo image                    | `Always`                                                                                                                                                      |
| `proxyMode`                 | Enable or disable proxy mode for Odoo         | `true`                                                                                                                                                        |
| `githubUsername`            | The GitHub username for Odoo                  | `""`                                                                                                                                                          |
| `githubPersonalAccessToken` | The GitHub personal access token for Odoo     | `""`                                                                                                                                                          |
| `downloadOdooEnterprise`    | Enable or disable downloading Odoo Enterprise | `false`                                                                                                                                                       |
| `addonsGitRepos`            | List of addon Git repositories for Odoo       | `["https://github.com/Mint-System/Odoo-Apps-Server-Tools.git#18.0","https://github.com/OCA/Server-Tools.git#18.0","https://github.com/OCA/Project.git#18.0"]` |
| `database`                  | The database for odoo                         | `odoo`                                                                                                                                                        |
| `initLang`                  | The initial language for Odoo                 | `de_CH`                                                                                                                                                       |
| `listDB`                    | Enable or disable listing databases for Odoo  | `false`                                                                                                                                                       |
| `secretRef`                 | The secret reference for Odoo                 | `odoo-creds`                                                                                                                                                  |
| `storageClassName`          | Set the storage class                         | `""`                                                                                                                                                          |

### K8up parameters

| Name           | Description            | Value   |
| -------------- | ---------------------- | ------- |
| `k8up.enabled` | Enable or disable K8up | `false` |

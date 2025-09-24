# Mint System Odoo

This Helm chart deploys Odoo with PostgreSQL.

## Secrets

Setup a `odoo-creds` secret with GitHub credentials to download private Repos.

```bash
GITHUB_USERNAME="<username>"
GITHUB_PAT="*******"
kubectl create secret generic odoo-creds \
    --from-literal=GITHUB_USERNAME="$GITHUB_USERNAME" \
    --from-literal=GITHUB_PAT="$GITHUB_PAT" \
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

| Name                     | Description                                   | Value                                                                                                                                                         |
| ------------------------ | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `enabled`                | Enable or disable Odoo                        | `true`                                                                                                                                                        |
| `image`                  | The image for Odoo                            | `mintsystem/odoo:18.0.20250909`                                                                                                                               |
| `imagePullPolicy`        | Pull policy for Odoo image                    | `Always`                                                                                                                                                      |
| `proxyMode`              | Enable or disable proxy mode for Odoo         | `true`                                                                                                                                                        |
| `downloadOdooEnterprise` | Enable or disable downloading Odoo Enterprise | `false`                                                                                                                                                       |
| `addonsGitRepos`         | List of addon Git repositories for Odoo       | `["https://github.com/Mint-System/Odoo-Apps-Server-Tools.git#18.0","https://github.com/OCA/Server-Tools.git#18.0","https://github.com/OCA/Project.git#18.0"]` |
| `database`               | The database for odoo                         | `odoo`                                                                                                                                                        |
| `initLang`               | The initial language for Odoo                 | `de_CH`                                                                                                                                                       |
| `initLogin`              | The initial login for Odoo                    | `""`                                                                                                                                                          |
| `listDB`                 | Enable or disable listing databases for Odoo  | `false`                                                                                                                                                       |
| `secretRef`              | The secret reference for Odoo                 | `odoo-creds`                                                                                                                                                  |
| `storageClassName`       | Set the storage class                         | `""`                                                                                                                                                          |

### K8up parameters

| Name           | Description            | Value   |
| -------------- | ---------------------- | ------- |
| `k8up.enabled` | Enable or disable K8up | `false` |

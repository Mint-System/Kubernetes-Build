# Mint System Odoo

This Helm chart deploys Odoo with PostgreSQL.

## Secrets

Setup a `odoo-creds` secret with GitHub credentials to download private repos:

```bash
kubectl create secret generic odoo-creds \
    --from-literal=GITHUB_USERNAME="$github_username" \
    --from-literal=GITHUB_PAT="$github_pat" \
    --from-literal=GITLAB_USERNAME="$gitlab_username" \
    --from-literal=GITLAB_PAT="$gitlab_pat" \
    -n $namespace
```

The K8up backup requires a `s3-credentials` and a `backup-repo` secret. Here is an example for Exoscale SOS:

```bash
kubectl create secret generic s3-credentials \
    --from-literal=username="$exoscale_iam_key" \
    --from-literal=password="$exoscale_iam_secret" \
    -n $namespace
```

## Jobs

There is suspended `<release>-staging-reset` job that copies the main database and volume to the staging enviroment. Then the job neutralizes the Odoo database. To run the job:

```bash
kubectl create job --from=cronjob/<release>-staging-reset <release>-staging-reset-run
```

## Values

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| addonsGitRepos | list | `["https://github.com/Mint-System/Odoo-Apps-Server-Tools.git","https://github.com/OCA/Server-Tools.git"]` | List of addon Git repositories for Odoo |
| cnpg.database | string | `"odoo"` | Name of the CloudNativePG database to create |
| cnpg.enabled | bool | `true` | Enable or disable CloudNativePG |
| cnpg.instances | int | `1` | Number of instances (1 for single, 2+ for high availability) |
| cnpg.nameOverride | string | `""` | Override the name of the CloudNativePG cluster # Default: "{release-name}-postgresql" |
| cnpg.owner | string | `"app"` | Name of the database user |
| cnpg.storage.size | string | `"8Gi"` | Persistent volume size for each instance |
| database | string | `"odoo"` | The database for odoo |
| downloadOdooEnterprise | bool | `false` | Enable or disable downloading Odoo Enterprise |
| enabled | bool | `true` | Enable or disable Odoo |
| image | string | `""` | The image for Odoo |
| imagePullPolicy | string | `"Always"` | Pull policy for Odoo image |
| ingress.className | string | `""` | The class name for the ingress |
| ingress.clusterIssuerRef | string | `nil` | The cluster issuer reference for the ingress |
| ingress.customDomain | string | `""` | The custom domain for the ingress |
| ingress.enabled | bool | `true` | Enable or disable the ingress |
| ingress.host | string | `""` | The host for the ingress |
| ingress.staging.customDomain | string | `""` | The custom domain for the staging ingress |
| init.lang | string | `"de_CH"` | The initial language for Odoo |
| init.login | string | `""` | The initial username for Odoo admin account |
| init.password | string | `""` | The initial passwod for Odoo admin account |
| k8up.bucket | string | `""` | S3 bucket name |
| k8up.enabled | bool | `false` | Enable or disable K8up |
| k8up.endpoint | string | `""` | S3 endpoint |
| listDB | bool | `false` | Enable or disable listing databases for Odoo |
| postgres.db | string | `"odoo"` | The database name for Postgres |
| postgres.enabled | bool | `false` | Enable or disable Postgres |
| postgres.secretRef | string | `"odoo-postgres"` | The secret reference for Postgres |
| postgres.storageClassName | string | `"standard"` | Set the storage class |
| postgres.user | string | `"odoo"` | The username for Postgres |
| proxyMode | bool | `true` | Enable or disable proxy mode for Odoo |
| pythonInstall | list | `[]` | List of python packages to insall |
| replicas | int | `1` | Number of Odoo replicas |
| resources.limits.memory | string | `"2Gi"` | Memory limit for the container |
| resources.requests.cpu | string | `"250m"` | CPU request for the container |
| resources.requests.memory | string | `"1Gi"` | Memory request for the container |
| secretRef | string | `"odoo-creds"` | The secret reference for Odoo |
| staging.enabled | bool | `false` | Enable or disable staging deployment |
| staging.image | string | `""` | The image for Odoo staging |
| staging.name | string | `"staging"` | Name of the staging environment (used in staging ingress) |
| storageClassName | string | `""` | Set the storage class |
| upgrade.enabled | bool | `false` | Enable or disable the upgrade job |
| upgrade.image | string | `"mintsystem/odoo-upgrade:16"` | The image for the Odoo upgrade job |
| upgrade.mode | string | `"test"` | The upgrade mode (test or production) |
| upgrade.targetDatabase | string | `"upgrade"` | The target database for the upgrade |
| upgrade.targetVersion | string | `""` | The target Odoo version for the upgrade |
| vshnPostgres.client.enabled | bool | `false` | Enable or disable the vshnPostgres client |
| vshnPostgres.enabled | bool | `false` | Enable or disable vshnPostgres |
| vshnPostgres.secretRef | string | `"odoo-postgresql"` | The secret reference for vshnPostgres |
| workers | int | `5` | Define the amount of Odoo workers to spawn |

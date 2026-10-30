# Mint System Remark42

This Helm chart deploys a Remark42 container.

## Secrets

The chart does not create secrets automatically. Create the following secrets manually before deploying.

### Remark42 secrets

The secret referenced by `secretName` must contain the sensitive environment variables:

| Key                  | Description                                   |
| -------------------- | --------------------------------------------- |
| `SECRET`             | Remark42 secret and admin password            |
| `SMTP_PASSWORD`      | SMTP password                                 |
| `AUTH_GITHUB_CID`    | GitHub auth client id                         |
| `AUTH_GITHUB_CSEC`   | GitHub auth client secret                     |
| `AUTH_CUSTOM_CSEC`   | Custom auth client secret                     |

Create the secret:

```bash
kubectl create secret generic remark42-secrets \
  --from-literal=SECRET='your-secret' \
  --from-literal=SMTP_PASSWORD='your-smtp-password' \
  --from-literal=AUTH_CUSTOM_CSEC='your-custom-secret'
```

### Backup secrets

When `k8up.enabled` is `true`, create the `s3-credentials` secret with S3 access keys:

```bash
kubectl create secret generic s3-credentials \
  --from-literal=username='your-s3-access-key' \
  --from-literal=password='your-s3-secret-key'
```

## Parameters

### Ingress parameters

| Name                       | Description                                               | Value   |
| -------------------------- | --------------------------------------------------------- | ------- |
| `ingress.enabled`          | Enable or disable the ingress                             | `true`  |
| `ingress.className`        | The class name for the ingress                            | `""`    |
| `ingress.clusterIssuerRef` | The cluster issuer reference for the ingress              | `""`    |
| `ingress.host`             | The host for the ingress                                  | `""`    |
| `ingress.customDomain`     | The custom domain for the ingress                         | `""`    |
| `ingress.wwwRedirect`      | Redirect the customDomain without www to the customDomain | `false` |
| `ingress.redirectFrom`     | Redirect this domain to the customDomain                  | `""`    |

### Remark42 parameters

| Name                | Description                          | Value                    |
| ------------------- | ------------------------------------ | ------------------------ |
| `image`             | The image for Remark42               | `umputun/remark42:latest` |
| `imagePullPolicy`   | Pull policy for Remark42 image       | `Always`                 |
| `url`               | The Remark42 URL (REMARK_URL)        | `""`                     |
| `site`              | The Remark42 site id (SITE)          | `""`                     |
| `secretName`        | Name of the secret with secrets      | `""`                     |
| `additionalEnvs`    | Additional environment variables    | `{}`                    |
| `storageClassName`  | Set the storage class               | `""`                     |
| `storageSize`       | Set the persistent volume claim size | `1Gi`                    |

### Auth parameters

| Name                     | Description                            | Value   |
| ------------------------ | -------------------------------------- | ------- |
| `auth.anonymous`         | Enable anonymous auth (AUTH_ANON)      | `false` |
| `auth.emailEnabled`      | Enable email auth (AUTH_EMAIL_enable)  | `false` |
| `auth.emailFrom`         | Email auth from (AUTH_EMAIL_FROM)      | `""`    |
| `auth.sameSite`          | Same site auth (AUTH_SAME_SITE)        | `none`  |
| `auth.custom.name`       | Custom auth name                       | `""`    |
| `auth.custom.cid`        | Custom auth client id                  | `""`    |
| `auth.custom.authUrl`    | Custom auth url                        | `""`    |
| `auth.custom.tokenUrl`   | Custom auth token url                  | `""`    |
| `auth.custom.infoUrl`    | Custom auth info url                   | `""`    |
| `auth.custom.scopes`     | Custom auth scopes                     | `""`    |

### SMTP parameters

| Name             | Description                  | Value  |
| ---------------- | ---------------------------- | ------ |
| `smtp.host`      | SMTP host (SMTP_HOST)        | `""`   |
| `smtp.port`      | SMTP port (SMTP_PORT)        | `587`  |
| `smtp.username`  | SMTP username (SMTP_USERNAME) | `""`   |
| `smtp.tls`       | Enable SMTP TLS (SMTP_TLS)   | `true` |

### Admin parameters

| Name                 | Description                    | Value |
| -------------------- | ------------------------------ | ----- |
| `admin.sharedEmail`  | Admin shared email             | `""`  |
| `admin.sharedId`     | Admin shared id                | `""`  |

### Notify parameters

| Name                 | Description                          | Value   |
| -------------------- | ------------------------------------ | ------- |
| `notify.type`        | Notify type (NOTIFY_TYPE)            | `email` |
| `notify.emailFrom`   | Notify email from (NOTIFY_EMAIL_FROM) | `""`    |
| `notify.emailAdmin`  | Notify email admin (NOTIFY_EMAIL_ADMIN) | `true`  |

### Resources requests and limits

| Name                        | Description                      | Value   |
| --------------------------- | -------------------------------- | ------- |
| `resources.requests.memory` | Memory request for the container | `256Mi` |
| `resources.requests.cpu`    | CPU request for the container    | `100m`  |
| `resources.limits.memory`   | Memory limit for the container   | `512Mi` |

### K8up parameters

| Name             | Description             | Value  |
| ---------------- | ----------------------- | ------ |
| `k8up.enabled`   | Enable or disable K8up  | `false`|
| `k8up.endpoint`  | S3 endpoint              | `""`   |
| `k8up.bucket`    | S3 bucket name           | `""`   |


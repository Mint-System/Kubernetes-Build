# Mint System Remark42

This Helm chart deploys a Remark42 container.

## Secrets

Selected Remark42 features require a `remark42-secrets` secret:

```bash
kubectl create secret generic remark42-secrets \
  --from-literal=SECRET="$secret" \
  --from-literal=SMTP_PASSWORD="$smtp_password" \
  --from-literal=AUTH_GITHUB_CSEC="$auth_github_csec" \
  --from-literal=AUTH_CUSTOM_CSEC="$auth_custom_csec"
```

When `k8up.enabled` is `true`, create the `s3-credentials` secret with S3 access keys:

```bash
kubectl create secret generic s3-credentials \
  --from-literal=username="$username" \
  --from-literal=password="$password"
```

## Values

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| additionalEnvs | object | `{}` | Additional environment variables to set |
| admin.sharedEmail | string | `""` | Admin shared email (ADMIN_SHARED_EMAIL) |
| admin.sharedId | string | `""` | Admin shared id (ADMIN_SHARED_ID) |
| auth.anonymous | string | `"false"` | Enable anonymous auth (AUTH_ANON) |
| auth.custom.authUrl | string | `""` | Custom auth url (AUTH_CUSTOM_AUTH_URL) |
| auth.custom.cid | string | `""` | Custom auth client id (AUTH_CUSTOM_CID) |
| auth.custom.infoUrl | string | `""` | Custom auth info url (AUTH_CUSTOM_INFO_URL) |
| auth.custom.name | string | `""` | Custom auth name (AUTH_CUSTOM_NAME) |
| auth.custom.scopes | string | `""` | Custom auth scopes (AUTH_CUSTOM_SCOPES) |
| auth.custom.tokenUrl | string | `""` | Custom auth token url (AUTH_CUSTOM_TOKEN_URL) |
| auth.emailEnabled | string | `"false"` | Enable email auth (AUTH_EMAIL_enable) |
| auth.emailFrom | string | `""` | Email auth from address (AUTH_EMAIL_FROM) |
| auth.github.cid | string | `""` | GitHub auth client id (AUTH_GITHUB_CSEC) |
| auth.sameSite | string | `"none"` | Same site auth (AUTH_SAME_SITE) |
| image | string | `"umputun/remark42:latest"` | The image for Remark42 |
| imagePullPolicy | string | `"Always"` | Pull policy for Remark42 image |
| ingress.className | string | `""` | The class name for the ingress |
| ingress.clusterIssuerRef | string | `nil` | The cluster issuer reference for the ingress |
| ingress.customDomain | string | `""` | The custom domain for the ingress |
| ingress.enabled | bool | `true` | Enable or disable the ingress |
| ingress.host | string | `""` | The host for the ingress |
| ingress.redirectFrom | string | `""` | Redirect this domain to the customDomain |
| ingress.wwwRedirect | bool | `false` | Redirect the customDomain without www to the customDomain |
| k8up.bucket | string | `""` | S3 bucket name |
| k8up.enabled | bool | `false` | Enable or disable K8up |
| k8up.endpoint | string | `""` | S3 endpoint |
| notify.emailAdmin | string | `"true"` | Notify email admin (NOTIFY_EMAIL_ADMIN) |
| notify.emailFrom | string | `""` | Notify email from address (NOTIFY_EMAIL_FROM) |
| notify.type | string | `"email"` | Notify type (NOTIFY_TYPE) |
| resources.limits.memory | string | `"512Mi"` | Memory limit for the container |
| resources.requests.cpu | string | `"100m"` | CPU request for the container |
| resources.requests.memory | string | `"256Mi"` | Memory request for the container |
| secretName | string | `""` | Name of the secret containing Remark42 secrets |
| site | string | `""` | The Remark42 site id (SITE) |
| smtp.host | string | `""` | SMTP host (SMTP_HOST) |
| smtp.port | string | `"587"` | SMTP port (SMTP_PORT) |
| smtp.tls | string | `"true"` | Enable SMTP TLS (SMTP_TLS) |
| smtp.username | string | `""` | SMTP username (SMTP_USERNAME) |
| storageClassName | string | `""` | Set the storage class |
| storageSize | string | `"1Gi"` | Set the persistent volume claim size |
| url | string | `""` | The Remark42 URL (REMARK_URL) |

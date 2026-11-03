# Mint System Taskfile Build

This Helm chart deploys a taskfile.build container.

## Values

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| additionalEnvs | object | `{}` | Additional environment variables to set |
| caddyRoot | string | `""` | Static site path relative to repo root. |
| gitUrl | string | `""` | Repo url to pull. |
| image | string | `"mintsystem/taskfile.build:latest"` | The image for taskfile.build |
| imagePullPolicy | string | `"Always"` | Pull policy for taskfile.build image |
| ingress.className | string | `""` | The class name for the ingress |
| ingress.clusterIssuerRef | string | `""` | The cluster issuer reference for the ingress |
| ingress.customDomain | string | `""` | The custom domain for the ingress |
| ingress.enabled | bool | `true` | Enable or disable the ingress |
| ingress.host | string | `""` | The host for the ingress |
| ingress.redirectFrom | string | `""` | Redirect this domain to the customDomain |
| ingress.wwwRedirect | bool | `false` | Redirect the customDomain without www to the customDomain |
| resources.limits.memory | string | `"1Gi"` | Memory limit for the container |
| resources.requests.cpu | string | `"100m"` | CPU request for the container |
| resources.requests.memory | string | `"500Mi"` | Memory request for the container |
| storageClassName | string | `""` | Set the storage class |
| storageSize | string | `"1Gi"` | Set the persistent volume claim size |
| taskCommands | string | `""` | Run this commands with the task file. |

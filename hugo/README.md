# Mint System Hugo

This Helm chart deploys a Hugo site.

## Parameters

### Ingress parameters

| Name                       | Description                                  | Value            |
| -------------------------- | -------------------------------------------- | ---------------- |
| `ingress.enabled`          | Enable or disable the ingress                | `true`           |
| `ingress.className`        | The class name for the ingress               | `nginx`          |
| `ingress.clusterIssuerRef` | The cluster issuer reference for the ingress | `nil`            |
| `ingress.host`             | The host for the ingress                     | `hugo.knd.local` |

### Hugo parameters

| Name              | Description                | Value                                 |
| ----------------- | -------------------------- | ------------------------------------- |
| `image`           | The image for Hugo         | `janikvonrotz/janikvonrotz.ch:latest` |
| `imagePullPolicy` | Pull policy for hugo image | `Always`                              |

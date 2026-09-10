# Mint System Vuepress

This Helm chart deploys a Vuepress site.

## Parameters

### Ingress parameters

| Name                       | Description                                  | Value  |
| -------------------------- | -------------------------------------------- | ------ |
| `ingress.enabled`          | Enable or disable the ingress                | `true` |
| `ingress.className`        | The class name for the ingress               | `""`   |
| `ingress.clusterIssuerRef` | The cluster issuer reference for the ingress | `""`   |
| `ingress.host`             | The host for the ingress                     | `""`   |
| `ingress.customDomain`     | The custom domain for the ingress            | `""`   |

### Vuepress parameters

| Name              | Description                    | Value    |
| ----------------- | ------------------------------ | -------- |
| `image`           | The image for Vuepress         | `""`     |
| `imagePullPolicy` | Pull policy for Vuepress image | `Always` |

### Resources requests and limits

| Name                        | Description                      | Value   |
| --------------------------- | -------------------------------- | ------- |
| `resources.requests.memory` | Memory request for the container | `500Mi` |
| `resources.requests.cpu`    | CPU request for the container    | `100m`  |
| `resources.limits.memory`   | Memory limit for the container   | `1Gi`   |

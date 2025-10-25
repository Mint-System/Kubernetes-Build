# Mint System Taskfile Build

This Helm chart deploys a taskfile.build container.

## Parameters

### taskfile.build parameters

| Name                       | Description                                  | Value   |
| -------------------------- | -------------------------------------------- | ------- |
| `ingress.enabled`          | Enable or disable the ingress                | `true`  |
| `ingress.className`        | The class name for the ingress               | `nginx` |
| `ingress.clusterIssuerRef` | The cluster issuer reference for the ingress | `nil`   |
| `ingress.host`             | The host for the ingress                     | `""`    |
| `ingress.customDomain`     | The custom domain for the ingress            | `""`    |

### taskfile.build parameters

| Name              | Description                             | Value                                |
| ----------------- | --------------------------------------- | ------------------------------------ |
| `image`           | The image for taskfile.build            | `janikvonrotz/taskfile.build:latest` |
| `imagePullPolicy` | Pull policy for taskfile.build image    | `Always`                             |
| `gitUrl`          | Repo url to pull.                       | `""`                                 |
| `taskCommands`    | Run this commands with the task file.   | `""`                                 |
| `caddyRoot`       | Static site path relative to repo root. | `""`                                 |

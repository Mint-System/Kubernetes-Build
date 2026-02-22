# Prometheus Agent

This chart deploys Prometheus in **agent mode** to scrape Kubernetes metrics and write them to a central Prometheus endpoint.

## Secrets

To securely provide the remote write credentials, create a Kubernetes Secret named `prometheus-remote-write-credentials` in the target namespace.

```bash
REMOTE_WRITE_USERNAME="your-username"
REMOTE_WRITE_PASSWORD="your-secret-password-here"
kubectl create secret generic prometheus-remote-write-credentials \
    --from-literal=username="$REMOTE_WRITE_USERNAME" \
    --from-literal=password="$REMOTE_WRITE_PASSWORD" \
    -n <namespace>
```

## Parameters

### prometheusAgent parameters

| Name              | Description                                            | Value                     |
| ----------------- | ------------------------------------------------------ | ------------------------- |
| `image`           | The image for Prometheus                               | `prom/prometheus:v2.54.1` |
| `imagePullPolicy` | Pull policy for  Prometheus image                      | `Always`                  |
| `replicas`        | Number of replicas for the Prometheus agent deployment | `1`                       |

### Remote write configuration

| Name              | Description                    | Value                                            |
| ----------------- | ------------------------------ | ------------------------------------------------ |
| `remoteWrite.url` | The remote write endpoint URL. | `https://prometheus.mint-system.ch/api/v1/write` |

### Resources requests and limits

| Name                        | Description                      | Value   |
| --------------------------- | -------------------------------- | ------- |
| `resources.requests.memory` | Memory request for the container | `64Mi`  |
| `resources.requests.cpu`    | CPU request for the container    | `250m`  |
| `resources.limits.memory`   | Memory limit for the container   | `128Mi` |
| `resources.limits.cpu`      | CPU limit for the container      | `500m`  |

### Kube-state-metrics configuration

| Name                                           | Description                            | Value   |
| ---------------------------------------------- | -------------------------------------- | ------- |
| `kube-state-metrics.enabled`                   | Enable kube-state-metrics as sub-chart | `true`  |
| `kube-state-metrics.resources.requests.memory` | Memory request for the container       | `32Mi`  |
| `kube-state-metrics.resources.requests.cpu`    | CPU request for the container          | `10m`   |
| `kube-state-metrics.resources.limits.memory`   | Memory limit for the container         | `128Mi` |

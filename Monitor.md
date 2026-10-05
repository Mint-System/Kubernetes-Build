# Monitor

Setup Prometheus agent for your cluster.

Create a namespace for the application.

```bash
kubectl create namespace prometheus
kubectl-ns prometheus
```

Setup the credentials according to the prometheus-agent [README](/prometheus-agent/README.md).

Update the values file with the `remoteWrite.url`.

Install the chart.

```bash
task install-chart prometheus-agent test_values/knd.local.yaml
```

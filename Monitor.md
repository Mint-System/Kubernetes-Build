# Monitor

Setup Prometheus agent for your cluster.

Create a namespace.

```bash
kubens prometheus
```

Setup the credentials according to the prometheusAgent [README](/prometheusAgent/README.md).

Update the values file with the `remoteWrite.url`.

Install the chart.

```bash
task install-chart prometheusAgent test_values/knd.local.yaml
```

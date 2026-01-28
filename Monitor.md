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

## Optional: Enable Kube-State-Metrics

To collect Kubernetes object state metrics (pods, deployments, services, etc.), enable kube-state-metrics in your values file:

```yaml
kube-state-metrics:
  enabled: true
  resources:
    requests:
      cpu: 10m
      memory: 32Mi
    limits:
      memory: 128Mi
```

## Checking Metrics

To verify the prometheus-agent is running and sending metrics:

1. **Check pod status**:

```bash
kubectl get pods -n prometheus
```

2. **Access the Prometheus agent dashboard**:

```bash
task forward prometheusAgent
```

This will forward port 9090 to your local machine where you can access:

- http://localhost:9090 for the Prometheus agent interface
- http://localhost:9090/api/v1/targets for the targets status
- http://localhost:9090/api/v1/status/config for the configuration
- http://localhost:9090/api/v1/agent/wal for the WAL status

3. **Check logs of the agent**:

```bash
kubectl logs -n prometheus deployment/prometheus-agent
```

4. **View metrics on the central Prometheus server**:

Access the metrics at the remote write endpoint (e.g., https://prometheus.mint-system.ch) where they are forwarded from the agent.

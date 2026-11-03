# Prometheus Agent

This chart deploys Prometheus in **agent mode** to scrape Kubernetes metrics and write them to a central Prometheus endpoint.

## Secrets

To securely provide the remote write credentials, create a Kubernetes Secret named `prometheus-remote-write-credentials` in the target namespace:

```bash
kubectl create secret generic prometheus-remote-write-credentials \
    --from-literal=username="$remote_write_username" \
    --from-literal=password="$remote_write_password" \
    -n $namespace
```

## Values

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| image | string | `"prom/prometheus:v2.54.1"` | The image for Prometheus |
| imagePullPolicy | string | `"Always"` | Pull policy for  Prometheus image |
| kube-state-metrics | object | `{"enabled":true,"resources":{"limits":{"memory":"128Mi"},"requests":{"cpu":"10m","memory":"32Mi"}}}` | Enable kube-state-metrics as sub-chart |
| kube-state-metrics.resources.limits.memory | string | `"128Mi"` | Memory limit for the container |
| kube-state-metrics.resources.requests.cpu | string | `"10m"` | Memory request for the container |
| kube-state-metrics.resources.requests.memory | string | `"32Mi"` | CPU request for the container |
| remoteWrite | object | `{"url":"https://prometheus.mint-system.ch/api/v1/write"}` | The remote write endpoint URL. |
| replicas | int | `1` | Number of replicas for the Prometheus agent deployment |
| resources.limits.memory | string | `"1Gi"` | Memory limit for the container |
| resources.requests.cpu | string | `"100m"` | CPU request for the container |
| resources.requests.memory | string | `"500Mi"` | Memory request for the container |
| scrapeConfigs | string | `"- job_name: 'kubernetes-pods'\n  kubernetes_sd_configs:\n    - role: pod\n  relabel_configs:\n    - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]\n      action: keep\n      regex: true\n    - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]\n      action: replace\n      target_label: __metrics_path__\n      regex: (.+)\n    - source_labels: [__address__, __meta_kubernetes_pod_annotation_prometheus_io_port]\n      action: replace\n      regex: ([^:]+)(?::\\d+)?;(\\d+)\n      replacement: $1:$2\n      target_label: __address__\n    - action: labelmap\n      regex: __meta_kubernetes_pod_label_(.+)\n    - source_labels: [__meta_kubernetes_namespace]\n      target_label: kubernetes_namespace\n    - source_labels: [__meta_kubernetes_pod_name]\n      target_label: kubernetes_pod_name\n- job_name: 'kubernetes-nodes'\n  scheme: https\n  tls_config:\n    ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt\n    insecure_skip_verify: true\n  bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token\n  kubernetes_sd_configs:\n    - role: node\n  relabel_configs:\n    - source_labels: [__meta_kubernetes_node_address_InternalIP]\n      target_label: __address__\n      replacement: ${1}:10250\n    - action: labelmap\n      regex: __meta_kubernetes_node_label_(.+)\n    - source_labels: [__meta_kubernetes_node_name]\n      target_label: kubernetes_node\n    - target_label: __metrics_path__\n      replacement: /metrics\n- job_name: 'kubernetes-cadvisor'\n  scheme: https\n  tls_config:\n    ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt\n    insecure_skip_verify: true\n  bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token\n  kubernetes_sd_configs:\n    - role: node\n  relabel_configs:\n    - source_labels: [__meta_kubernetes_node_address_InternalIP]\n      target_label: __address__\n      replacement: ${1}:10250\n    - action: labelmap\n      regex: __meta_kubernetes_node_label_(.+)\n    - source_labels: [__meta_kubernetes_node_name]\n      target_label: kubernetes_node\n    - target_label: __metrics_path__\n      replacement: /metrics/cadvisor\n- job_name: 'kubernetes-kube-state-metrics'\n  kubernetes_sd_configs:\n    - role: service\n  relabel_configs:\n    - source_labels: [__meta_kubernetes_service_name]\n      regex: '.*-kube-state-metrics'\n      action: keep\n    - source_labels: [__meta_kubernetes_service_label_app_kubernetes_io_name]\n      regex: 'kube-state-metrics'\n      action: keep\n    - source_labels: [__meta_kubernetes_endpoint_port_name]\n      regex: \"http\"\n      action: keep\n    - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_probe]\n      target_label: __tmp_prometheus_io_probe\n      regex: \"true\"\n      action: replace\n    - target_label: __address__\n      source_labels: [__address__]\n    - source_labels: [__meta_kubernetes_service_label_app_kubernetes_io_instance]\n      target_label: kubernetes_instance\n"` |  |

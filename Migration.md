# Migration from ingress-nginx to Traefik

This guide will help you migrate your Kubernetes cluster from using ingress-nginx to Traefik as your ingress controller.

For a comprehensive, official guide with detailed instructions and troubleshooting, refer to the [Traefik documentation on migrating from ingress-nginx](https://doc.traefik.io/traefik/migrate/nginx-to-traefik/).

## Prerequisites

- Kubernetes cluster with ingress-nginx installed
- Helm 3 installed
- kubectl configured to access your cluster

## Install Traefik

Add the Traefik Helm repository:

```bash
task add-repos
```

Install Traefik:

```bash
task install-traefik
```

Check that Traefik is running:

```bash
kubectl get pods -n kube-system | grep traefik
```

## Update Ingress Resources

Patch the ingress class to use Traefik:

Or update the releases with ingress definitions:

```bash
task upgrade-release <chart> <values>
```

Verify that your applications are accessible through Traefik:

```bash
curl -H "Host: your-app.example.com" http://<traefik-service-ip>
```

## Uninstall ingress-nginx

Once you've verified that Traefik is working correctly, you can uninstall ingress-nginx:

```bash
task uninstall-release ingress-nginx
```

## Troubleshooting

If your applications are not accessible, check the Traefik logs:

```bash
kubectl logs -n kube-system -l app.kubernetes.io/name=traefik
```

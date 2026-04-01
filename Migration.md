# Migration from ingress-nginx to Traefik

This guide will help you migrate your Kubernetes cluster from using ingress-nginx to Traefik as your ingress controller.

For a comprehensive, official guide with detailed instructions and troubleshooting, refer to the [Traefik documentation on migrating from ingress-nginx](https://doc.traefik.io/traefik/migrate/nginx-to-traefik/).

## Prerequisites

- Kubernetes cluster with ingress-nginx installed
- Helm 3 installed
- kubectl configured to access your cluster

## Step 1: Install Traefik

1. Add the Traefik Helm repository:

```bash
task add-repos
```

2. Install Traefik:

```bash
task install-traefik
```

## Step 2: Update Ingress Resources

1. Update the releases with ingress definitions:

```bash
task upgrade-release <chart> <values>
```

## Step 4: Uninstall ingress-nginx

Once you've verified that Traefik is working correctly, you can uninstall ingress-nginx:

```bash
task uninstall-release ingress-nginx
```

## Step 5: Verify the Migration

1. Check that Traefik is running:

```bash
kubectl get pods -n kube-system | grep traefik
```

2. Test your applications by accessing them through the Traefik ingress:

```bash
kubectl get ingress -A
```

3. Verify that your applications are accessible through Traefik:

```bash
curl -H "Host: your-app.example.com" http://<traefik-service-ip>
```

## Troubleshooting

- If your applications are not accessible, check the Traefik logs:

```bash
kubectl logs -n kube-system -l app.kubernetes.io/name=traefik
```

- Ensure that your ingress resources have the correct ingress class set to "traefik"
- Verify that your DNS records point to the Traefik service IP

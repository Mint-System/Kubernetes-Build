# Migration

##  From ingress-nginx to Traefik

This guide will help you migrate your Kubernetes cluster from using ingress-nginx to Traefik as your ingress controller.

For a comprehensive, official guide with detailed instructions and troubleshooting, refer to the [Traefik documentation on migrating from ingress-nginx](https://doc.traefik.io/traefik/migrate/nginx-to-traefik/).

## Prerequisites

- Kubernetes cluster with ingress-nginx installed
- kubectl configured to access your cluster
- kubectl-ns plugin installed
- Access to DNS manager

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
kubectl get pods -n traefik
```

Ensure traefik is the new default.

```bash
kubectl get ingressclass traefik -o jsonpath='{.metadata.annotations.ingressclass\.kubernetes\.io/is-default-class}'
```

List the service.

```bash
kubectl get svc -n traefik
```

Note that the Treafik service has a different external IP address.

```bash
traefik_service_ip=$(kubectl get svc -n traefik traefik -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
```

## Update Ingress Resource

Switch to namespace with ingress:

```bash
kubectl-ns
```

Patch the ingress resource:

```bash
kubectl patch ingress $name -p '{"spec":{"ingressClassName":"traefik"}}'
```

Verify the patch:

```bash
kubectl get ingress $name -o yaml | grep -A1 ingressClassName
```

Verify that your application is accessible through Traefik:

```bash
curl -I -H "Host: app.example.com" http://$traefik_service_ip
```

To route it externally we need to update the application's DNS entry.

You can also update all ingress resources at once.

```bash
kubectl get ingress --all-namespaces
```

Patch all ingresses to use Traefik:

```bash
kubectl get ingress --all-namespaces -o jsonpath='{range .items[*]}{.metadata.name}{" "}{.metadata.namespace}{"\n"}{end}' | while read name namespace; do kubectl patch ingress "$name" -n "$namespace" -p '{"spec":{"ingressClassName":"traefik"}}'; done
```

## Update DNS

Update DNS entries of your applications to point to the new Treafik IP.

Ensure the new IP address is resolved.

```bash
nslookup app.example.com 9.9.9.9
```

Verify that your applications is routed correctly:

```bash
curl -I https://app.example.com
```

## Upgrade Cluster Issuer

If you deployed a cluster issuer, update the release:

```bash
kubectl-ns cert-manager
task upgrade-release clusterIssuer $values
```

## Uninstall ingress-nginx

Once you've verified that Traefik is working correctly, you can uninstall ingress-nginx:

```bash
kubectl-ns ingress-nginx
task uninstall-release ingress-nginx
```

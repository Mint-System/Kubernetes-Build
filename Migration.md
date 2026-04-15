# Migration from ingress-nginx to Traefik

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

List the ingress classes.

```bash
kubectl get ingressclass
```

List the service.

```bash
kubectl get svc -n traefik
```

Note that the Treafik service has a different extrnal IP address.

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

Verify that your applications are accessible through Traefik:

```bash
curl -I -H "Host: your-app.example.com" http://<traefik-service-ip>
```

## Update DNS

Update DNS entries of your application.

Ensure the new IP is resolved.

```bash
nslookup your-app.example.com 9.9.9.9
```

Verify that your applications is routed correctly:

```bash
curl -I https://your-app.example.com
```


## Bulk-Update Ingress Resources

List all ingresses:

```bash
kubectl get ingress --all-namespaces
```

Patch the ingress class to use Traefik:

```bash
kubectl get ingress --all-namespaces -o jsonpath='{range .items[*]}{.metadata.name}{" "}{.metadata.namespace}{"\n"}{end}' | while read name namespace; do kubectl patch ingress "$name" -n "$namespace" -p '{"spec":{"ingressClassName":"traefik"}}'; done
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

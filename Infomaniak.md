
# Infomaniak

Deploy the Helm charts to [Infomaniak Managed Kubernetes service](https://www.infomaniak.com/en/hosting/public-cloud/kubernetes).

## Setup project

Create new Kubernetes cluster in the Infomaniak manager. Then add an instance group.

Download the Kubeconfig file and move it.

```bash
mv ~/Downloads/pck-XXXXXXX-kubeconfig ~/.kube/config.chk
export KUBECONFIG=~/.kube/config.chk
kubectl get namespaces
```

Switch context to `chk`.

```bash
task switch-context chk
```

Create a namespace for the application.

```bash
k create <namespace>
```

## Setup ingress nginx

Add all repos and install the ingress nginx.

```bash
task add-repos
task install-chart ingress-nginx values/chk.mintcloud.ch.yaml
```

## Setup cert manager

Create an Infomaniak API token with domain scope: <https://manager.infomaniak.com/v3/infomaniak-api>

Setup the secret according to [clusterIssuer > Secrets](/clusterIssuer/README.md#Secrets)

Install cert manager with Infomaniak webhook.

```bash
task install-chart cert-manager values/chk.mintcloud.ch.yaml
```

Install cluster issuer.

```bash
task install-chart clusterIssuer values/chk.mintcloud.ch.yaml
```

## Create Odoo release

Select the namespace.

```bash
kubens
```

Install the Odoo chart.

```bash
task install-chart odoo values/odoo.chk.mintcloud.ch
```

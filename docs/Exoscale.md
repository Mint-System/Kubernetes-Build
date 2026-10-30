# Exoscale

Deploy the Helm charts to [Exoscale - Hostend & Managed Kubernetes](https://www.exoscale.com/sks/).

## Setup project

Create new SKS cluster in the Exoscale manager. Then add a nodepool.

Download the Kubeconfig file and move it.

Switch to `exo` cluster.

```bash
task switch-context exo-admin
```

## Check default storage class name

The default storage class name has to be `exoscale-sbs`.

```bash
kubectl get storageclass
```

Set default storage class.

```bash
kubectl patch storageclass exoscale-sbs -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'
```

## Set default ingress class name



## Setup traefik ingress

Add all repos and install the traefik ingress.

```bash
task add-repos
task install-traefik
```

# Setup cert manager

Install cert manager with Infomaniak webhook.

```bash
task install-cert-manager
```

Create an Infomaniak API token with domain scope: <https://manager.infomaniak.com/v3/infomaniak-api>

Setup the secret according to [cluster-issuer > Secrets](cluster-issuer/README.md#secrets).

Install cluster issuer.

```bash
task install-cluster-issuer values/exo.mintcloud.ch.yaml
```

## Setup k8up

Install k8up in the current cluster.

```bash
task install-k8up
```

## Create Odoo release

Install the CloudNativePG chart:

```bash
task install-cnpg
```

Create a namespace for the application.

```bash
kubectl create namespace <namespace>
kubectl-ns <namespace>
```

Install the Odoo chart.

```bash
task install-chart odoo values/odoo.chk.mintcloud.ch
```
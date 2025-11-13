# Exoscale

Deploy the Helm charts to [Exoscale - Hostend & Managed Kubernetes](https://www.exoscale.com/sks/).

## Setup project

Create new SKS cluster in the Exoscale manager. Then add a nodepool.

Download the Kubeconfig file and move it.

Switch to `exo` cluster.

```bash
task switch-cluster exo
```

## Setup haproxy ingress

Add all repos and install the haproxy ingress.

```bash
task add-repos
task install-chart haproxy-ingress values/exo.mintcloud.ch.yaml
```

# Setup cert manager

Install cert manager with Infomaniak webhook.

```bash
task install-chart cert-manager values/exo.mintcloud.ch.yaml
```

Create an Infomaniak API token with domain scope: <https://manager.infomaniak.com/v3/infomaniak-api>

Setup the secret according to [clusterIssuer > Secrets](/clusterIssuer/README.md#Secrets).

Install cluster issuer.

```bash
task install-chart clusterIssuer values/exo.mintcloud.ch.yaml
```

## Setup k8up

Install k8up in the current cluster.

```bash
task install-chart k8up values/exo.mintcloud.ch.yaml
```

## Create Odoo release

Install the CloudNativePG chart:

```bash
task install-chart cnpg values/exo.mintcloud.ch.yaml
```

Create a namespace for the application.

```bash
k create namespace <namespace>
```

Select the namespace.

```bash
kubens
```

Install the Odoo chart.

```bash
task install-chart odoo values/odoo.chk.mintcloud.ch
```
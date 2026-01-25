# Development

Setup a local Kubernetes cluster and deploy the Helm charts.

## Setup

Clone the repository:

```bash
git clone git@github.com:Mint-System/Kubernetes-Build.git
cd Kubernetes-Build
```

Setup the local hostnames.

```bash
task setup-hosts
```

## Start and prepare Kubernetes cluster

The following command will start the kind cluster and install the base charts.

```bash
task start-and-prepare
```

It also load the Odoo image into the cluster.

## Deploy Odoo chart

Setup secrets according to the Odoo chart readme.

Install the Odoo chart:

```bash
task install-chart odoo test_values/odoo.knd.local.yaml
```

The Odoo database will be initialized automatically.

Forward the ingress-nginx port.

```bash
task forward ingress-nginx
```

## Deploy Nextcloud chart

Load the local image into the cluster.

```bash
task load-image nextcloud:32-apache
```

Setup secrets according to the Nextcloud chart readme.

Install the Nextcloud chart:

```bash
task install-chart nextcloud test_values/nextcloud.knd.local.yaml
```

The Odoo database will be initialized automatically.

Forward the ingress-nginx port.

```bash
task forward ingress-nginx
```

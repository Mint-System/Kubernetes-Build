# Development

Setup a local Kubernetes cluster and deploy the Helm charts.

## Requirements

Setup the required tools:

* [helm](https://helm.sh/docs/intro/install/), [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl) and [kubctx](https://kubectx.dev/)
* Setup [kind](https://kind.sigs.k8s.io/)
* Optional: bash/zsh alias `task='./task'` with [completion](https://taskfile.build/#completion).

Clone the repository:

```bash
git clone git@github.com:Mint-System/Kubernetes-Build.git
cd Kubernetes-Build
```

## Start Kubernetes cluster

Start cluster with `kind`.

```bash
task start-kind
```

## Deploy Odoo chart

Add Helm chart repos.

```bash
task add-repos
```

Setup the local hostnames.

```bash
task setup-hosts
```

Install the CloudNativePG chart:

```bash
task install-chart cnpg values/knd.local.yaml
```

Install ingress-nginx in the current cluster.

```bash
task install-chart ingress-nginx values/knd.local.yaml
```

Install k8up in the current cluster.

```bash
task install-chart k8up values/knd.local.yaml
```

Load the local image into the cluster.

```bash
task load-image mintsystem/odoo:18.0.20251008
```

Setup secrets according to the Odoo chart readme.

Install the Odoo chart:

```bash
task install-chart odoo values/odoo.knd.local.yaml
```

The Odoo database will be initialized automatically.

Forward the ingress-nginx port.

```bash
task forward ingress-nginx
```

## Setup haproxy ingress

Install haproxy-ingress in the current cluster.

```bash
task install-chart haproxy-ingress values/knd.local.yaml
```

Forward the haproxy-ingress port.

```bash
task forward haproxy-ingress
```

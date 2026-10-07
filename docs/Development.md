# Development

Setup a local Kubernetes cluster and deploy the Helm charts.

## Requirements

The development environment requires these tools:

- [yq](https://mikefarah.gitbook.io/yq/#install)
- [helm](https://helm.sh/docs/intro/install/)
- [helm-sops](https://github.com/camptocamp/helm-sops)
- [sops](https://getsops.io)
- [age](https://age-encryption.org//)
- [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl)
- [kubectx](https://kubectx.dev/)
- [kind](https://kind.sigs.k8s.io/)
- [uv](https://docs.astral.sh/uv/)

## Setup

Clone the repository:

```bash
git clone git@github.com:Mint-System/Kubernetes-Build.git
cd Kubernetes-Build
```

Setup bash/zsh alias `task='./task'` with optional [completion](https://taskfile.build/#completion)

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
task install-chart odoo test_values/knd/odoo.yaml
```

The Odoo database will be initialized automatically.

Select the default namespace.

```bash
kubectl-ns default
```

Forward the traefik port.

```bash
task forward traefik
```

## Deploy Nextcloud chart

Load the local image into the cluster.

```bash
task load-image nextcloud:32-apache
```

Setup secrets according to the Nextcloud chart readme.

Install the Nextcloud chart:

```bash
task install-chart nextcloud test_values/knd/nextcloud.yaml
```

The Odoo database will be initialized automatically.

Forward the traefik port.

```bash
task forward traefik
```

## Develop Helm charts

Generate Helm chart readmes:

```bash
task docs
```

Lint Helm charts:

```bash
task lint
```
Kubernetes Build
===

[![.github/workflows/package.yml](https://github.com/Mint-System/Kubernetes-Build/actions/workflows/package.yml/badge.svg)](https://github.com/Mint-System/Kubernetes-Build/actions/workflows/package.yml) [![.github/workflows/test.yml](https://github.com/Mint-System/Kubernetes-Build/actions/workflows/test.yml/badge.svg)](https://github.com/Mint-System/Kubernetes-Build/actions/workflows/test.yml) [![matrix-badge](https://matrix.to/img/matrix-badge.svg)](https://matrix.to/#/#odoo-build:mint-system.ch)

The Mint System collection of Helm charts.

- **Install**: Install Helm repository and get started with Odoo.
- **Develop**: Deploy Odoo and Postgres to a local Kubernetes cluster.
- **Build**: Fork and build your own Helm charts.
- **Deploy**: Configure and deploy Helm charts to remote clusters.
- **Bootstrap**: Bootstrap new Kubernetes clusters.

## Usage

You can use this project as any other Helm chart repository.

Add [this Helm repository](/index.yaml).

```bash
helm repo add kubernetes-build https://kubernetes.build
```

Install a chart.

```bash
helm install "$NAME" "kubernetes-build/$NAME"
```

## Charts

List of charts:

- [cluster-issuer](cluster-issuer/README.md)
- [deployment-updater](deployment-updater/README.md)
- [forgejo-runner](forgejo-runner/README.md)
- [nextcloud](nextcloud/README.md)
- [odoo](odoo/README.md)
- [postgres](postgres/README.md)
- [prometheus-agent](prometheus-agent/README.md)
- [taskfile-build](taskfile-build/README.md)
- [vshn-postgres](vshn-postgres/README.md)

## Deploy

You can use this project to deploy the charts to these Kubernetes clusters:

- [APPUiO](./APPUiO.md)
- [Exoscale](./Exoscale.md)
- [Infomaniak](./Infomaniak.md)
- [K3s](./K3s.md)

## Develop

The [Development](./Development.md) covers everything to start developing the Helm charts.

## Backup

Have a look at the [Backup](./Backup.md) page to learn about how the services make backups.

## Monitoring

Checkout the [Monitor](./Monitor.md) page to learn about how services are monitored.

## Migration

To execute migrations have a look at [Migration](Migration.md).
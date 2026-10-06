# Kubernetes Build

The Mint System collection of Helm charts.

---

Read the docs at [kubernetes.build](https://kubernetes.build).

## Development

The development environment requires these tools:

- [yq](https://mikefarah.gitbook.io/yq/#install)
- [helm](https://helm.sh/docs/intro/install/)
  - [helm-sops](https://github.com/camptocamp/helm-sops)
    - [sops](https://getsops.io/docs/installation/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl)
  - [kubectx](https://kubectx.dev/)
- [kind](https://kind.sigs.k8s.io/)
- [uv](https://docs.astral.sh/uv/)
- bash/zsh alias `task='./task'` with optional [completion](https://taskfile.build/#completion)

### Setup

Clone this repo and enter the folder:

```bash
git clone git@github.com:Mint-System/Kubernetes-Build.git
cd Kubernetes-Build
```

Setup the local hostnames:

```bash
task setup-hosts
```

Initialize the documentation build dependencies:

```bash
task init-zensical-docs
```

### Commands

Run the documentation development server:

```bash
task dev-zensical-docs
```

Build the documentation website:

```bash
task build-zensical-docs
```

Serve the built documentation:

```bash
task serve-zensical-docs
```

Generate Helm chart readmes:

```bash
task docs
```

Lint Helm charts:

```bash
task lint
```

Show all available commands:

```bash
task help
```

## Charts

- [cluster-issuer](cluster-issuer/README.md)
- [deployment-updater](deployment-updater/README.md)
- [forgejo-runner](forgejo-runner/README.md)
- [nextcloud](nextcloud/README.md)
- [odoo](odoo/README.md)
- [postgres](postgres/README.md)
- [prometheus-agent](prometheus-agent/README.md)
- [taskfile-build](taskfile-build/README.md)
- [vshn-postgres](vshn-postgres/README.md)

## License

[AGPL-3.0-only](LICENSE)

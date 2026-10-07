# Kubernetes Build

The Mint System collection of Helm charts.

---

Read the docs at [kubernetes.build](https://kubernetes.build).

## Setup

Clone this repo and enter the folder:

```bash
git clone git@github.com:Mint-System/Kubernetes-Build.git
cd Kubernetes-Build
```

Setup bash/zsh alias `task='./task'` with optional [completion](https://taskfile.build/#completion)

Show all available commands:

```bash
task help
```

## Documentation

Initialize the documentation build dependencies:

```bash
task init-zensical-docs
```

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

## License

[AGPL-3.0-only](LICENSE)

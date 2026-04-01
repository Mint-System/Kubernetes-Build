# K3s

## Setup project

Setup K3s cluster with Ansible: <https://ansible.build/roles/k3s/>

Setup Kubeconfig with alias `rpi`.

Switch to `rpi` cluster.

```bash
task switch-context rpi-admin
```

## Setup cert manager

Install cert manager.

```bash
task install-chart cert-manager values/k3s.raspberrypi.build.yaml
```

Install cluster issuer.

```bash
task install-chart clusterIssuer values/k3s.raspberrypi.build.yaml
```

## Create Hugo release

Create a namespace for the application.

```bash
k create namespace <namespace>
```

Select the namespace.

```bash
kubectl-ns
```

Install the Hugo chart.

```bash
task install-chart hugo
```

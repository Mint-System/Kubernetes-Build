# K3s

## Setup project

Setup K3s cluster with Ansible: <https://ansible.build/roles/k3s/>

Setup Kubeconfig with alias `rpi`.

Switch to `rpi` cluster.

```bash
cd gitops
./task switch-kubeconfig rpi/.kube/config-admin.yaml
```

## Setup cert manager

Install cert manager.

```bash
task install-cert-manager
```

Install cluster issuer.

```bash
task install-cluster-issuer gitops/k3s.raspberrypi.build.yaml
```

## Create Hugo release

Create a namespace for the application.

```bash
kubectl create namespace <namespace>
select-kubectl-namespace
```

Install the Hugo chart.

```bash
task install-chart taskfile-build
```

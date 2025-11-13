# K3s

## Setup project

Setup K3s cluster with Ansible: <https://ansible.build/roles/k3s/>

Setup Kubeconfig with alias `rpi`.

Switch to `rpi` cluster.

```bash
task switch-cluster rpi
```

## Setup haproxy ingress

Add all repos and install the haproxy ingress.

```bash
task add-repos
task install-chart haproxy-ingress values/k3s.raspberrypi.build.yaml
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
kubens
```

Install the Hugo chart.

```bash
task install-chart hugo
```

# K3s

## Setup project

Setup K3s cluster with Ansible: <https://ansible.build/roles/k3s/>

Setup Kubeconfig with alias `rpi`.

Switch context to `rpi`.

```bash
task switch-context rpi
```

Create a namespace for the application.

```bash
k create <namespace>
```

## Setup ingress nginx

Add all repos and install the ingress nginx.

```bash
task add-repos
task install-chart ingress-nginx values/k3s.raspberrypi.build.yaml
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

Select the namespace.

```bash
kubens
```

Install the Hugo chart.

```bash
task install-chart hugo
```

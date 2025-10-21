Kubernetes Build
===

![Vercel](https://vercelbadge.vercel.app/api/mint-system/kubernetes-build)

[![.github/workflows/test.yml](https://github.com/Mint-System/Kubernetes-Build/actions/workflows/test.yml/badge.svg)](https://github.com/Mint-System/Kubernetes-Build/actions/workflows/test.yml)

[![matrix-badge](https://matrix.to/img/matrix-badge.svg)](https://matrix.to/#/#odoo-build:mint-system.ch)

The Mint System collection of Helm charts.

* 🚀 **Install**: Install Helm repository and get started with Odoo.
* 🛠️ **Develop**: Deploy Odoo and Postgres to a local Kubernetes cluster.
* 🏗️ **Build**: Fork and build your own Helm charts.
* 🚀 **Deploy**: Configure and deploy Helm charts to remote clusters.

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

* [clusterIssuer](/clusterIssuer/README.md)
* [odoo](/odoo/README.md)
* [nextcloud](/nextcloud/README.md)
* [postgres](/postgres/README.md)
* [vshnPostgres](/vshnPostgres/README.md)
* [hugo](/hugo/README.md)
* [vuepress](/vuepress/README.md)
* [deploymentUpdater](/deploymentUpdater/README.md)
* [forgejoRunner](/forgejoRunner/README.md)
* [taskfileBuild](/taskfileBuild/README.md)

## Develop

Setup a local Kubernetes cluster and deploy the Helm charts.

### Requirements

Setup the required tools:

* [helm](https://helm.sh/docs/intro/install/), [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl) and [kubctx](https://kubectx.dev/)
* Setup [kind](https://kind.sigs.k8s.io/) or [minikube](https://minikube.sigs.k8s.io/docs/)
* Optional: bash/zsh alias `task='./task'` with [completion](https://taskfile.build/#completion).

Clone the repository:

```bash
git clone git@github.com:Mint-System/Kubernetes-Build.git
cd Kubernetes-Build
```

### Start Kubernetes cluster

Start cluster with `kind`.

```bash
task start-kind
```

Or start cluster with `minikube`.

```bash
task start-minikube
```

### Deploy Odoo chart

Add Helm chart repos.

```bash
task add-repos
```

Ssetup the local hostnames.

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

Install the Odoo chart:

```bash
task install-chart odoo values/odoo.knd.local.yaml
```

The Odoo database will be initialized automatically.

Forward the ingress-nginx port.

```bash
task forward ingress-nginx
```

### Setup haproxy ingress

Install haproxy-ingress in the current cluster.

```bash
task install-chart haproxy-ingress values/knd.local.yaml
```

Forward the haproxy-ingress port.

```bash
task forward haproxy-ingress
```

## Deploy

You can use this project to deploy the charts to these Kubernetes clusters:

* [APPUiO](#APPUiO)
* [Infomaniak](#Infomaniak)
* [K3s](#K3s)

### APPUiO

Setup and deploy the Helm charts with [APPUiO](https://portal.appuio.cloud/).

#### Login with OpenShift

Open the OpenShift console in your zone.

Click on the username on the top right and select *Copy login command*.

In the new tab click *Display token* and copy the *Login with this token* command.

Run the command in your shell.

#### Setup project

If not alrady done, create a project with the oc cli.

```bash
oc new-project odoo
```

#### Create Odoo release

Add Helm repos to the local index.

```bash
task add-repos
```

Switch context to `axo`.

```bash
task switch-context axo
```

Install the Helm release.

```bash
task install-chart odoo values/odoo.axo.mintcloud.ch.yaml
```

### Infomaniak

Deploy the Helm charts to [Infomaniak Managed Kubernetes service](https://www.infomaniak.com/en/hosting/public-cloud/kubernetes).

#### Setup project

Create new Kubernetes cluster in the Infomaniak manager. Then add an instance group.

Download the Kubeconfig file and move it.

```bash
mv ~/Downloads/pck-XXXXXXX-kubeconfig ~/.kube/config.chk
export KUBECONFIG=~/.kube/config.chk
kubectl get namespaces
```

Switch context to `chk`.

```bash
task switch-context chk
```

Create a namespace for the application.

```bash
k create <namespace>
```

#### Setup ingress nginx

Add all repos and install the ingress nginx.

```bash
task add-repos
task install-chart ingress-nginx values/chk.mintcloud.ch.yaml
```

#### Setup cert manager

Create an Infomaniak API token with domain scope: <https://manager.infomaniak.com/v3/infomaniak-api>

Setup the secret according to [clusterIssuer > Secrets](/clusterIssuer/README.md#Secrets)

Install cert manager with Infomaniak webhook.

```bash
task install-chart cert-manager values/chk.mintcloud.ch.yaml
```

Install cluster issuer.

```bash
task install-chart clusterIssuer values/chk.mintcloud.ch.yaml
```

#### Create Odoo release

Select the namespace.

```bash
kubens
```

Install the Odoo chart.

```bash
task install-chart odoo values/odoo.chk.mintcloud.ch
```

### K3s

#### Setup project

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

#### Setup ingress nginx

Add all repos and install the ingress nginx.

```bash
task add-repos
task install-chart ingress-nginx values/k3s.raspberrypi.build.yaml
```

#### Setup cert manager

Install cert manager.

```bash
task install-chart cert-manager values/k3s.raspberrypi.build.yaml
```

Install cluster issuer.

```bash
task install-chart clusterIssuer values/k3s.raspberrypi.build.yaml
```

#### Create Hugo release

Select the namespace.

```bash
kubens
```

Install the Hugo chart.

```bash
task install-chart hugo
```

## Troubleshooting

### Reset the postgres password

The postgres data is persisted on the host. Removing the pvc will not deleted the postgres data. To update the password, enter the container and run:

```bash
psql -c "ALTER USER $PGUSER WITH PASSWORD '$PGPASSWORD';"
```

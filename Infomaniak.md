
# Infomaniak

Deploy the Helm charts to [Infomaniak Managed Kubernetes service](https://www.infomaniak.com/en/hosting/public-cloud/kubernetes).

## Setup project

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

## Setup haproxy ingress

Add all repos and install the haproxy ingress.

```bash
task add-repos
task install-chart haproxy-ingress values/chk.mintcloud.ch.yaml
```

## Setup cert manager

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

## Create Odoo release

Select the namespace.

```bash
kubens
```

Install the Odoo chart.

```bash
task install-chart odoo values/odoo.chk.mintcloud.ch
```

## Troubleshooting

### VolumeLimitExceeded

**Problem**

New pods are pending. When checking the state of the pvc the following message is shown:

```
Warning  ProvisioningFailed    22s (x8 over 2m30s)  cinder.csi.openstack.org_openstack-cinder-csi-controllerplugin-7fc49d566-k8k6m_01c4c2ed-0e7c-4ca3-b7db-df8c84fc8839  failed to provision volume with StorageClass "csi-cinder-sc-retain": rpc error: code = Internal desc = CreateVolume failed with error Expected HTTP response code [202] when accessing [POST https://api.pub2.infomaniak.cloud/volume/v3/624934911cbe4e4189d060d3bc96ac76/volumes], but got 413 instead: {"overLimit": {"code": 413, "message": "VolumeLimitExceeded: Maximum number of volumes allowed (20) exceeded for quota 'volumes'.", "retryAfter": "0"}}
Normal   ExternalProvisioning  6s (x24 over 5m30s)  persistentvolume-controller                                                                                          Waiting for a volume to be created either by the external provisioner 'cinder.csi.openstack.org' or manually by the system administrator. If volume creation is delayed, please verify that the provisioner is running and correctly registered.
```

**Solution**

Log into OpenStack and delete unused volumes or update the quota for the project.

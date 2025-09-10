# Mint System Vuepress

This Helm chart deploys a Vuepress site.

### Forgejo Deployment action

To deploy the Vupress site in a Forgejo action a kubeconfig is required.

```bash
name=deploy-sa-token
server=$(kubectl config view --minify --output 'jsonpath={.clusters[0].cluster.server}')
ca=$(kubectl get secret/$name -o jsonpath='{.data.ca\.crt}')
token=$(kubectl get secret/$name -o jsonpath='{.data.token}' | base64 --decode)
namespace=$(kubectl get secret/$name -o jsonpath='{.data.namespace}' | base64 --decode)

echo "
apiVersion: v1
kind: Config
clusters:
- name: default-cluster
  cluster:
    certificate-authority-data: ${ca}
    server: ${server}
contexts:
- name: default-context
  context:
    cluster: default-cluster
    namespace: default
    user: default-user
current-context: default-context
users:
- name: default-user
  user:
    token: ${token}
" > deploy.kubeconfig
```

Setup secret `KUBECONFIG_DEPLOY` with content of `deploy.kubeconfig`.

## Parameters

### Ingress parameters

| Name                       | Description                                  | Value   |
| -------------------------- | -------------------------------------------- | ------- |
| `ingress.enabled`          | Enable or disable the ingress                | `true`  |
| `ingress.className`        | The class name for the ingress               | `nginx` |
| `ingress.clusterIssuerRef` | The cluster issuer reference for the ingress | `""`    |
| `ingress.host`             | The host for the ingress                     | `""`    |

### Hugo parameters

| Name              | Description                | Value    |
| ----------------- | -------------------------- | -------- |
| `image`           | The image for Hugo         | `""`     |
| `imagePullPolicy` | Pull policy for hugo image | `Always` |

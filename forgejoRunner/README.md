# Mint System forgejoRunner

Setup a Forgejo runner to run actions.

## Secrets

To register the runner set up a `forgejo-runner` secret with the token.

```bash
kubectl create secret generic forgejo-runner \
    --from-literal=forgejoInstanceToken="$FORGEJO_INSTANCE_TOKEN" \
    -n <namespace>
```

## Builder

To use the Buildx builder in your Forgejo action a kubeconfig is required.

```bash
name=buildx-sa-token
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
" > buildx.kubeconfig
```

Setup secret `KUBECONFIG_BUILDX` with content of `buildx.kubeconfig`.

## Parameters

### Forgejo Runner parameters

| Name                 | Description                                 | Value                               |
| -------------------- | ------------------------------------------- | ----------------------------------- |
| `image`              | The image for the Forgejo Runner            | `code.forgejo.org/forgejo/runner:9` |
| `forgejoInstanceUrl` | Forgejo instance url.                       | `https://codeberg.org`              |
| `secretRef`          | The secret reference for the Forgejo Runner | `forgejo-runner`                    |

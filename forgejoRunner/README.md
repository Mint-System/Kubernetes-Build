# Mint System Forgejo Runner

Setup a Forgejo runner to run actions.

## Secrets

To register the runner set up a `forgejo-runner` secret with the token.

```bash
FORGEJO_INSTANCE_TOKEN="*******"
kubectl create secret generic forgejo-runner \
    --from-literal=forgejoInstanceToken="$FORGEJO_INSTANCE_TOKEN" \
    -n <namespace>
```

## Integration

### Forgejo Buildx action

This role also provides a service account to access the Kubernetes cluster. With Buildx you can use the cluster as build enviroment. Export the kubeconfig to provide it in the Forgejo action with this command:

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

Here is are examples of Forgejo action steps:

```yaml
      - name: Create Kubeconfig for Buildx
        run: |
          mkdir -p $HOME/.kube
          echo "${{ secrets.KUBECONFIG_BUILDX }}" > $HOME/.kube/config

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
        with:
          driver: kubernetes
          driver-opts: |
            namespace=codeberg
```

## Parameters

### Forgejo Runner parameters

| Name                 | Description                                 | Value                               |
| -------------------- | ------------------------------------------- | ----------------------------------- |
| `image`              | The image for  Forgejo Runner               | `code.forgejo.org/forgejo/runner:9` |
| `imagePullPolicy`    | Pull policy for  Forgejo Runner image       | `Always`                            |
| `forgejoInstanceUrl` | Forgejo instance url.                       | `https://codeberg.org`              |
| `secretRef`          | The secret reference for the Forgejo Runner | `forgejo-runner`                    |
| `storageClassName`   | Set the storage class                       | `""`                                |

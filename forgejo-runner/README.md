# Mint System Forgejo Runner

Setup a Forgejo runner to run actions.

## Secrets

To register the runner set up a `forgejo-runner` secret with the token.

```bash
kubectl create secret generic forgejo-runner \
    --from-literal=forgejoInstanceToken="$forgejo_instance_token" \
    -n <namespace>
```

## Integration

### Forgejo Buildx action

This role also provides a service account to access the Kubernetes cluster. With Buildx you can use the cluster as build enviroment. Export the kubeconfig to provide it in the Forgejo action with this command:

```bash
task generate-kubconfig buildx
```

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

Setup secret `KUBECONFIG_BUILDX` with content of the created kubeconfig.

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

## Values

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| forgejoInstanceUrl | string | `"https://codeberg.org"` | Forgejo instance url. |
| image | string | `"code.forgejo.org/forgejo/runner:9"` | The image for  Forgejo Runner |
| imagePullPolicy | string | `"Always"` | Pull policy for  Forgejo Runner image |
| resources.limits.memory | string | `"1Gi"` | Memory limit for the container |
| resources.requests.cpu | string | `"100m"` | CPU request for the container |
| resources.requests.memory | string | `"500Mi"` | Memory request for the container |
| secretRef | string | `"forgejo-runner"` | The secret reference for the Forgejo Runner |
| storageClassName | string | `""` | Set the storage class |

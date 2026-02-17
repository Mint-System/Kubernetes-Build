# Mint System Deployment Updater

Cluster-wide service account that can update deployments.

## Integration

### Forgejo Deployment action

Use this service account to make deployments to Kubernetes. The deployment action requires a kubeconfig. Export the kubeconfig with this command:

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

Here is are examples of Forgejo action steps:

```yaml
      - name: Install kubectl
        run: |
          curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
          chmod +x kubectl
          sudo mv kubectl /usr/local/bin/

      - name: Create Kubeconfig for Deployment
        run: |
          mkdir -p $HOME/.kube
          echo "${{ secrets.KUBECONFIG_DEPLOY }}" > $HOME/.kube/config
```
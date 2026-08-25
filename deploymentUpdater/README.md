# Mint System Deployment Updater

Cluster-wide service account that can update deployments.

## Integration

### Forgejo Deployment action

Use this service account to make deployments to Kubernetes. The deployment action requires a kubeconfig. Export the kubeconfig with this command:

```bash
task generate-kubconfig deploy
```

Setup secret `KUBECONFIG_DEPLOY` with content of the created kubeconfig.

Here is an example of a Forgejo action:

```yaml
on:
  push:
    branches:
      - "main"

jobs:
  deploy:
    name: Deploy to Kubernetes
    runs-on: ubuntu-latest
    steps:
      - name: Install kubectl
        run: |
          curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
          chmod +x kubectl
      - name: Create Kubeconfig for Deployment
        run: |
          mkdir -p $HOME/.kube
          echo "${{ secrets.KUBECONFIG_DEPLOY }}" > $HOME/.kube/config
      - name: Verify kubectl version
        run: ./kubectl version --client
      - name: Deploy to Kubernetes
        run: ./kubectl delete pods -l app=taskfile-build -n ansible-build
```
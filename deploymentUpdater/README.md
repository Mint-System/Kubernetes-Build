# Mint System Deployment Updater

Cluster-wide service account that can update deployments.

## Integration

### Forgejo Deployment action

Use this service account to make deployments to Kubernetes. The deployment action requires a kubeconfig. Export the kubeconfig with this command:

```bash
task generate-kubconfig deploy
```

Setup secret `KUBECONFIG_DEPLOY` with content of the created kubeconfig.

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
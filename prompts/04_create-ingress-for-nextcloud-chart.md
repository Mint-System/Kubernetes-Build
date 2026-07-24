---
title: "Create ingress for nextcloud chart"
state: completed
model: Kimi-K2.6
input_tokens:
---

# Run 04

Note: @Clanker refers to the "ai agent" (you) who is working on this task.

@Clanker when working on this task, make sure to:

- Read context and task section first
- Prepare a list of todos
- Update the todo list while working on the task

## Context

@Clanker Read the `AGENTS.md` and `README.md` to get an understanding of the project.

## Task

My nextcloud chart is wrapper for the official nextcloud chart: https://github.com/nextcloud/helm/blob/main/charts/nextcloud/README.md#configuration

It supports a flag `ingress.enable` and with `task template-manifest nextcloud values/nextcloud-uri-cloud.exo.mintcloud.ch.yaml > manifest.yml` this produces:

```yaml
# Source: nextcloud/charts/nextcloud/templates/ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: nextcloud
  labels:
    app.kubernetes.io/name: nextcloud
    app.kubernetes.io/instance: nextcloud
    app.kubernetes.io/component: app
    helm.sh/chart: nextcloud-9.2.4
    app.kubernetes.io/managed-by: Helm
    app.kubernetes.io/version: "34.0.1"
spec:
  rules:
    - host: cloud.uri-cloud.ch
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: nextcloud
                port:
                  number: 8080
```

To enable https I would need to configure `ingress.tls`.

But I think it easier if I configure the Ingress myself. Use this as template: `taskfileBuild/templates/ingress.yaml`

Ommit the `customDomain` feature. Update the `nextcloud/values.yaml`.

To update the roles docs use `task lint` and `task docs`.

## Worklog

- Created `nextcloud/templates/ingress.yaml` based on the `taskfileBuild/templates/ingress.yaml` template, omitting the `customDomain` feature.
- Set the Ingress backend to the `nextcloud` service on port `8080` (matching the official subchart's default).
- Updated `nextcloud/values.yaml`:
  - Added a root-level `ingress` section with `enabled`, `className`, `clusterIssuerRef`, and `host` parameters.
  - Set `nextcloud.ingress.enabled: false` to prevent the official Nextcloud subchart from generating its own Ingress.
- Ran `task lint` and `task docs` successfully. The Nextcloud `README.md` was regenerated to reflect the new parameters.


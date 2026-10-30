---
commit_ref:
title: "Create Helm chart remark42 from Ansible role"
author: "Janik von Rotz <login@janikvonrotz.ch>"
state: wip
date_completed: 2026-10-30
model: glm-5-2
input_tokens: 1123142
output_tokens: 11103
---

# Create Helm chart remark42 from Ansible role

Note: @Clanker refers to the "ai agent" (you) who is working on this prompt file.

@Clanker when working on this prompt file, make sure to:

- Read context and task section first
- Prepare a list of todos
- Update the todo list while working on task

## Context

@Clanker Read the `AGENTS.md` and `README.md` to get an understanding of the project.

## Task

### New chart

Have a look at the Ansible role `~/Ansible-Build/roles/remark42`. I want you to create a Helm chart based on this role.

The name of the chart is `remark42` and the title `Mint System Remark42`.

Use `taskfile-build` as a template for the Helm chart.

Add `k8up` backup based on `odoo/templates/backup.yaml`.

### Create deployment

To test the role I want you to create a deployment `values/jvr/comment.janikv.cloud.yaml`.

Prepare the same values as I have for the Ansible role. You find the values in `tmp/comment.janikvonrotz.ch.yaml`.

Use `comment.janikvonrotz.ch` as custom domain.

Do not install this chart. Use the `task generate-manifest` and pipe into `manifest.yaml`. I will then review the manifest.

### Migration

I need to migrate the data from my Docker container (deployed with Ansible) to the new Helm chart deployment.

Provide a guide on how to export/import the data from a remark42 container.

### Testing

I will test the deployment and migration myself. Do not apply or deploy anything.

## Worklog

Created the `remark42` Helm chart based on the `taskfile-build` template and the `~/Ansible-Build/roles/remark42` Ansible role.

- `remark42/Chart.yaml`, `remark42/values.yaml` and `remark42/README.md` define the chart titled **Mint System Remark42**.
- Templates: `deploy.yaml`, `svc.yaml` (port 8081), `pvc.yaml` (`data-remark42`), `cm.yaml` (non-secret env vars mirroring the Ansible role), `ingress.yaml` (port 8081, traefik/nginx support) and `backup.yaml` (K8up backup adapted from `odoo/templates/backup.yaml`).
- Sensitive values (`SECRET`, `SMTP_PASSWORD`, `AUTH_GITHUB_*`, `AUTH_CUSTOM_CSEC`) are referenced from a manually created secret via `secretName`.
- Created the deployment values `values/jvr/comment.janikv.cloud.yaml` using `comment.janikvonrotz.ch` as custom domain and `comment.janikv.cloud` as host, mirroring the Ansible role example values.
- Generated `manifest.yaml` with `task template-manifest remark42 values/jvr/comment.janikv.cloud.yaml` for review. `task lint` passes.
- Added the chart and a Remark42 migration guide to `zensical.toml` and created `docs/Migrate-Remark42-Docker-to-Kubernetes.md` covering the file-copy migration and the export/import API. The migration docs were split into multiple documents under a `Migration` section.

Note: The referenced `tmp/comment.janikvonrotz.ch.yaml` was not present, so the deployment values were derived from the Ansible role README example. `task docs` could not run automatically (pnpm/zensical tooling not initialized in this environment), so the chart README was written manually following the established `taskfile-build` README format.

---
commit_ref: e2140f48362d45dce2c54167945cfeb47bf24c7f
title: "Create Helm chart remark42 from Ansible role"
author: "Janik von Rotz <login@janikvonrotz.ch>"
state: completed
date_completed: 2026-11-03
model: deepseek-v4-flash-0731
input_tokens: 623208
output_tokens: 23475
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

### New chart (done)

Have a look at the Ansible role `~/Ansible-Build/roles/remark42`. I want you to create a Helm chart based on this role.

The name of the chart is `remark42` and the title `Mint System Remark42`.

Use `taskfile-build` as a template for the Helm chart.

Add `k8up` backup based on `odoo/templates/backup.yaml`.

### Create deployment (done)

To test the role I want you to create a deployment `values/jvr/comment.janikv.cloud.yaml`.

Prepare the same values as I have for the Ansible role. You find the values in `tmp/comment.janikvonrotz.ch.yaml`.

Use `comment.janikvonrotz.ch` as custom domain.

Do not install this chart. Use the `task generate-manifest` and pipe into `manifest.yaml`. I will then review the manifest.

### Migration (done)

I need to migrate the data from my Docker container (deployed with Ansible) to the new Helm chart deployment.

Provide a guide on how to export/import the data from a remark42 container.

### Testing (done)

I will test the deployment and migration myself. Do not apply or deploy anything.

### Secrets migration (done)

First I want you to add sops filter for `stringData`. Currently I cannot decrypt secrests

```bash
[main][~/Kubernetes-Build]$ cd gitops
[main][~/Kubernetes-Build/gitops]$ task cat-with-sops chk/projects/{project}/taskfile-build/secrets.yaml
apiVersion: v1
kind: Secret
metadata:
    name: taskfile-build-config
type: Opaque
stringData:
    gitUrl: ENC[AES256_GCM,data:o3fuHwnMXRw==,type:str]
```

Then I want you to prepare a `gitops/jvr/projects/janikvonrotz/taskfile-build/secrets.yaml`

```yaml
apiVersion: v1
kind: Secret
metadata:
    name: remark42-secrets
type: Opaque
stringData:
	SECRET: 'your-secret'
	SMTP_PASSWORD: 'your-smtp-password'
	AUTH_CUSTOM_CSEC: 'your-custom-secret'
---
apiVersion: v1
kind: Secret
metadata:
    name: s3-credentials
type: Opaque
stringData:
	username: 'your-s3-access-key'
	password: 'your-s3-secret-key'
```

The remark42 secret values can be retrieved from `tmp/secrets`. The `s3-credentials` credentials are not ready yet.

Then I want you to update the `task install-chart` command to check if a `secrets.yaml` in folder of the target `values.yaml` exists.

And if it does, it uses `cat-with-sops` to get the contents. The command then adds the secrets to the manifest that is being applied.

Apply the same changes to `template-manifest`

The command `template-manifest` is missing in `gitops/task`. Copy to `gitops/task` and add to new section "HELM".

Ensure the commands are in sync.

### Testing secrets (done)

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

Implemented the SOPS secrets handling in the gitops repo (`gitops/`):

- Added SOPS creation rules with `encrypted_regex: '^(data|stringData)$'` for all cluster aliases (`axo`, `chk`, `exo`, `jvr`, `k3s`, `ksi`, `acs`) in `gitops/.sops.yaml`. Secrets with `stringData` can now be decrypted/encrypted (`task cat-with-sops` works).
- Created `gitops/jvr/projects/comment/remark42/secrets.yaml` with two secrets:
  - `remark42-secrets` with `SECRET`, `SMTP_PASSWORD` and `AUTH_CUSTOM_CSEC`, values taken from `gitops/tmp/secrets` (matching `vault_remark42_*`).
  - `s3-credentials` with placeholder `username`/`password` (credentials not ready yet; `k8up.enabled: false` in the deployment values so it is not used).
- Updated `gitops/task`:
  - `install-chart` now checks for a `secrets.yaml` in the folder of the target `values.yaml` and, if present, applies the decrypted secrets with `cat-with-sops "$secrets_file" | kubectl apply -f -` before installing the chart.
  - Added `template-manifest` (in a new `===HELM===` section); it prepends the decrypted secrets (separated by `---`) to the Helm template output so they flow into `manifest.yaml`.
  - Both commands route secret decryption through the shared `cat-with-sops` helper so they stay in sync.
- Verified `task cat-with-sops jvr/projects/comment/remark42/secrets.yaml` decrypts both secrets successfully.

Committed in the `gitops` repo:

- `b375f30 feat(.prompt): add SOPS encryption rules and Helm secret handling`
- `2a2c6d0 fix(.prompt): use cat-with-sops helper in install-chart and template-manifest`

State set to review. The secrets deployment and data migration remain to be tested by the author.

The author confirmed the results after testing the secrets deployment and data migration. State set to completed.

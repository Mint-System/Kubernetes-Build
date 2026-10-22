---
commit_ref:
title: "Add sops backend for Helm secrets"
author: "Janik von Rotz <login@janikvonrotz.ch>"
state: draft
date_completed: YYYY-MM-DD
harness:
model:
input_tokens:
output_tokens:
---

# Add sops backend for Helm secrets

Note: @Clanker refers to the "ai agent" (you) who is working on this prompt file.

@Clanker when working on this prompt file, make sure to:

- Read context and task section first
- Prepare a list of todos
- Update the todo list while working on task

## Context

@Clanker Read the `AGENTS.md` and `README.md` to get an understanding of the project.

## Task

I want to support `helm-sops` / `sops` with `age` keys in this project. Here is an example:

- `/home/janikvonrotz/odoo-for-vshn/.sops.yaml` This is a backend configuration for `.yaml` files.
- `deployment/secrets/upgrade/odoo-creds.sops.yaml` This file is encrypted.

### Taskfile commands

Existing commands: `show-project-setup` / `list-agekeys` / `store-agekey-to-keypass` / `load-agekey-from-keepass`

New commands:

- `init-sops`: Creates the .sops.yaml. Probably done once.
- `create-secret <path>`: Templaces a `.yaml` file with a Kubernetes secret and encrypts the data.
- `edit-secret <path>`: Decrypts the target file with a secret and allows editing the values. Similar to `edit-dotenv`.

Update these commands:

- `install-chart <chart> <path>`: The path can point to a `.yaml` that has either Helm values or a Kubernetes secret resource with encrypted values.
- `upgrade-release <chart> <path>`: Same as above.
- `template-manifest <chart> <path>`: Shows the decrypted output.

I am not entirely sure if <https://github.com/camptocamp/helm-sops> is required to make this happen.

### Update Helm charts

**taskfile-build**

I need to support secrets for selected Helm charts. For example the taskfile-build `gitUrl`. I would like to be able to create a secret like `values/chk/odoo-smart-me-etl/secrets.yaml`:

```yaml
apiVersion: v1
kind: Secret
metadata:
    name: taskfile-build-values
type: Opaque
stringData:
    gitUrl: ENC[AES256_GCM,data:o3fuHwnMXRw==,type:str] 
```

And then if I deploy the Chart with `task install-chart taskfile-build values/chk/odoo-smart-me-etl` the secret is decrypted and applied.

Definiting `gitUrl` as secret should be optional. It still should be possible to define it in the `values.yaml` as cleartext.

Let me know if this is possible. If this works I also want to update:

- `odoo` / `init.password`
- `nextcloud` / `nextcloud.nextcloud.password` 

### Testing

I have prepared the local cluster. You can deploy values from `test_values/`.

### Documentation

Create a document in `docs/` that describes how encrypted secrets can be created and edited.

@Clanker When task is completed set frontmatter state to review. Prompt the author to verify the results.

## Worklog

@Clanker Add a summary here once the task has been completed.

@Clanker If author confirms results set frontmatter state to completed, otherwise to aborted. Update date, harness and model. If you have access to session info also add token count.

---
commit_ref: 660459e43dd8ad9bfd0d763052f74c822cd378b0
title: "separate generic install commands and cluster serice install commands"
author: "Janik von Rotz <login@janikvonrotz.ch>"
action: implement
state: completed
date_completed: 2026-10-30
harness: pi
model: glm-5-2
input_tokens: 20212
output_tokens: 6122
---

# separate generic install commands and cluster serice install commands

Note: @Clanker refers to the "ai agent" (you) who is working on this prompt file.

@Clanker when working on this prompt file, make sure to:

- Read context and task section first
- Prepare a list of todos
- Update the todo list while working on task

## Context

@Clanker Read the `AGENTS.md` and `README.md` to get an understanding of the project.

## Task

Cluster services such as `cnpg` are installed with `install-chart cnpg` which then falls back to `install-cnpg`.

I want `install-chart` to work for `list-charts` only. And the `list-external-charts` have to be installed with epxlicit command.

Update the guides in `docs` to use the explicity command.

Create a help entry for these commands in a new "Bootstrap" section.

@Clanker When task is completed set frontmatter state to review. Prompt the author to verify the results.

## Worklog

- Restricted `install-chart` in `task` to local charts only (`list-charts`) plus the `cluster-issuer` special case. External charts now error out with a hint to use the explicit bootstrap command.
- Added a new `===BOOTSTRAP===` section to the `task` help-table listing the explicit install commands: `install-cert-manager`, `install-cluster-issuer`, `install-cnpg`, `install-k8up`, `install-metrics-server`, `install-traefik`. Updated the `install-chart` description to "Install local Helm chart."
- Updated internal `test-chart-nextcloud` and `test-chart-remark42` functions to call the explicit `install-traefik`/`install-cnpg` commands instead of `install-chart`.
- Updated docs `Exoscale.md`, `Infomaniak.md` and `K3s.md` to use the explicit bootstrap commands for external charts. Local charts (odoo, nextcloud, prometheus-agent, taskfile-build) keep using `install-chart`.
- Validated with `task lint` (passes) and `task help` (Bootstrap section renders correctly). `task docs` could not run (pnpm not installed) but no chart READMEs were affected.
- End-to-end verified by installing the odoo chart manually: `task start`, `task add-repos`, `task install-traefik`, `task install-cnpg`, `task update-dependencies odoo`, `task install-chart odoo test_gitops/knd/odoo.yaml` — all pods (2x odoo-odoo replicas, 1x staging, postgres) reached Running state.

@Clanker If author confirms results set frontmatter state to completed, otherwise to aborted. Update date, harness and model. If you have access to session info also add token count.

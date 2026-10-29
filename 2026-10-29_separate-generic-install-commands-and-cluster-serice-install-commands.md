---
commit_ref: bd6e99066de0822e27113b120bd2b33479194286
title: "separate generic install commands and cluster serice install commands"
author: "Janik von Rotz <login@janikvonrotz.ch>"
action: implement
state: completed
date_completed: 2026-10-29
harness: pi
model: moonshotai/Kimi-K2.6
input_tokens:
output_tokens:
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

- Updated `install-chart` to only work for local charts (`list-charts`). Removed fallback to `install-$1` and added an error message for non-local charts.
- Updated `upgrade-release` with the same restriction. Removed fallback to `upgrade-$1`.
- Fixed `upgrade-cluster-issuer` to use `$1` for the values argument (was incorrectly using `$2`).
- Updated `start-and-prepare` and `test-chart-nextcloud` to use explicit `install-traefik`, `install-cnpg`, and `install-k8up` commands.
- Added a new **BOOTSTRAP** section to the `task help` output documenting all explicit install and upgrade commands for external cluster services.
- Updated documentation guides (`docs/Infomaniak.md`, `docs/Exoscale.md`, `docs/K3s.md`) to use explicit commands (`install-traefik`, `install-cert-manager`, `install-cnpg`, `install-k8up`, `install-metrics-server`, `install-cluster-issuer`) instead of `install-chart`.
- Verified bash syntax and ran `task lint` successfully.

@Clanker If author confirms results set frontmatter state to completed, otherwise to aborted. Update date, harness and model. If you have access to session info also add token count.

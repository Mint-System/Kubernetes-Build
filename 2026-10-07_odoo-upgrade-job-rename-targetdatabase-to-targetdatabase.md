---
commit_ref: 74dc78a24b6a4062b4f07c5559badbecd06d3287
title: "Odoo upgrade job rename target_database to targetDatabase"
author: "Janik von Rotz <login@janikvonrotz.ch>"
state: completed
date_completed: 2026-10-07
model: moonshotai/Kimi-K2.6
input_tokens: 575873
output_tokens: 5175
---

# Odoo upgrade job rename target_database to targetDatabase

Note: @Clanker refers to the "ai agent" (you) who is working on this prompt file.

@Clanker when working on this prompt file, make sure to:

- Read context and task section first
- Prepare a list of todos
- Update the todo list while working on task

## Context

@Clanker Read the `AGENTS.md` and `README.md` to get an understanding of the project.

## Task

Rename the var `target_database` to `targetDatabase`.

Other updates: OpenShift runs the pod with an arbitrary UID, so HOME is /. The tool keeps its dumps, SSH key and state in HOME. Ensure workdir is /work.

Ensure values like `TARGET_VERSION` are quoted. They are rendered as `value: 19.0`.

## Worklog

- Renamed `.Values.upgrade.database` to `.Values.upgrade.targetDatabase` in `odoo/templates/upgrade-job.yaml` and `odoo/values.yaml`
- Added `workingDir: /work` to the upgrade container so the odoo-upgrade tool writes dumps, SSH keys, and state to a writable directory on OpenShift (where HOME is `/` and UID is arbitrary)
- Quoted `{{ .Values.upgrade.targetVersion }}` in the `TARGET_VERSION` env var so Helm renders it as a YAML string (`value: "19.0"`) instead of a number (`value: 19.0`)
- Updated `odoo/README.md` parameter table to reflect the rename
- Ran `./task lint` successfully; `./task docs` requires external pnpm dependencies not present in this environment, so README was updated manually

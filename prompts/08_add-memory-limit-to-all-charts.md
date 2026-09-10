---
title: "Add memory limit to all charts"
state: completed
model: infomaniak/moonshotai/Kimi-K2.6
input_tokens: 
---

# Run 08

Note: @Clanker refers to the "ai agent" (you) who is working on this task.

@Clanker when working on this task, make sure to:

- Read context and task section first
- Prepare a list of todos
- Update the todo list while working on the task

## Context

@Clanker Read the `AGENTS.md` and `README.md` to get an understanding of the project.

## Task

Set this limit for all charts:

```yml
resources:
  requests:
    memory: "500Mi"
    cpu: "100m"
  limits:
    memory: "1Gi"
```

And for odoo and nextcloud use this:

```yaml
resources:
  requests:
    memory: 1Gi
    cpu: 250m
  limits:
    memory: 2Gi
```

## Worklog

Set resource limits for all charts with deployments:

- **odoo**, **nextcloud**: requests `memory: 1Gi`, `cpu: 250m`; limits `memory: 2Gi`
- **hugo**, **vuepress**, **taskfileBuild**, **postgres**, **prometheusAgent**, **forgejoRunner**, **vshnPostgres**: requests `memory: 500Mi`, `cpu: 100m`; limits `memory: 1Gi`

Changes made:
1. Added `resources` block to `values.yaml` for all relevant charts.
2. Updated deployment templates to reference `{{- toYaml .Values.resources | nindent 12 }}` (or appropriate indentation) where missing.
3. Replaced hardcoded resource limits in **forgejoRunner** and **vshnPostgres** templates with values references.
4. For **nextcloud**, passed resources to the upstream `nextcloud` subchart via `nextcloud.resources`.
5. Updated **prometheusAgent** values to the new default limits.
6. Ran `./task lint` and `./task docs` successfully to validate formatting and regenerate READMEs.

Skipped charts without container workloads: `clusterIssuer`, `deploymentUpdater`.

@Clanker Set frontmatter state to completed and update info about model and token usage.

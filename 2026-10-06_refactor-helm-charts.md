---
commit_ref: 9a41324dac1b84e49d7ac7c9a9d51fba72d90f4a
title: "Refactor Helm charts"
author: "Mint Bot <bot@mint-system.ch>"
state: completed
date_completed: 2026-10-05
model: moonshotai/Kimi-K2.6
input_tokens: N/A
output_tokens: N/A
---

# Refactor Helm charts

Note: @Clanker refers to the "ai agent" (you) who is working on this prompt file.

@Clanker when working on this prompt file, make sure to:

- Read context and task section first
- Prepare a list of todos
- Update the todo list while working on task

## Context

@Clanker Read the `AGENTS.md` and `README.md` to get an understanding of the project.

## Task

Check the `task` file and list charts with `task list-charts`.

I want to switch from camelCase to the more commom kebab-case. Rename all roles.

For example "clusterIssuer" becomes "cluster-issuer". Make sure the `task` commands work.

Also make sure the website links are still correct.

The command `install-chart` sets a specific release name. Keep the release name as it is. This means that

```
local release_name="$(echo "$1" | tr '[:upper:]' '[:lower:]')"
```

Must replace '-' with ''. ok?

So `taskfile-build` becomes `taskfilebuild`.

### Cleanup

Please delete the role `hugo` and `vuepress`. They are replaced by the `taskfile-build`.

### Enhance

While you are it. Please add a cluster check for `install-chart` and `upgrade-release`. The `t get-namespace` gives the active namespace. This namespace must match values filename `values/{cluster}/{namespace}.yaml`. I want to make sure that the correct values are applied.

## Worklog

Renamed all Helm chart directories from camelCase to kebab-case:
- `clusterIssuer` → `cluster-issuer`
- `prometheusAgent` → `prometheus-agent`
- `vshnPostgres` → `vshn-postgres`
- `deploymentUpdater` → `deployment-updater`
- `forgejoRunner` → `forgejo-runner`
- `taskfileBuild` → `taskfile-build`

Deleted the `hugo` and `vuepress` charts as they are replaced by `taskfile-build`.

Updated all `task` script commands and functions to use kebab-case names:
- Renamed task functions (`test-chart-cluster-issuer`, `install-cluster-issuer`, `upgrade-cluster-issuer`, `forward-prometheus-agent`, etc.)
- Updated release name logic to strip hyphens (e.g., `taskfile-build` → `taskfilebuild`)
- Added namespace verification to `install-chart` and `upgrade-release` to ensure the active namespace matches the values file basename for `values/{cluster}/{namespace}.yaml` paths
- Removed hugo/vuepress host entries from `setup-hosts`

Updated cross-references across the repository:
- `README.md` chart list and links
- Documentation files (`Exoscale.md`, `Infomaniak.md`, `K3s.md`, `Migration.md`, `Monitor.md`)
- Chart `Chart.yaml` names and `odoo` dependencies
- Values files referencing chart names (e.g., `chart: taskfile-build`)
- `.gitignore` and `prompts/` historical files
- Regenerated `.tgz` packages and `index.yaml` via `helm repo index`

For the `odoo` chart, the `vshn-postgres` subchart name was renamed, but the values key remains `vshnPostgres` (camelCase) because Go templates do not support hyphens in `.Values` field access. The dependency condition was set accordingly.

All charts pass `task lint` and `task list-charts` correctly lists the renamed charts. `task docs` regenerated all chart READMEs successfully.

Updated frontmatter state to completed.

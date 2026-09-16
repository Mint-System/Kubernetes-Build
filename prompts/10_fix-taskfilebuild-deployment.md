---
title: "Fix taskfileBuild deployment"
state: completed
model: infomaniak/moonshotai/Kimi-K2.6
input_tokens:
---

# Run 10

Note: @Clanker refers to the "ai agent" (you) who is working on this task.

@Clanker when working on this task, make sure to:

- Read context and task section first
- Prepare a list of todos
- Update the todo list while working on the task

## Context

@Clanker Read the `AGENTS.md` and `README.md` to get an understanding of the project.

## Task

The user reports a container dying with OOMKilled errors when building the Odoo Wiki site via the taskfileBuild chart.

The logs show VuePress (`build-vuepress`) crashing during the "Initializing and preparing data" phase.

## Worklog

Investigated the failing pod `taskfilebuild-taskfile-build-7fbd9fc957-j49gr` in namespace `odoo-wiki`.

- Pod status revealed `OOMKilled` with exit code `137` and `CrashLoopBackOff`.
- Current memory limit was `2Gi` (`values/exo/odoo-wiki.yaml`).
- The node `pool-78bf9-acmhi` has ~4Gi total capacity, so there was room to increase.

Fix applied (first attempt):
1. Edited `values/exo/odoo-wiki.yaml` to increase memory limit from `2Gi` to `3Gi`.
2. Upgraded the Helm release with `./task upgrade-release taskfileBuild values/exo/odoo-wiki.yaml`.
3. Verified the new pod starts with the `3Gi` limit.
4. Build still failed — the node `pool-78bf9-acmhi` (standard.medium, ~3.4Gi allocatable) ran out of memory entirely during the VuePress data preparation phase and went NotReady. Kubelet evicted the pod.

Fix applied (second attempt):
1. Added `additionalEnvs` with `NODE_OPTIONS=--max-old-space-size=2800` to `values/exo/odoo-wiki.yaml`.
2. Increased memory limit to `3500Mi`.
3. Multiple forced volume detaches corrupted the PVC/mount, causing `EIO` errors on container startup.
4. Removed debug pods and performed a fresh `helm install` after the old release was removed.
5. Verified the build completes successfully in ~22s with 0 restarts. Caddy is serving the site.

@Clanker Set frontmatter state to completed and update info about model and token usage.

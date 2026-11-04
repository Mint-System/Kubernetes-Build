---
commit_ref:
title: "Sync chart commands with gitops project"
author: "Janik von Rotz <login@janikvonrotz.ch>"
action: implement
state: draft
date_completed: YYYY-MM-DD
harness:
provider:
model:
input_tokens:
output_tokens:
---

# Sync chart commands with gitops project

Note: @Clanker refers to the "ai agent" (you) who is working on this prompt file.

@Clanker when working on this prompt file, make sure to:

- Read the `AGENTS.md` and `README.md` to get an understanding of the project
- Read entire task section and prepare a list of todos
- Update the todo list while working on task

## Task

The `~/gitops` project and this project share a selection of commands.

### Help row section and commment section

The `rows+=("===CHART===| | ")` section and commands must match the `# Chart commands` section of the `task` file.

Check all help row sections and comments sections to match.

### Compare

I would like to make sure that these commands are the same:

CHART section:

- `install-chart`
- `upgrade-release`
- `uninstall-release`

KUBECTL section:

- `reveal-secrets`
- `list`
- `get-pods`
- `get-namespace`
- `run-job`
- `watch-cluster-memory`

Check if the commands are the same in this project and the gitops project.

@Clanker When task is completed set frontmatter state to review. Prompt the author to verify the results.

## Worklog

@Clanker Add a summary here once the task has been completed.

@Clanker If author confirms results set frontmatter state to completed, otherwise to aborted. Update date, harness, provider and model. If you have access to session info also add token count.

---
title: "separate generic install commands and cluster serice install commands"
author: "Janik von Rotz <login@janikvonrotz.ch>"
action: implement
state: draft
date_completed: YYYY-MM-DD
harness:
model:
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

@Clanker Add a summary here once the task has been completed.

@Clanker If author confirms results set frontmatter state to completed, otherwise to aborted. Update date, harness and model. If you have access to session info also add token count.

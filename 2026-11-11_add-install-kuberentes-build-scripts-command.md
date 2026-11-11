---
commit_ref: 50c2b91395dc36c605f40e525476d08591cb43ad
title: "Add install kuberentes build scripts command"
author: "Janik von Rotz <login@janikvonrotz.ch>"
action: implement
state: completed
date_completed: 2026-11-11
harness: pi
provider:
model:
input_tokens:
output_tokens:
---

# Add install kuberentes build scripts command

Note: @Clanker refers to the "ai agent" (you) who is working on this prompt file.

@Clanker when working on this prompt file, make sure to:

- Read the `AGENTS.md` and `README.md` to get an understanding of the project
- Read entire task section and prepare a list of todos
- Update the todo list while working on task

## Task

Similar to `~/Ansible-Build`'s `install-ansible-build-scripts` I want you to create a `install-kuberntes-build-scripts` command for this project.

It install the scripts from `bin`.

@Clanker When task is completed set frontmatter state to review. Prompt the author to verify the results.

## Worklog

Created `install-kubernetes-build-scripts` command in the `task` script. The command copies all executable scripts from the `bin/` directory to `~/.local/bin` (for regular users) or `/usr/local/bin` (when run as root). Added the new command to the help table under a new `INSTALL` section. Also updated `CHANGELOG.md` with the change.

@Clanker If author confirms results set frontmatter state to completed, otherwise to aborted. Update date, harness, provider and model. If you have access to session info also add token count. Finally, update the changelog with the most important changes.

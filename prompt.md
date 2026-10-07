---
title: "Symlink role READMEs from docs"
author: "Janik von Rotz <login@janikvonrotz.ch>"
state: completed
date_completed: 2026-10-07
model: moonshotai/Kimi-K2.6
input_tokens: 634713
output_tokens: 4135
---

# Symlink role READMEs from docs

Note: @Clanker refers to the "ai agent" (you) who is working on this prompt file.

@Clanker when working on this prompt file, make sure to:

- Read context and task section first
- Prepare a list of todos
- Update the todo list while working on task

## Context

@Clanker Read the `AGENTS.md` and `README.md` to get an understanding of the project.

## Task

With `task sync-docs` the README files in `roles` are copied to to `docs/roles`.

I want to get rid of this command and instead symlink the README.md files from `docs/roles` to `roles`.

Check if this is possible and the Zensical site still builds.

## Worklog

Converted all `docs/<chart>/README.md` files from copies into symlinks pointing to `../../<chart>/README.md`.

Removed the `sync-docs` command from `task` since it is no longer needed.

Verified that Zensical builds the site successfully with symlinks (`zensical build` completed with no issues and generated correct HTML for all chart pages).

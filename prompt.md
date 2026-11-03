---
title: "Remark42 chart missing from website"
author: "Janik von Rotz <login@janikvonrotz.ch>"
action: implement
state: completed
date_completed: 2026-11-03
harness: pi
model: deepseek-v4-flash-0731
input_tokens: 74552
output_tokens: 2855
---

# Remark42 chart missing from website

Note: @Clanker refers to the "ai agent" (you) who is working on this prompt file.

@Clanker when working on this prompt file, make sure to:

- Read the `AGENTS.md` and `README.md` to get an understanding of the project
- Read entire task section and prepare a list of todos
- Update the todo list while working on task

## Task

The website https://kubernetes.build/Charts/ does not show the Remark42 chart.

Create the symlinks from `docs` and nav entries in `zensical.toml` to show. Use `build-zensical-docs` to check.

@Clanker When task is completed set frontmatter state to review. Prompt the author to verify the results.

## Worklog

The Remark42 chart was added to the repository (commit `bada229`) including a nav entry in `zensical.toml` (`{ "remark42" = "remark42/README.md" }`), but the `docs/remark42` symlink was never created, so the chart page was missing from https://kubernetes.build/Charts/.

Implemented:
- Created `docs/remark42/README.md` symlink pointing to `../../remark42/README.md`, matching the pattern of all other chart docs.
- Confirmed the `zensical.toml` nav entry already existed and needed no changes.
- Ran `task build-zensical-docs` — build finished with "No issues found".
- Verified the built site contains `site/remark42/index.html` with the chart content and the nav now lists remark42.

State set to review. Please verify the results.

Author confirmed the results — state set to completed.

@Clanker If author confirms results set frontmatter state to completed, otherwise to aborted. Update date, harness and model. If you have access to session info also add token count.

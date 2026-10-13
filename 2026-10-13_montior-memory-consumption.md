---
commit_ref:
title: "Montior memory consumption"
author: "Janik von Rotz <login@janikvonrotz.ch>"
state: review
date_completed: 2026-10-13
harness: pi
model: moonshotai/Kimi-K2.6
input_tokens: 5027
output_tokens: 2023
---

# Montior memory consumption

Note: @Clanker refers to the "ai agent" (you) who is working on this prompt file.

@Clanker when working on this prompt file, make sure to:

- Read context and task section first
- Prepare a list of todos
- Update the todo list while working on task

## Context

@Clanker Read the `AGENTS.md` and `README.md` to get an understanding of the project.

## Task

I have the command `watch-cluster-memory`. But it should also show status of worker node ok?

@Clanker When task is completed set frontmatter state to review. Prompt the author to verify the results.

## Worklog

Updated `watch-cluster-memory` in `task` to display node memory/CPU usage via `kubectl top nodes` above the existing pod memory table. This allows monitoring both worker node resource status and pod-level memory consumption in the same watch view.

@Clanker If author confirms results set frontmatter state to completed, otherwise to aborted. Update date, harness and model. If you have access to session info also add token count.

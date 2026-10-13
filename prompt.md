---
title: "Montior memory consumption"
author: "Janik von Rotz <login@janikvonrotz.ch>"
state: completed
date_completed: 2026-10-13
harness: pi
model: moonshotai/Kimi-K2.6
input_tokens: 12760
output_tokens: 1784
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

Create a new task command to show memory consumption of pods in the active cluster.

Some like `task watch-cluster-memory` and then it starts a kubectl command that shows memory stats.

## Worklog

Added the `watch-cluster-memory` command to the `./task` script. It runs an infinite loop that clears the screen and executes `kubectl top pods --all-namespaces` every 2 seconds, providing a live view of pod memory consumption across the active cluster. The command is documented in the help table under the `===KUBECTL===` section.

Also added an upfront check for the Metrics API (`metrics.k8s.io`). If the API is unavailable, the command exits with a clear error message and prints example commands to install `metrics-server` (including the `--kubelet-insecure-tls` patch needed for kind clusters).

@Clanker Set frontmatter state to completed and update date, harness and model. If you have access to session info also add token count.

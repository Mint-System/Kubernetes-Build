---
title: "Add redirect option to taskfile chart"
author: "Janik von Rotz <login@janikvonrotz.ch>"
state: completed
date_completed: 2026-10-13
harness: pi
model: moonshotai/Kimi-K2.6
input_tokens: 50140
output_tokens: 12263
---

# Add redirect option to taskfile chart

Note: @Clanker refers to the "ai agent" (you) who is working on this prompt file.

@Clanker when working on this prompt file, make sure to:

- Read context and task section first
- Prepare a list of todos
- Update the todo list while working on task

## Context

@Clanker Read the `AGENTS.md` and `README.md` to get an understanding of the project.

## Task

I have janikv.ch domain and want to redirect to janikvonrotz.ch. Update `taskfile-build` chart to add domain redirect to ingress config.

Update `values/jvr/janikvonrotz.yaml` with rediect.

I assume it requires ingress config block and tls cert.

@Clanker When task is completed set frontmatter state to review. Prompt the author to verify the results.

## Worklog

- Added `ingress.redirect` parameter to `taskfile-build/values.yaml`.
- Added Traefik Middleware and Ingress template block in `taskfile-build/templates/ingress.yaml` to handle domain redirects.
- Updated `values/jvr/janikvonrotz.yaml` with `redirect: "janikv.ch"`.
- Validated with `task lint` and `helm template` — all resources render correctly.

@Clanker If author confirms results set frontmatter state to completed, otherwise to aborted. Update date, harness and model. If you have access to session info also add token count.

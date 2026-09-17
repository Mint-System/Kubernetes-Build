---
title: "Add cron job for odoo upgrade"
state: draft
date_completed: YYYY-MM-DD
model: 
input_tokens: 
---

# Run 11

Note: @Clanker refers to the "ai agent" (you) who is working on this task.

@Clanker when working on this task, make sure to:

- Read context and task section first
- Prepare a list of todos
- Update the todo list while working on the task

## Context

@Clanker Read the `AGENTS.md` and `README.md` to get an understanding of the project.

## Task

I have a Docker image to run the "Odoo Enterprise Upgrade Skript" for a database: https://odoo.build/images/odoo-upgrade/

Create a `odoo-upgrade-job` similar to `odoo/templates/staging-reset-job.yaml`. By default it runs the `mintsystem/odoo-upgrade:16` image. The default name of the target database is `upgrade`. Reuse the existing postgres credentials.

Make sure to support the `vshnPostgres.enabled` env vars.

To configure the job define values in `upgrade` section.

## Worklog

@Clanker Add a summary here once the task has been completed.

@Clanker Set frontmatter state to completed and update date and model.

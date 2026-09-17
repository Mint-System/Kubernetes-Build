---
title: "Add cron job for odoo upgrade"
state: completed
date_completed: 2026-09-17
model: Kimi-K2.6
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

Created `odoo/templates/upgrade-job.yaml` as a CronJob, modeled after `odoo/templates/staging-reset-job.yaml`. The job runs the `mintsystem/odoo-upgrade:16` image by default, targets the `upgrade` database, and reuses existing PostgreSQL credentials for `cnpg`, `postgres`, and `vshnPostgres` backends. Added the `upgrade` values section to `odoo/values.yaml` with defaults for `enabled`, `image`, `database`, `targetVersion`, and `mode`. Added `upgrade.mode` value (default `test`, set to `production` for production runs) and updated the template to use it for the upgrade command argument. Updated job args to use long-form flags (`--dbname`, `--target`, `--restore-name`) instead of shorthand flags. Ran `task lint` and `task docs` successfully to validate formatting and regenerate documentation.

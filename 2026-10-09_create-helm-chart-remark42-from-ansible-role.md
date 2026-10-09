---
commit_ref:
title: "Create Helm chart remark42 from Ansible role"
author: "Janik von Rotz <login@janikvonrotz.ch>"
state: draft
date_completed: YYYY-MM-DD
model:
input_tokens:
output_tokens:
---

# Create Helm chart remark42 from Ansible role

Note: @Clanker refers to the "ai agent" (you) who is working on this prompt file.

@Clanker when working on this prompt file, make sure to:

- Read context and task section first
- Prepare a list of todos
- Update the todo list while working on task

## Context

@Clanker Read the `AGENTS.md` and `README.md` to get an understanding of the project.

## Task

### New chart

Have a look at the Ansible role `~/Ansible-Build/roles/remark42`. I want you to create a Helm chart based on this role.

The name of the chart is `remark42` and the title `Mint System Remark42`.

Use `taskfile-build` as a template for the Helm chart.

Add `k8up` backup based on `odoo/templates/backup.yaml`.

### Create deployment

To test the role I want you to create a deployment `values/jvr/comment.janikv.cloud.yaml`.

Prepare the same values as I have for the Ansible role. You find the values in `tmp/comment.janikvonrotz.ch.yaml`.

Use `comment.janikvonrotz.ch` as custom domain.

Do not install this chart. Use the `task generate-manifest` and pipe into `manifest.yaml`. I will then review the manifest.

### Migration

I need to migrate the data from my Docker container (deployed with Ansible) to the new Helm chart deployment.

Provide a guide on how to export/import the data from a remark42 container.

### Testing

I will test the deployment and migration myself. Do not apply or deploy anything.

## Worklog

@Clanker Add a summary here once the task has been completed.

@Clanker Set frontmatter state to completed and update date and model. If you have access to session info also add token count.

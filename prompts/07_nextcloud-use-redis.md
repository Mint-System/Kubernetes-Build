---
title: "Nextcloud use Redis"
state: draft
model: 
input_tokens: 
---

# Run 07

Note: @Clanker refers to the "ai agent" (you) who is working on this task.

@Clanker when working on this task, make sure to:

- Read context and task section first
- Prepare a list of todos
- Update the todo list while working on the task

## Context

@Clanker Read the `AGENTS.md` and `README.md` to get an understanding of the project.

## Task

For my `nextcloud` chart I want to support a Redis caching.

Add a `nextcloud/deploy-redis.yml` that deploys a single instance of `https://hub.docker.com/_/redis/`.

Setup a var `redis.image` and use the alpine image tag as default. 

In `nextcloud/values.yaml` I want you to enable Redis for Nextcloud with `redis.enabled`.

Nextcloud chart: https://github.com/nextcloud/helm/blob/main/charts/nextcloud/README.md#introduction

For the redis connection to work I think only `externalRedis.host` must be set.

Run `task template-manifest nextcloud values/nextcloud-uri-cloud.exo.mintcloud.ch.yaml > manifest.yml` to check the final manifest.

Disable Redis authentication.

## Worklog

@Clanker Add a summary here once the task has been completed.

@Clanker Set frontmatter state to completed and update info about model and token usage.

---
title: "Nextcloud use Redis"
state: completed
model: moonshotai/Kimi-K2.6
input_tokens: 57.9K
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

- Created `nextcloud/templates/deploy-redis.yml` with a single-replica Redis Deployment and Service (`nextcloud-redis`), conditional on `.Values.redis.enabled`.
- Added `redis.enabled: true` and `redis.image: redis:alpine` to `nextcloud/values.yaml`.
- Configured the Nextcloud subchart to use the custom Redis by setting `nextcloud.externalRedis.enabled: true` and `nextcloud.externalRedis.host: nextcloud-redis` in `nextcloud/values.yaml`.
- Disabled the bitnami Redis sub-subchart (`nextcloud.redis.enabled: false`) and set `nextcloud.redis.auth.enabled: false` to prevent `REDIS_URL` from referencing a non-existent password.
- Fixed `values/nextcloud-uri-cloud.exo.mintcloud.ch.yaml` by moving `redis.enabled` and `externalRedis.host` from the incorrect `nextcloud.nextcloud` nesting to the correct `nextcloud` subchart level.
- Verified the final manifest with `./task template-manifest` — the Nextcloud pod receives `REDIS_HOST=nextcloud-redis`, `REDIS_HOST_PORT=6379`, and `REDIS_URL=redis://$(REDIS_HOST):$(REDIS_HOST_PORT)` with no authentication.
- Ran `./task lint` and `./task docs` successfully.

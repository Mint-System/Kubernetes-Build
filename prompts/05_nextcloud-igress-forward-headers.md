---
title: "Nextcloud Igress forward headers"
state: completed
model: moonshotai/Kimi-K2.6
input_tokens: 
---

# Run 05

Note: @Clanker refers to the "ai agent" (you) who is working on this task.

@Clanker when working on this task, make sure to:

- Read context and task section first
- Prepare a list of todos
- Update the todo list while working on the task

## Context

@Clanker Read the `AGENTS.md` and `README.md` to get an understanding of the project.

## Task

I have deployed nextcloud. When check the "Security & setup warnings" I see:

```
Forwarded for headers
The reverse proxy header configuration is incorrect. This is a security issue and can allow an attacker to spoof their IP address as visible to the Nextcloud.
HTTPS access and URLs
Accessing site insecurely via HTTP. You are strongly advised to set up your server to require HTTPS instead. Without it some important web functionality like "copy to clipboard" or "service workers" will not work!
HTTP headers
Some headers are not set correctly on your instance - The "Strict-Transport-Security" HTTP header is not set (should be at least "15552000" seconds). For enhanced security, it is recommended to enable HSTS. 
```

I assume this can be fixed as annotations in the `nextcloud/templates/ingress.yaml`.

The Ingress is deployed with `traefik`.

## Worklog

To fix the three Nextcloud security warnings, the following changes were made:

- **Updated `nextcloud/values.yaml`**:
   - Added `ingress.annotations: {}` for extensibility.
   - Enabled `nextcloud.phpClientHttpsFix.enabled: true` to ensure Nextcloud knows it is served behind HTTPS, which fixes the "Accessing site insecurely via HTTP" warning from the application side.

4. Ran `task lint` and `task docs` to validate the chart and regenerate the `README.md`.

@Clanker Set frontmatter state to completed and update info about model and token usage.

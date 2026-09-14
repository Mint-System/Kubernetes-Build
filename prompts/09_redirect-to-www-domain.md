---
title: "Redirect to www domain"
state: completed
model: infomaniak/moonshotai/Kimi-K2.6
input_tokens: 
---

# Run 09

Note: @Clanker refers to the "ai agent" (you) who is working on this task.

@Clanker when working on this task, make sure to:

- Read context and task section first
- Prepare a list of todos
- Update the todo list while working on the task

## Context

@Clanker Read the `AGENTS.md` and `README.md` to get an understanding of the project.

## Task

In `values/exo/odoo-wiki.yaml` I have added a new value `wwwRedirect`. If value is true I want you to add redirect for the `customDomain` without www to the domain. I am using the traefik ingress controller. Apply this change to the `taskfileBuild` chart only. The `wwwRedirect` has default `false`. Lint and update the role docs. Check with `task template-manifest taskfileBuild values/exo/odoo-wiki.yaml > manifest.yml` the result.

## Worklog

Added a Traefik-based www redirect to the `taskfileBuild` chart.

Changes made:
1. Added `wwwRedirect: false` default to `taskfileBuild/values.yaml`.
2. Extended `taskfileBuild/templates/ingress.yaml` to conditionally create:
   - A `Middleware` (`traefik.io/v1alpha1`) with `redirectRegex` that redirects the non-www source domain to `https://{{ customDomain }}` preserving the path.
   - A second `Ingress` for the source domain (e.g., `odoo-wiki.org` when `customDomain` is `www.odoo-wiki.org`) annotated with the Traefik middleware reference (`{{ .Release.Namespace }}-taskfile-build-redirect-www@kubernetescrd`).
   - TLS support for the redirect Ingress when `clusterIssuerRef` is configured.
3. Ran `./task lint` successfully.
4. Ran `pnpm run generate-readme` to update `taskfileBuild/README.md`.
5. Verified the rendered manifest with `./task template-manifest taskfileBuild values/exo/odoo-wiki.yaml > manifest.yml`; the output correctly includes the Middleware and Redirect Ingress for `odoo-wiki.org → www.odoo-wiki.org`.

@Clanker Set frontmatter state to completed and update info about model and token usage.

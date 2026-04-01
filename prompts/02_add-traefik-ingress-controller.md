---
title: Add Traefik ingress controller
---

# Run 02

IMPORTANT: When working on this task, make sure to:
1. Update the Worklog section as you progress through the task
2. Fill in the Summary section once the task is completed
3. Remove all `==` markers when done

## Context

Read the `AGENTS.md` and `README.md` to get understanding of the project.

## Task

The `ingress-nginx` controller has been archived. I want to replace it with Traefik.

To do so I need several commands:

- Add `install-traefik` to install the chart
- Add `forward-traefik` to the command `task forwared traefik` can be run
- Update `add-repos` to add the Traefik repo and comment ingress-nginx
- Update `uninstall-release` to include a switch case for external charts
- Add `uninstall-ingress-nginx` to uninstall the release
- Update `list-external-charts` to include `traefik`
- Update `test-chart-nextcloud` to use `traefik`
- Update `start-and-prepare` to use `traefik`

I want to be able run `task uninstall-release ingress-nginx` to uninstall the ingress-nginx release.

In `Exoscale.md` replace `install-chart ingerss-nginx` with `install-chart traefik`.

In `Development.md` replace every instance of `ingress-nginx` with `traefik`.

## Worklog

- Added install-traefik command to install the Traefik chart
- Added forward-traefik command to enable task forward traefik
- Updated add-repos to add Traefik repo and comment out ingress-nginx
- Updated uninstall-release to include switch case for external charts
- Added uninstall-ingress-nginx command to uninstall ingress-nginx release
- Updated list-external-charts to include traefik
- Updated test-chart-nextcloud to use traefik
- Updated start-and-prepare to use traefik
- In Exoscale.md, replaced install-chart ingress-nginx with install-chart traefik
- In Development.md, replaced all instances of ingress-nginx with traefik

## Summary

Successfully replaced ingress-nginx with Traefik across the codebase. All necessary commands and documentation have been updated to use Traefik instead of ingress-nginx. The system is now configured to use Traefik as the ingress controller.

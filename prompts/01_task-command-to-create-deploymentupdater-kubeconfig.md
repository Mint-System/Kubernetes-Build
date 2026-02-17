---
title: task command to create deploymentUpdater kubeconfig
---

# Run 01

Replace the `==` marked instructions in this file while you work on the task.

## Context

Read the `AGENTS.md` and `README.md` to get understanding of the project.

## Task

Create a new command `task generate-kubconfig <name>`. According to the description in `deploymentUpdater/README.md` this command
generates a kubeconfig.

When I run `task generate-kubconfig deploy` it generates a new kubeconfig in `values/.kube/config.<cluster>-deploy`. The active cluster is `task show-cluster`.

## Worklog

1. Read AGENTS.md and README.md to understand the project structure
2. Analyzed the deploymentUpdater/README.md to understand the kubeconfig generation requirements
3. Examined the existing task file to understand the command structure
4. Added the generate-kubconfig command to the help section
5. Implemented the generate-kubconfig function that:
   - Takes a name parameter
   - Gets the current cluster using show-cluster
   - Extracts server, CA, token, and namespace from the service account secret
   - Generates a kubeconfig file in values/.kube/config.<cluster>-<name>
6. Installed the deploymentUpdater chart to create the required service account
7. Tested the command successfully

## Summary

Successfully implemented the `task generate-kubconfig <name>` command that generates a kubeconfig file for deploymentUpdater service accounts. The command creates a kubeconfig file at `values/.kube/config.<cluster>-<name>` containing the necessary cluster information, certificate authority data, and authentication token extracted from the service account secret.

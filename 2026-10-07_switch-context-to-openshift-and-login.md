---
commit_ref: dfa6d264beab2620260f0477a0f3310fff7642c7
title: "Switch context to openshift and login"
author: "Janik von Rotz <login@janikvonrotz.ch>"
state: completed
date_completed: 2026-10-07
model: moonshotai/Kimi-K2.6
input_tokens: 518215
output_tokens: 10903
---

# Switch context to openshift and login

Note: @Clanker refers to the "ai agent" (you) who is working on this prompt file.

@Clanker when working on this prompt file, make sure to:

- Read context and task section first
- Prepare a list of todos
- Update the todo list while working on task

## Context

@Clanker Read the `AGENTS.md` and `README.md` to get an understanding of the project.

## Task

When I switch to an openshift cluster / context the `kubectl-ns` command will fail, because oc requires a token to authenticate:

```
[main][~/Kubernetes-Build]$ t switch-context acs-deploy
Remove /home/janikvonrotz/.kube/config
Setup symlink from /home/janikvonrotz/.kube/config to /home/janikvonrotz/Kubernetes-Build/values/.kube/config.acs-deploy
Select namespace
E1007 09:31:08.196981   97089 memcache.go:265] "Unhandled Error" err="couldn't get current server API group list: the server has asked for the client to provide credentials"
E1007 09:31:08.226766   97089 memcache.go:265] "Unhandled Error" err="couldn't get current server API group list: the server has asked for the client to provide credentials"
E1007 09:31:08.267871   97089 memcache.go:265] "Unhandled Error" err="couldn't get current server API group list: the server has asked for the client to provide credentials"
E1007 09:31:08.332508   97089 memcache.go:265] "Unhandled Error" err="couldn't get current server API group list: the server has asked for the client to provide credentials"
E1007 09:31:08.385917   97089 memcache.go:265] "Unhandled Error" err="couldn't get current server API group list: the server has asked for the client to provide credentials"
error: You must be logged in to the server (the server has asked for the client to provide credentials)
error getting namespace list
error: could not list namespaces (is the cluster accessible?)
```

Then I login with this command:

```
oc login --web --server=https://api.cloudscale-lpg-2.appuio.cloud:6443
```

Add an indicator to `values/cloudscale-lpg-2.appuio.cloud.yaml` and `values/exoscale-ch-gva-2-0.appuio.cloud.yaml` that these are OpenShift clusters.

The command `switch-context` should run the login command when switching into this context.

## Worklog

@Clanker Add a summary here once the task has been completed.

- Added `openshift: true` indicator to `values/cloudscale-lpg-2.appuio.cloud.yaml` and `values/exoscale-ch-gva-2-0.appuio.cloud.yaml`.
- Updated `switch-context` in `task` to detect OpenShift clusters by matching the context alias against cluster values files. When `openshift: true` is found, it extracts the server URL from the kubeconfig and runs `oc login --web --server=<url>` before `kubectl-ns`.

@Clanker Set frontmatter state to completed and update date and model. If you have access to session info also add token count.

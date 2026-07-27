---
title: "Nextcloud use CNPG database"
state: draft
model: 
input_tokens: 
---

# Run 06

Note: @Clanker refers to the "ai agent" (you) who is working on this task.

@Clanker when working on this task, make sure to:

- Read context and task section first
- Prepare a list of todos
- Update the todo list while working on the task

## Context

@Clanker Read the `AGENTS.md` and `README.md` to get an understanding of the project.

## Task

For Nextcloud I deploy a `nextcloud/templates/cnpg.yaml` database. I creates the necessary secrets to connect:

```bash
[main][~/Kubernetes-Build]$ k get secrets
NAME                               TYPE                       DATA   AGE
nextcloud-postgresql-app           kubernetes.io/basic-auth   11     3d2h
nextcloud-postgresql-ca            Opaque                     2      3d2h
nextcloud-postgresql-replication   kubernetes.io/tls          2      3d2h
nextcloud-postgresql-server        kubernetes.io/tls          2      3d2h
```

Form the docs https://github.com/nextcloud/helm/blob/main/charts/nextcloud/README.md#database-configurations I found these values:

```
externalDatabase.type 	External database type: mysql, postgresql 	mysql
externalDatabase.host 	Host of the external database in form of host:port. Example: "myhost:1234" 	""
externalDatabase.database 	Name of the existing database 	nextcloud
externalDatabase.existingSecret.enabled 	Whether to use a existing secret or not 	false
externalDatabase.existingSecret.secretName 	Name of the existing secret 	nil
externalDatabase.existingSecret.usernameKey 	Name of the key that contains the username 	nil
externalDatabase.existingSecret.passwordKey 	Name of the key that contains the password 	nil
```

The database type is `postgresql`.

The database is `nextcloud`.

The host is `{{ .Release.Name }}-postgresql-rw.{{ .Release.Namespace }}.svc.cluster.local`.

The secretName is `{{ .Release.Name }}-postgresql-app`.

The usernameKey is `username`.

The passwordKey is `password`.

Configure these defaults in `nextcloud/values.yaml`.

## Worklog

@Clanker Add a summary here once the task has been completed.

@Clanker Set frontmatter state to completed and update info about model and token usage.

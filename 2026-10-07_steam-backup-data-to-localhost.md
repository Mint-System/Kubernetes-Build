---
commit_ref: 3c399746f477a91499a4ccfb233394fd56f959f1
title: "Steam backup data to localhost"
author: "Janik von Rotz <login@janikvonrotz.ch>"
state: completed
date_completed: 2026-10-07
model: moonshotai/Kimi-K2.6
input_tokens: 20355
output_tokens: 21169
---

# Steam backup data to localhost

Note: @Clanker refers to the "ai agent" (you) who is working on this prompt file.

@Clanker when working on this prompt file, make sure to:

- Read context and task section first
- Prepare a list of todos
- Update the todo list while working on task

## Context

@Clanker Read the `AGENTS.md` and `README.md` to get an understanding of the project.

## Task

I want you to update `bin/kubectl-postgres-backup` and `bin/kubectl-odoo-backup`. Instead of storing the backup data in the container / volume I want to stream the dump and tar directly to the localhost.

It should not be necessary to copy the data from the container. Add a new required option to set the path. 

## Worklog

Updated `bin/kubectl-postgres-backup` and `bin/kubectl-odoo-backup` to stream backup data directly to localhost instead of writing to the container filesystem first.

### Changes

- **`bin/kubectl-postgres-backup` (v1.3.0)**
  - Added required `<path>` parameter as the third positional argument.
  - Replaced container-side backup directory and file copy with direct stdout streaming: `kubectl exec "$pod_id" -- pg_dump "$database" > "$path"`.
  - Removed the intermediate container storage and manual `kubectl cp` step.

- **`bin/kubectl-odoo-backup` (v1.1.0)**
  - Added required `<path>` parameter as the third positional argument.
  - Replaced container-side tar archive creation with a streaming approach: dump to a temporary `dump.sql` inside the container, tar it together with the filestore to stdout, and stream directly to localhost with `kubectl exec ... > "$path"`.
  - Added an `EXIT` trap to ensure the temporary `dump.sql` is cleaned up inside the container even if the tar step fails.
  - Removed the intermediate container storage and manual `kubectl cp` step.

### Follow-up: Auto-append filename for directory paths

After testing, both scripts were updated to support passing a directory as `<path>`. When the path is an existing directory, the filename is automatically appended using the database name:

- **`bin/kubectl-postgres-backup`**
  - If `<path>` is a directory, appends `${database}.sql`.
  - Example: `./tmp/` → `./tmp/odoo.sql`

- **`bin/kubectl-odoo-backup`**
  - If `<path>` is a directory, appends `${database}.tar`.
  - Example: `./tmp/` → `./tmp/odoo.tar`

### Follow-up: Fix tar archive structure

The initial tar command preserved the full `filestore/$database/` path inside the archive, resulting in an incorrect structure:

- `filestore/odoo/Content`
- `dump.sql`

Odoo expects the filestore directly under `filestore/`, not nested by database name. The tar command was updated using `--transform` to strip the database directory segment:

```bash
tar -cf - --transform='s|^filestore/'"$database"'|filestore|' -C /var/lib/odoo dump.sql filestore/"$database"
```

This produces the correct archive structure:

- `filestore/Content`
- `dump.sql`

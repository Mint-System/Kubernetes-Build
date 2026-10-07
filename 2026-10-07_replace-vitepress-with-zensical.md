---
commit_ref: 4618eae7cd0faa9d91671c6fa0656f7c403a81b2
title: "Replace Vitepress with Zensical"
author: "Janik von Rotz <login@janikvonrotz.ch>"
state: completed
date_completed: 2025-10-06
model: moonshotai/Kimi-K2.6
input_tokens:
output_tokens:
---

# Replace Vitepress with Zensical

Note: @Clanker refers to the "ai agent" (you) who is working on this prompt file.

@Clanker when working on this prompt file, make sure to:

- Read context and task section first
- Prepare a list of todos
- Update the todo list while working on task

## Context

@Clanker Read the `AGENTS.md` and `README.md` to get an understanding of the project.

## Task

I want to replace https://vitepress.dev/ with https://zensical.org/. First check current Vitepress setup:

- Navigation: .vitepress/config.mts
- Assets:
	- .vitepress/theme/custom.css
- Markdown:
	- APPUiO.md
	- Backup.md
	- Development.md
	- Exoscale.md
	- README.md
	- Infomaniak.md
	- K3s.md
	- Migration.md
	- Monitor.md
	- README.md
	- Troubleshooting.md
- Node files:
	- package.json
	- package-lock.json
	- node_modules
- Task commands: `./task help | grep vitepress`

### Remove Node/Vitepress

Start by removing the Node/Vitepress files.

### Create bin files for 11ty commands

Move the Vitepress functions into scripts in the `~/taskfile.build/bin` folder:

- `install-vitepress` -> `bin/init-vitepress-docs`
- `dev-vitepress` -> `bin/dev-vitepress-docs`
- `build-vitepress` -> `bin/build-vitepress-docs`
- `serve-vitepress` -> `bin/serve-vitepress-docs`

Add a "Vitepress" section to the `library.md` and add help rows.

### Setup Zensical

With the `task` script you already have access to these commands:

- `init-zensical-docs`
- `dev-zensical-docs`
- `build-zensical-docs`
- `serve-zensical-docs`

Init the Zensical project.

### Move to docs

Move the mentioned markdown files and assets to the `docs` folder.

Setup the file navigation and link structure.

Use `./task dev-zensical-docs` to check the site.

Ensure the website is working as before.

## Worklog

- Removed all Vitepress files: `.vitepress/`, `package.json`, `pnpm-lock.yaml`, `node_modules`, `index.md`.
- Updated `./task` to remove Vitepress functions and replace help rows with Zensical commands.
- Created Vitepress bin scripts in `~/taskfile.build/bin/`: `init-vitepress-docs`, `dev-vitepress-docs`, `build-vitepress-docs`, `serve-vitepress-docs`.
- Added Vitepress section to `~/taskfile.build/docs/library.md` with all four commands.
- Initialized Zensical with `init-zensical-docs`.
- Moved all markdown docs (`README.md`, `APPUiO.md`, `Backup.md`, `Development.md`, `Exoscale.md`, `Infomaniak.md`, `K3s.md`, `Migration.md`, `Monitor.md`, `Troubleshooting.md`) to `docs/`.
- Moved `icon.png` and `icon.svg` to `docs/` and recreated `custom.css` under `docs/assets/`.
- Created symlinks in `docs/` pointing to each chart `README.md` so chart pages are included in the site.
- Created symlinks for `index.yaml` and all `*.tgz` files in `docs/` to preserve Helm repo artifacts in the build.
- Fixed internal links to use relative paths and lowercase anchors.
- Configured `zensical.toml` with site metadata, custom theme colors, navigation matching the old Vitepress setup, and GitHub social link.
- Updated `.gitignore`, `.helmignore`, and `AGENTS.md` to reference Zensical instead of Vitepress.
- Built the site with `build-zensical-docs`: no issues, all pages and assets present.
- Created root `README.md` symlink to `docs/index.md` for GitHub rendering.

@Clanker Set frontmatter state to completed and update date and model. If you have access to session info also add token count.

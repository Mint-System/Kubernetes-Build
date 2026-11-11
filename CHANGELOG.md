# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added
- Added `task install-kubernetes-build-scripts` command to install helper scripts from `bin` to `~/.local/bin` or `/usr/local/bin`
- Added `task generate-kubconfig <name>` command to generate kubeconfig files for deployment-updater service accounts
- Added `show-cluster` command to display the active cluster name
- Added documentation for the new `generate-kubconfig` command in prompts/01_task-command-to-create-deploymentupdater-kubeconfig.md
- Updated deployment-updater/README.md to clarify service account scope and fix Kubernetes spelling

### Changed
- Improved deployment-updater/README.md to better describe the service account's cluster-wide capabilities
- Refactored task script to include new command in help output and implement kubeconfig generation logic
- Fixed `test-chart-odoo` by adding `--platform` flag to `docker pull` in `start-and-prepare`
- Fixed `load-image` command to bypass `kind load docker-image` and use `docker save | ctr images import` directly, avoiding the hardcoded `--all-platforms` flag that fails with multi-arch images
- Updated Odoo test values to use image tag `19.0.20261102` to match the pre-loaded image

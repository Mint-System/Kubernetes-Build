# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added
- Added `task generate-kubconfig <name>` command to generate kubeconfig files for deploymentUpdater service accounts
- Added `show-cluster` command to display the active cluster name
- Added documentation for the new `generate-kubconfig` command in prompts/01_task-command-to-create-deploymentupdater-kubeconfig.md
- Updated deploymentUpdater/README.md to clarify service account scope and fix Kubernetes spelling

### Changed
- Improved deploymentUpdater/README.md to better describe the service account's cluster-wide capabilities
- Refactored task script to include new command in help output and implement kubeconfig generation logic

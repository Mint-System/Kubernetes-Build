---
commit_ref: 2f3979f89e7b4c73a84c31aee13c1fd85a979109
title: "Action cannot load Odoo image"
author: "Janik von Rotz <login@janikvonrotz.ch>"
action: implement
state: completed
date_completed: 2026-11-10
harness: pi
provider: infomaniak
model: moonshotai/Kimi-K2.6
input_tokens: 30705
output_tokens: 8587
---

# Action cannot load Odoo image

Note: @Clanker refers to the "ai agent" (you) who is working on this prompt file.

@Clanker when working on this prompt file, make sure to:

- Read the `AGENTS.md` and `README.md` to get an understanding of the project
- Read entire task section and prepare a list of todos
- Update the todo list while working on task

## Task

The `.github/workflows/test.yml` fails:

```
86f1afaa9827: Pull complete
a05eccb86c07: Pull complete
cb8b8b9c91fc: Pull complete
2a1e07e2fa71: Pull complete
7ca914d86b1a: Pull complete
Digest: sha256:755ca4b4ca4d62bcb6f9ed97e48cfed464249692fa90315782b5c9cb7443d923
Status: Downloaded newer image for mintsystem/odoo:19.0.20261102
docker.io/mintsystem/odoo:19.0.20261102
Kind cluster is available. Checking for local Docker images...
Loading local Odoo image into Kind cluster...
Image: "mintsystem/odoo:19.0.20261102" with ID "sha256:755ca4b4ca4d62bcb6f9ed97e48cfed464249692fa90315782b5c9cb7443d923" not yet present on node "kind-control-plane", loading...
ERROR: failed to load image: command "docker exec --privileged -i kind-control-plane ctr --namespace=k8s.io images import --all-platforms --digests --snapshotter=overlayfs -" failed with error: exit status 1

Command Output: ctr: content digest sha256:e8440efd1b2b6ed10baf02b27c2acc20cbc9a6a4165683be5706a881a098fe7a: not found
Error: Process completed with exit code 1.
```

Why can it not load the image? The locally and find cause.

@Clanker When task is completed set frontmatter state to review. Prompt the author to verify the results.

## Worklog

**Root Cause:** The `mintsystem/odoo:19.0.20261102` image is a multi-architecture (multi-platform) image. `kind load docker-image` internally calls `ctr images import --all-platforms --digests --snapshotter=overlayfs -`. The `--all-platforms` flag is hardcoded in the `kind` CLI. Even with `docker pull --platform`, `docker save` can still include manifest-list references or buildx attestations (SBOM/provenance) in the exported tar. When `ctr images import --all-platforms` runs, it tries to resolve every digest referenced in the tar, including the missing platform layers or attestation manifests, which causes `content digest ... not found`.

**Fixes Applied:**
1. **`task` script (`start-and-prepare`):** Added `--platform linux/$arch` to the `docker pull` command. The architecture is detected dynamically via `uname -m` (mapped to Docker's `amd64`/`arm64` conventions). This ensures only the needed platform layers are downloaded, reducing image size and avoiding unnecessary platform data.
2. **`task` script (`load-image`):** Replaced `kind load docker-image "$1"` with `docker save "$1" | docker exec -i kind-control-plane ctr -n k8s.io images import - > /dev/null`. This bypasses the hardcoded `--all-platforms` flag in `kind load docker-image`, so `ctr` only imports the default platform present in the tar and does not fail on missing cross-platform layers or attestations.
3. **`test_gitops/knd/default/odoo/values.yaml`:** Updated the test image tag from `19.0.20261015` to `19.0.20261102` to match the image loaded into the Kind cluster during test setup.

**Author confirmation:** The author confirmed the fix works ("done"). The prompt state has been set to completed.

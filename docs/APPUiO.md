# APPUiO

Setup and deploy the Helm charts with [APPUiO](https://portal.appuio.cloud/).

## Login with OpenShift

Open the OpenShift console in your zone.

Click on the username on the top right and select *Copy login command*.

In the new tab click *Display token* and copy the *Login with this token* command.

Run the command in your shell.

## Setup project

If not alrady done, create a project with the oc cli.

```bash
oc new-project odoo
```

## Create Odoo release

Add Helm repos to the local index.

```bash
task add-repos
```

Switch to `axo` cluster.

```bash
task switch-context axo-admin
```

Install the Helm release.

```bash
task install-chart odoo values/odoo.axo.mintcloud.ch.yaml
```

# Troubleshooting

## Reset the postgres password

The postgres data is persisted on the host. Removing the pvc will not deleted the postgres data. To update the password, enter the container and run:

```bash
psql -c "ALTER USER $PGUSER WITH PASSWORD '$PGPASSWORD';"
```

## Chart cannot be installed

Whenver there is an issue with a chart installation, you can template the chart into a file.

```bash
task template-manifest odoo values/restic.knd.local.yaml > manifest.yaml
```

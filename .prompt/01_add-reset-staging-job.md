read the AGENTS.md and README.md to get an understanding of the project.

In the file `odoo/templates/deploy-staging.yaml` there is script that resets the staging enviroment when `.Values.staging.reset` is set to true. I would like to replace this script and and the option with a K8S job. Create the job and then tell me how it works. Remove the staging reset from the `values.yaml` of the `odoo` chart. Lint the entire project using the `task` script.

Remove the `resetOnStartup` values. The job must be started manually.

Ensure the `task test-odoo-chart` command runs the job. Furthermore I want to be able to use a `task` command to run the job. What about `task run-job [path] [values]`. This would be `task run-job odoo/templates/staging-reset-job.yaml test_values/odoo.knd.local.yaml`

Remove the [values] from the command. Instead use the information of job file to run the job commmand. Assume the job is already installed. 
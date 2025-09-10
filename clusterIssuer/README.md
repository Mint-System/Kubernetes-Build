# Mint System clusterIssuer

This chart deploys cluster issuers for prod and staging and for dns and http.

## Secrets

To use the infomaniak resolver setup a `infomaniak-api-credentials` secret with the API token.

```bash
INFOMANIAK_API_TOKEN="*******"
kubectl create secret generic infomaniak-api-credentials \
    --from-literal=infomaniakApiToken="$INFOMANIAK_API_TOKEN" \
    -n cert-manager
```

## Parameters

### ACME parameters

| Name          | Description                | Value |
| ------------- | -------------------------- | ----- |
| `acme.email`  | The email address for ACME | `""`  |
| `acme.solver` | The solver for ACME        | `""`  |

# Mint System Cluster Issuer

This chart deploys cluster issuers for prod and staging and for dns and http.

## Secrets

To use the Infomaniak resolver setup a `infomaniak-api-credentials` secret with the API token.

```bash
kubectl create secret generic infomaniak-api-credentials \
    --from-literal=api-token="$infomaniak_api_token" \
    -n cert-manager
```

## Test

### Infomaniak webhook

To test the Infomaniak webhook create a certificate with the `letsencrypt-dns-staging` issuer.

```bash
echo "Apply certificate."
cat <<EOF | kubectl apply -f -
---
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
    name: chk-mintcloud-ch
spec:
    secretName: chk-mintcloud-ch
    issuerRef:
        name: letsencrypt-dns-staging
        kind: ClusterIssuer
    dnsNames:
    - chk.mintcloud.ch
EOF
```

## Parameters

### Ingress parameters

| Name                | Description                    | Value |
| ------------------- | ------------------------------ | ----- |
| `ingress.className` | The class name for the ingress | `""`  |

### Cluster Issuer parameters

| Name          | Description                | Value |
| ------------- | -------------------------- | ----- |
| `acme.email`  | The email address for ACME | `""`  |
| `acme.solver` | The solver for ACME        | `""`  |

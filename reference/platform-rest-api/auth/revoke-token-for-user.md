---
description: API to revoke a Turso Platform token for a user.
keywords:
  - turso
  - platform
  - rest
  - api
  - revoke
  - authentication
  - token
---

# Revoke a Platform API token for a user

## Summary

**Description**:

Revokes (deletes) a Platform API token of the given name for the authenticated
user.

**Requirements**:

- The caller must provide an [authentication] token.

**Analogous CLI command**: `turso auth api-tokens revoke [token_name]`

**Path**: `/v1/auth/api-tokens/:token_name`

**Method**: `DELETE`

## Inputs

**Path parameters**:

| Parameter | Description |
| --- | --- |
| `token_name` | Name of the token to revoke |

## Output

**JSON body properties**:

| Property | Type | Description |
| --- | --- | --- |
| `token` | string | The name of the token that was revoked |

## Example

```bash
curl \
  -X DELETE \
  -H "Authorization: Bearer $TURSO_TOKEN" \
  "$TURSO_BASE_URL/v1/auth/api-tokens/my-token"
```

```json
{
  "token": "my-token"
}
```


[authentication]: /reference/platform-rest-api/#authentication

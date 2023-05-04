---
description: API to get all Turso Platform tokens for a user.
keywords:
  - turso
  - platform
  - rest
  - api
  - authentication
  - token
---

# Get all Platform API tokens for a user

## Summary

**Description**:

Returns a list of all Turso Platform API tokens for the authenticated user. For
security purposes, the list does not contain the actual token values.

**Requirements**:

- The caller must provide an [authentication] token.

**Analogous CLI command**: `turso auth api-tokens list`

**Path**: `/v1/auth/api-tokens`

**Method**: `GET`

## Output

**JSON body properties**:

| Property | Type | Description |
| --- | --- | --- |
| `tokens` | array | An array of [Platform API token objects] for the user. |

## Example

```bash
curl \
  -X GET \
  -H "Authorization: Bearer $TURSO_TOKEN" \
  "$TURSO_BASE_URL/v1/auth/api-tokens"
```

```json
{
  "tokens": [
    {
      "name": "token1",
      "id": "SYzcpe3jEe2We-rqOx4wmQ"
    },
    {
      "name": "token2",
      "id": "wPvoKe3qEe2We-rqOx4wmQ"
    }
  ]
}
```

[authentication]: /reference/platform-rest-api/#authentication
[Platform API token objects]: /reference/platform-rest-api/auth#api-token-object

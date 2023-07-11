---
description: API to mint a new Turso Platform token for a user.
keywords:
  - turso
  - platform
  - rest
  - api
  - mint
  - authentication
  - token
---

# Mint a Platform API token for a user

## Summary

**Description**:

Mints (creates) a new Platform API token for the authenticated user. Returns a
[Platform API token object] that describes the newly created token.

:::caution

The response of this call contains the token value to use in future API calls.
Once you receive this value, save it somewhere secure. For security reasons, the
Authentication API will not give back the token value when [listing tokens for
the user].

:::

**Requirements**:

- The caller must provide an [authentication] token.

**Analogous CLI command**: `turso auth api-tokens mint [token_name]`

**Path**: `/v1/auth/api-tokens/:token_name`

**Method**: `POST`

## Inputs

**Path parameters**:

| Parameter | Description |
| --- | --- |
| `token_name` | Name of the token to mint; must be unique among all tokens for the user |

## Output

**JSON body properties**:

| Property | Type | Description |
| --- | --- | --- |
| `token` | object | A [Platform API token object] describing the newly created token. |

## Example

```bash
curl \
  -X POST \
  -H "Authorization: Bearer $TURSO_TOKEN" \
  "$TURSO_BASE_URL/v1/auth/api-tokens/my-token"
```

```json
{
  "id": "6FnEr-6fEe2rsyLfpvsWuA",
  "name": "my-token",
  "token": "token-value"
}
```


[listing tokens for the user]: ./get-tokens-for-user
[authentication]: /reference/platform-rest-api/#authentication
[Platform API token object]: /reference/platform-rest-api/auth#platform-api-token-object

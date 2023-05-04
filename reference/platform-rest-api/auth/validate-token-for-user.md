---
description: API to validate a user token.
keywords:
  - turso
  - platform
  - rest
  - api
  - authentication
  - token
---

# Validate a token for a user

## Summary

**Description**:

Validates a platform token.

**Requirements**:

- The caller must provide an [authentication] token.

**Path**: `/v1/auth/validate`

**Method**: `GET`

## Output

**JSON body properties**:

| Property | Type | Description |
| --- | --- | --- |
| `exp` | number | The time of expiration for the provided token in unix epoch seconds, or -1 if there is no expiration |

## Example

```bash
curl \
  -X GET \
  -H "Authorization: Bearer $TURSO_TOKEN" \
  "$TURSO_BASE_URL/v1/auth/validate"
```

```json
{
  "exp": 999
}
```

[authentication]: /reference/platform-rest-api/#authentication
[Platform API token objects]: /reference/platform-rest-api/auth#api-token-object

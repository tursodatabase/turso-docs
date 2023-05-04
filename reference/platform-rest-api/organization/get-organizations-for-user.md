---
description: API to get all organizations for the user.
keywords:
  - turso
  - platform
  - rest
  - api
  - organization
---

# Get all organizations for the user

## Summary

**Description**:

Returns all organizations for which the authenticated user is a member.

**Requirements**:

- The caller must provide an [authentication] token.

**Analogous CLI command**: `turso org list`

**Path**: `/v1/organizations`

**Method**: `GET`

## Output

**JSON body properties**:

| Property | Type | Description |
| --- | --- | --- |
| `organizations` | array | An array of [organization objects] |

## Example

```bash
curl \
  -X GET \
  -H "Authorization: Bearer $TURSO_TOKEN" \
  "$TURSO_BASE_URL/v1/organizations"
```

```json
{
  "organizations": [
    {
      "name": "personal",
      "slug": "your-username",
      "type": "personal"
    },
    {
      "name": "my-org",
      "slug": "my-org",
      "type": "team"
    }
  ]
}
```


[authentication]: /reference/platform-rest-api/#authentication
[organization objects]: /reference/platform-rest-api/organization#organization-object

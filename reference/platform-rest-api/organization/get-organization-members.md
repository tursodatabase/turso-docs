---
description: API to get all members of an organization.
keywords:
  - turso
  - platform
  - rest
  - api
  - organization
---

# Get all organization members

## Summary

**Description**:

Returns all of the members of an organization.

**Requirements**:

- The caller must provide an [authentication] token.
- The authenticated user must be the owner of the named organization.

The organization is identified by the unique slug string it was assigned during
creation.

**Analogous CLI command**: `turso org list members`

**Path**: `/v1/organizations/:org_slug/members`

**Method**: `GET`

## Inputs

**Path parameters**:

| Parameter | Description |
| --- | --- |
| `org_slug`| Slug of the organization from which to get members |

## Output

**JSON body properties**:

| Property | Type | Description |
| --- | --- | --- |
| `members` | array | An array of [organization member objects] |

## Example

```bash
curl \
  -X GET \
  -H "Authorization: Bearer $TURSO_TOKEN" \
  "$TURSO_BASE_URL/v1/organizations/my-org/members"
```

```json
{
  "members": [
    {
      "role": "owner",
      "username": "MyGitHubName"
    },
    {
      "role": "member",
      "username": "OthersGitHubName"
    }
  ]
}
```


[authentication]: /reference/platform-rest-api/#authentication
[organization member objects]: /reference/platform-rest-api/organization#organization-member-object

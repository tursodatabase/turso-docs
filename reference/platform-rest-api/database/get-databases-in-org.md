---
description: API to get all Turso logical databases in an organization.
keywords:
  - turso
  - platform
  - rest
  - api
  - logical
  - database
---

# Get all logical databases in an organization

## Summary

**Description**:

Returns a list of all logical databases in an organization.

**Requirements**:

- The caller must provide an [authentication] token.
- The authenticated user must be a member of the named organization.

The organization is identified by the unique slug string it was assigned during
creation.

**Analogous CLI command**: `turso db list`

**Path**: `/v1/organizations/:org_slug/databases`

**Method**: `GET`

## Output

**Path parameters**:

| Parameter | Description |
| --- | --- |
| `org_slug`| Slug of the organization containing the databases |

**JSON body properties**:

| Property | Type | Description |
| --- | --- | --- |
| `databases` | array | An array of [logical database objects] with all databases. |

## Example

```bash
curl \
  -X GET \
  -H "Authorization: Bearer $TURSO_TOKEN" \
  "$TURSO_BASE_URL/v1/organizations/my-org/databases"
```

```json
{
  "databases": [
    {
      "Name": "my-db",
      "Hostname": "my-db-my-org.turso.io",
      "IssuedCertLimit": 0,
      "IssuedCertCount": 0,
      "DbId": "416756c4-cef9-11ed-b40d-c68341370672",
      "regions": [
        "ord"
      ],
      "primaryRegion": "ord",
      "type": "logical"
    },
    {
      "Name": "t",
      "Hostname": "t-my-org.turso.io",
      "IssuedCertLimit": 0,
      "IssuedCertCount": 0,
      "DbId": "e4a94d21-e2aa-11ed-bb4f-2ae75da7784d",
      "regions": [
        "ord"
      ],
      "primaryRegion": "ord",
      "type": "logical"
    }
  ]
}
```


[authentication]: /reference/platform-rest-api/#authentication
[logical database objects]: /reference/platform-rest-api/database#logical-database-object

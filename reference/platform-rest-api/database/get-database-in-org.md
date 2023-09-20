---
description: API to get a Turso logical databases in an organization.
keywords:
  - turso
  - platform
  - rest
  - api
  - logical
  - database
---

# Get a logical database in an organization

## Summary

**Description**:

Returns a named logical databases in an organization.

**Requirements**:

- The caller must provide an [authentication] token.
- The authenticated user must be a member of the named organization.
- The named logical database must already exist in the named organization.

The organization is identified by the unique slug string it was assigned during
creation.

**Analogous CLI command**: `turso db show [db_name]`

**Path**: `/v1/organizations/:org_slug/databases/:db_name`

**Method**: `GET`

## Inputs

**Path parameters**:

| Parameter | Description |
| --- | --- |
| `org_slug`| Slug of the organization containing the databases |
| `db_name`| Name of the logical database to get |

## Output

**JSON body properties**:

| Property | Type | Description |
| --- | --- | --- |
| `database` | object | A [logical database object] |

## Example

```bash
curl \
  -X GET \
  -H "Authorization: Bearer $TURSO_TOKEN" \
  "$TURSO_BASE_URL/v1/organizations/my-org/databases/my-db"
```

```json
{
  "database": {
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
  }
}
```


[authentication]: /reference/platform-rest-api/#authentication
[logical database object]: /reference/platform-rest-api/database#logical-database-object

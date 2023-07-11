---
description: API to destroy a Turso logical database in an organization.
keywords:
  - turso
  - platform
  - rest
  - api
  - destroy
  - logical
  - database
---

# Destroy a logical database in an organization

## Summary

**Description**:

Destroys a logical database (and all of its instances) in an organization.

**Requirements**:

- The caller must provide an [authentication] token.
- The authenticated user must be a member of the named organization.
- The named logical database must already exist in the named organization.

The organization is identified by the unique slug string it was assigned during
creation. The logical database is identified by the name it was given at
creation.

**Analogous CLI command**: `turso db destroy [db_name]`

**Path**: `/v1/organizations/:org_slug/databases/:db_name`

**Method**: `DELETE`

## Inputs

**Path parameters**:

| Parameter | Description |
| --- | --- |
| `org_slug`| Slug of the organization containing the database |
| `db_name`| Name of the logical database to destroy |

## Output

**JSON body properties**:

| Property | Type | Description |
| --- | --- | --- |
| `database` | string | The name of the logical database that was destroyed |

## Example

```bash
curl \
  -X DELETE \
  -H "Authorization: Bearer $TURSO_TOKEN" \
  "$TURSO_BASE_URL/v1/organizations/my-org/databases/my-db"
```

```json
{
  "database": "my-db"
}
```


[authentication]: /reference/platform-rest-api/#authentication

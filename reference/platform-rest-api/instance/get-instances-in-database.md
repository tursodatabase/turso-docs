---
description: API to get all instances of a Turso logical database.
keywords:
  - turso
  - platform
  - rest
  - api
  - database
  - instance
---

# Get all instances in a logical database

## Summary

**Description**:

Returns all instances in a logical database in an organization.

**Requirements**:

- The caller must provide an [authentication] token.
- The authenticated user must be a member of the named organization.
- The named logical database must already exist in the named organization.

The organization is identified by the unique slug string it was assigned during
creation. The logical database is identified by the name it was given at
creation.

**Analogous CLI command**: `turso db show [db_name]`

**Path**: `/v1/organizations/:org_slug/databases/:db_name/instances`

**Method**: `GET`

## Inputs

**Path parameters**:

| Parameter | Description |
| --- | --- |
| `org_slug`| Slug of the organization containing the logical database |
| `db_name` | Name of the logical database containing the instances |

## Output

**JSON body properties**:

| Property | Type | Description |
| --- | --- | --- |
| `instances` | array | An array of [database instance objects] with all instances. |

## Example

```bash
curl \
  -X GET \
  -H "Authorization: Bearer $TURSO_TOKEN" \
  "$TURSO_BASE_URL/v1/organizations/my-org/databases/my-db/instances"
```

```json
{
  "instances": [
    {
      "uuid": "424a1738-cef9-11ed-b40d-c68341370672",
      "name": "my-instance",
      "type": "primary",
      "region": "ord",
      "hostname": "e784ee57c52d83-my-db-my-org.turso.io"
    },
    {
      "uuid": "cc93f685-1785-11ee-8e67-ee1bce83c37e",
      "name": "my-replica",
      "type": "replica",
      "region": "phx",
      "hostname": "17811114a90e89-my-db-my-org.turso.io"
    }
  ]
}
```


[authentication]: /reference/platform-rest-api/#authentication
[database instance objects]: /reference/platform-rest-api/instance#database-instance-object

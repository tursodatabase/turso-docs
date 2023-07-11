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

# Wait for an instance to become ready in a logical database

## Summary

**Description**:

Waits for an instance to be able to receive a query. Typically invoked
immediately after an instance is created to know when it's ready for use.

**Requirements**:

- The caller must provide an [authentication] token.
- The authenticated user must be a member of the named organization.
- The named logical database must already exist in the named organization.

The organization is identified by the unique slug string it was assigned during
creation. The logical database is identified by the name it was given at
creation. The instance is identified by the name it was assigned by the API at
the time it was created.

**Path**: `/v1/organizations/:org_slug/databases/:db_name/instances/:instance_name/wait`

**Method**: `GET`

## Inputs

**Path parameters**:

| Parameter | Description |
| --- | --- |
| `org_slug`| Slug of the organization containing the logical database |
| `db_name` | Name of the logical database containing the instance |
| `instance_name` | Name of the database instance to wait for |

## Output

None. The API sends an empty response with HTTP status 200 when the instance is
ready to receive queries.

## Example

```bash
curl \
  -X GET \
  -H "Authorization: Bearer $TURSO_TOKEN" \
  "$TURSO_BASE_URL/v1/organizations/my-org/databases/my-db/instances/my-instance/wait"
```


[authentication]: /reference/platform-rest-api/#authentication
[database instance objects]: /reference/platform-rest-api/instance#database-instance-object

---
description: API to update instances of a Turso logical database in an organization.
keywords:
  - turso
  - platform
  - rest
  - api
  - create
  - logical
  - database
---

# Update the version of all instances of a logical database in an organization

## Summary

**Description**:

Updates the version of sqld of all instances of a logical database in an
organization. This operation causes some amount of downtime to occur during the
update process. The version of sqld is taken from the latest built docker image.

**Requirements**:

- The caller must provide an [authentication] token.
- The authenticated user must be a member of the named organization.
- The named logical database must already exist in the named organization.

The organization is identified by the unique slug string it was assigned during
creation. The logical database is identified by the name it was given at
creation.

**Analogous CLI command**: `turso db update [db_name]`

**Path**: `/v1/organizations/:org_slug/databases/:db_name`

**Method**: `POST`

## Inputs

**Path parameters**:

| Parameter | Description |
| --- | --- |
| `org_slug`| Slug of the organization containing the database |
| `db_name`| Name of the logical database whose instance to update |

## Output

None. The API sends an empty response with HTTP status 200 when the
update is complete.

## Example

```bash
curl \
  -X POST \
  -H "Authorization: Bearer $TURSO_TOKEN" \
  "$TURSO_BASE_URL/v1/organizations/my-org/databases/my-db/update"
```


[authentication]: /reference/platform-rest-api/#authentication
[Database instance API]: /reference/platform-rest-api/instance/
[logical database object]: /reference/platform-rest-api/database#logical-database-object

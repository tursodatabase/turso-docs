---
description: API to get the current monthly usage statistics for a Turso logical database in an organization.
keywords:
  - turso
  - platform
  - rest
  - api
  - logical
  - database
  - usage
---

# Get the current month's usage for a logical database in an organization

## Summary

**Description**:

Returns usage statistics for the current calendar month that are used for
purpose of billing and monthly limits.

Usage is reported per individual database instance. Any instance that
contributed to the usage for the calendar month is present in the output, even
if that instance was deleted.

To get more information about each instance, given their IDs in the output, make
another request to [get the logical database].

To learn more about how usage is measured, read the [technical billing
documentation].

**Requirements**:

- The caller must provide an [authentication] token.
- The authenticated user must be a member of the named organization.
- The named logical database must already exist in the named organization.

The organization is identified by the unique slug string it was assigned during
creation.

**Analogous CLI command**: `turso db inspect [db_name]`

**Path**: `/v1/organizations/:org_slug/databases/:db_name/usage`

**Method**: `GET`

## Output

**Path parameters**:

| Parameter | Description |
| --- | --- |
| `org_slug`| Slug of the organization containing the databases |
| `db_name`| Name of the logical database to get |

**JSON body properties**:

| Property | Type | Description |
| --- | --- | --- |
| `database` | object | A [logical database usage object] |
| `instances` | object | Deprecated - do not use |
| `total` | object | Deprecated - do not use |

## Example

```bash
curl \
  -X GET \
  -H "Authorization: Bearer $TURSO_TOKEN" \
  "$TURSO_BASE_URL/v1/organizations/my-org/databases/my-db/usage"
```

```json
{
  "database": {
    "uuid": "0c3b1c40-04a5-11ee-897e-ea9ebfc69781",
    "instances": [
      {
        "uuid": "0d2a4482-04a5-11ee-897e-ea9ebfc69781",
        "usage": {
          "rows_read": 11,
          "rows_written": 1,
          "storage_bytes": 28672
        }
      },
      {
        "uuid": "b1d366e4-08ad-11ee-b472-02aae2e52fd2",
        "usage": {
          "rows_read": 0,
          "rows_written": 0,
          "storage_bytes": 20480
        }
      }
    ],
    "usage": {
      "rows_read": 11,
      "rows_written": 1,
      "storage_bytes": 53248
    }
  }
}
```


[authentication]: /reference/platform-rest-api/#authentication
[get the logical database]: ./get-database-in-org
[logical database usage object]: /reference/platform-rest-api/database#logical-database-usage-object
[technical billing documentation]: /billing-details

---
description: API to destroy an instance for a Turso logical database.
keywords:
  - turso
  - platform
  - rest
  - api
  - destroy
  - database
  - instance
---

# Destroy an instance in a logical database

## Summary

**Description**:

Destroys an instance in a logical database in an organization.

**Requirements**:

- The caller must provide an [authentication] token.
- The authenticated user must be a member of the named organization.
- The named logical database must already exist in the named organization.
- The named instance must already exist in the named database.

The organization is identified by the unique slug string it was assigned during
creation. The logical database is identified by the name it was given at
creation. The instance is identified by the name it was assigned by the API at
the time it was created.

**Analogous CLI command**: `turso db destroy [db_name] --instance [instance_name]`

:::info

The CLI allows you to destroy instances by their location with the command
`turso db destroy [db_name] --location [location_code]`, but the API does not
offer this function directly. The implementation of the CLI first [gets a list
of database instances], then destroys the individual instances that match the
provided location code.

:::

**Path**: `/v1/organizations/:org_slug/databases/:db_name/instances/:instance_name`

**Method**: `DELETE`

## Inputs

**Path parameters**:

| Parameter | Description |
| --- | --- |
| `org_slug`| Slug of the organization containing the logical database |
| `db_name` | Name of the logical database containing the instance |
| `instance_name` | Name of the database instance to destroy |

## Output

**JSON body properties**:

| Property | Type | Description |
| --- | --- | --- |
| `instance` | string | The name of the destroyed instance |

## Example

```bash
curl \
  -X POST \
  -H "Authorization: Bearer $TURSO_TOKEN" \
  "$TURSO_BASE_URL/v1/organizations/my-org/databases/my-db/instances/my-instance"
```

```json
{
  "instance": "my-instance"
}
```


[authentication]: /reference/platform-rest-api/#authentication
[gets a list of database instances]: ./get-instances-in-database

---
description: API to invalidate all auth tokens for a Turso logical database in an organization.
keywords:
  - turso
  - platform
  - rest
  - api
  - revoke
  - token
  - logical
  - database
---

# Invalidate all auth tokens for a logical database in an organization

## Summary

**Description**:

Invalidates all [auth tokens] previously [minted] for a logical database in an
organization. This is achieved by randomly changing the signing key for the
database so that tokens signed with the prior key are no longer valid.

:::caution

This operation cannot be reverted. A short downtime is required to complete the
changes.

:::

**Requirements**:

- The caller must provide an [authentication] token.
- The authenticated user must be a member of the named organization.

The organization is identified by the unique slug string it was assigned during
creation.

**Analogous CLI command**: `turso db tokens invalidate [db_name]`

**Path**: `/v1/organizations/:org_slug/databases/:db_name/auth/rotate`

**Method**: `POST`

## Inputs

**Path parameters**:

| Parameter | Description |
| --- | --- |
| `org_slug`| Slug of the organization containing the database |
| `db_name`| Name of the logical database |

## Output

None.

## Example

```bash
curl \
  -X POST \
  -H "Authorization: Bearer $TURSO_TOKEN" \
  "$TURSO_BASE_URL/v1/organizations/my-org/databases/my-db/auth/rotate"
```


[auth tokens]: /reference/turso-cli#database-client-authentication-tokens
[minted]: ./mint-token-for-database-in-org
[authentication]: /reference/platform-rest-api/#authentication

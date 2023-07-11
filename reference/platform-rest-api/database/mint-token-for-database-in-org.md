---
description: API to mint an auth token for a Turso logical database in an organization.
keywords:
  - turso
  - platform
  - rest
  - api
  - mint
  - token
  - logical
  - database
---

# Mint an auth token for a logical database in an organization

## Summary

**Description**:

Mints an [auth token for client access] to a logical database in an
organization.

The returned token:

- Can't be retrieved again; there is no record kept of it by Turso
- Can't be revoked individually.

All previously minted tokens can be [invalidated].

**Requirements**:

- The caller must provide an [authentication] token.
- The authenticated user must be a member of the named organization.

The organization is identified by the unique slug string it was assigned during
creation.

**Analogous CLI command**: `turso db tokens create [db_name]`

**Path**: `/v1/organizations/:org_slug/databases/:db_name/auth/tokens`

**Method**: `POST`

## Inputs

**Path parameters**:

| Parameter | Description |
| --- | --- |
| `org_slug`| Slug of the organization containing the database |
| `db_name`| Name of the logical database |

**Query string parameters**:

| Parameter | Required | Description |
| --- | --- | --- |
| `expiration`| no | Duration of the token until expiration as parsed by [go-str2duration], or `never` (default); for example: "1w2d6h3ns" (1 week 2 days 6 hours and 3 nanoseconds) |
| `authorization`| no | Level of access granted to the bearer of the token; `read-only` or `full-access` (default) |

## Output

**JSON body properties**:

| Property | Type | Description |
| --- | --- | --- |
| `jwt` | string | An auth token with the requested access to the logical database |

## Example

```bash
curl \
  -X POST \
  -H "Authorization: Bearer $TURSO_TOKEN" \
  "$TURSO_BASE_URL/v1/organizations/my-org/databases/my-db/auth/tokens?expiration=1d&authorization=read-only"
```

```json
{
  "jwt": "AUTH-TOKEN-STRING"
}
```


[auth token for client access]: /reference/turso-cli#database-client-authentication-tokens
[authentication]: /reference/platform-rest-api/#authentication
[invalidated]: ./invalidate-all-tokens-for-database-in-org
[go-str2duration]: https://github.com/xhit/go-str2duration

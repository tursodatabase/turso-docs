---
description: Technical reference for the Turso Platform Logical database REST API.
keywords:
  - turso
  - platform
  - rest
  - api
  - database
  - instance
---

# Logical database API

## Summary

The Logical database API allows you to work with Turso [logical databases]
within an organization.

Each database must be contained within an organization. Every GitHub account has
a personal organization with a name based on the GitHub account name. Team
organizations are created and managed with the Turso CLI or the [Organization
API].

After creating a logical database, use the [Database instance API] to add and
remove [instances] within that logical database.

## Operations

All operations require [authentication].

- [Get all logical databases in an organization](/reference/platform-rest-api/database/get-databases-in-org)
- [Create a logical database in an organization](/reference/platform-rest-api/database/create-database-in-org)
- [Destroy a logical database in an organization](/reference/platform-rest-api/database/destroy-database-in-org)
- [Mint an auth token for a logical database in an organization](/reference/platform-rest-api/database/mint-token-for-database-in-org)
- [Invalidate all auth tokens for a logical database in an organization](/reference/platform-rest-api/database/invalidate-all-tokens-for-database-in-org)

## Objects

### Logical database object

| Property | Type | Description |
| --- | --- | --- |
| `Name` | string | Name of the logical database, unique among all databases in an organization |
| `Hostname` | string | The DNS hostname used for client connections; used to build libsql and https URLs |
| `IssuedCertLimit` | number |  |
| `IssuedCertCount` | number |  |
| `DbId` | string | UUID for the database |
| `regions` | string array | List location codes of all instances of this logical database |
| `primaryRegion` | string | Location code for the primary instance |
| `type` | string | "logical" |

Any `username` and `password` values associated with a database are deprecated
and should not be used by consumers of this API.


[logical databases]: /concepts#logical-database
[Organization API]: /reference/platform-rest-api/organization
[Database instance API]: /reference/platform-rest-api/instance
[instances]: /concepts#instance
[authentication]: /reference/platform-rest-api/#authentication

---
description: Technical reference for the Turso Platform Database instance REST API.
keywords:
  - turso
  - platform
  - rest
  - api
  - database
  - instance
---

# Database instance API

## Summary

The Database instance API allows you to work with Turso database [instances].

Before using this API, you must already have a [logical database] created by the
[Turso CLI] or the [Logical database API]

## Operations

All operations require [authentication].

- [Get all instances in a logical database](/reference/platform-rest-api/instance/get-instances-in-database)
- [Create an instance in a logical database](/reference/platform-rest-api/instance/create-instance-in-database)
- [Destroy an instance in a logical database](/reference/platform-rest-api/instance/destroy-instance-in-database)
- [Wait for an instance to become ready in a logical database](/reference/platform-rest-api/instance/wait-instance-ready-in-database)


## Objects

### Database instance object

| Property | Type | Description |
| --- | --- | --- |
| `uuid` | string | UUID, unique among all instances |
| `name` | string | Given name (human readable) |
| `type` | string | "primary" or "replica" |
| `region` | string | Location code |
| `hostname` | string | The DNS hostname used for client connections; used to build libsql and https URLs |


[instances]: /concepts#instance
[logical database]: /concepts#logical-database
[Turso CLI]: /reference/turso-cli
[Logical database API]: /reference/platform-rest-api/database
[authentication]: /reference/platform-rest-api/#authentication

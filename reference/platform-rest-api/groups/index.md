---
description: The Groups API lets you create a group for a collection of databases that share the same locations, and auth tokens.
keywords:
  - turso
  - platform
  - rest
  - api
  - management
  - reference
---

# Groups API

The Groups API lets you create a group for a collection of databases that share the same locations.

## Operations

All operations require [authentication].

- [List groups]
- [Create group]
- [Retrieve group]
- [Delete group]
- [Add location]
- [Remove location]

## Objects

### Group object

| Property    | Type             | Description                                                             |
| ----------- | ---------------- | ----------------------------------------------------------------------- |
| `name`      | `string`         | The name of the group.                                                  |
| `locations` | `array[string]`  | An array of the [locations] (three letter codes) assigned to the group. |
| `primary`   | `string[string]` | The primary [location] (three letter code) assigned to the group.       |

[List groups]: /reference/platform-rest-api/groups/list-groups
[Create group]: /reference/platform-rest-api/groups/create-group
[Retrieve group]: /reference/platform-rest-api/groups/retrieve-group
[Delete group]: /reference/platform-rest-api/groups/delete-group
[Add location]: /reference/platform-rest-api/groups/add-location
[Remove location]: /reference/platform-rest-api/groups/remove-location
[authentication]: /reference/platform-rest-api/#authentication
[locations]: /reference/platform-rest-api/location/get-locations#example
[location]: /reference/platform-rest-api/location/get-locations#example

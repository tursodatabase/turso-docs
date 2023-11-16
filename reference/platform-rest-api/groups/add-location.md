---
description: Add a location to a group for a specific user or organization.
keywords:
  - turso
  - platform
  - rest
  - api
  - database
  - groups
  - locations
---

# Add location to a group

Add a location to a group for a specific user or organization.

## User Groups

`POST /v1/groups/:group/locations/:location`

### Headers

| Header          | Example        | Description                        |
| --------------- | -------------- | ---------------------------------- |
| `Authorization` | `Bearer TOKEN` | The platform or user auth `TOKEN`. |

### Path Parameters

| Parameter  | Type     | Description                                              |
| ---------- | -------- | -------------------------------------------------------- |
| `group`    | `string` | The group name.                                          |
| `location` | `string` | The three letter location code to be added to the group. |

### Example

```bash
curl \
  --location --request POST 'https://api.turso.tech/v1/groups/default/locations/bos' \
  --header 'Authorization: Bearer TOKEN'
```

```json
{
  "group": {
    "name": "default",
    "locations": ["fra", "lhr", "bos"],
    "primary": "fra"
  }
}
```

## Organization Groups

`POST /v1/organizations/:organization/groups/:group/locations/:location`

### Headers

| Header          | Example        | Description                        |
| --------------- | -------------- | ---------------------------------- |
| `Authorization` | `Bearer TOKEN` | The platform or user auth `TOKEN`. |

### Path Parameters

| Parameter      | Type     | Description                                              |
| -------------- | -------- | -------------------------------------------------------- |
| `organization` | `string` | The organization name.                                   |
| `group`        | `string` | The group name.                                          |
| `location`     | `string` | The three letter location code to be added to the group. |

### Example

```bash
curl \
  --location --request POST 'https://api.turso.tech/v1/organizations/some_org/groups/default/locations/bos' \
  --header 'Authorization: Bearer TOKEN'
```

```json
{
  "group": {
    "name": "default",
    "locations": ["fra", "lhr", "bos"],
    "primary": "fra"
  }
}
```

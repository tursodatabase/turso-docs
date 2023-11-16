---
description: Returns a single group and its locations by name for a specific user.
keywords:
  - turso
  - platform
  - rest
  - api
  - database
  - groups
---

# Retrieve Group

Returns a single group and its locations by name for a specific user or organization.

## User Groups

`GET /v1/groups/:group`

### Headers

| Header          | Example            | Description                        |
| --------------- | ------------------ | ---------------------------------- |
| `Accept`        | `application/json` | The data requested should be JSON. |
| `Authorization` | `Bearer TOKEN`     | The platform or user auth `TOKEN`. |

### Path Parameters

| Parameter | Type     | Description     |
| --------- | -------- | --------------- |
| `group`   | `string` | The group name. |

### Example

```bash
curl \
  --location 'https://api.turso.tech/v1/groups/default' \
  --header 'Authorization: Bearer TOKEN'
```

```json
{
  "group": {
    "name": "default",
    "locations": ["fra"],
    "primary": "fra"
  }
}
```

## Organization Groups

`GET /v1/organizations/:organization/groups/:group`

### Headers

| Header          | Example            | Description                        |
| --------------- | ------------------ | ---------------------------------- |
| `Accept`        | `application/json` | The data requested should be JSON. |
| `Authorization` | `Bearer TOKEN`     | The platform or user auth `TOKEN`. |

### Path Parameters

| Parameter      | Type     | Description            |
| -------------- | -------- | ---------------------- |
| `organization` | `string` | The organization name. |
| `group`        | `string` | The group name.        |

### Example

```bash
curl \
  --location --request POST 'https://api.turso.tech/v1/organizations/some_org/groups/default' \
  --header 'Authorization: Bearer TOKEN'
```

```json
{
  "group": {
    "name": "default",
    "locations": ["fra"],
    "primary": "fra"
  }
}
```

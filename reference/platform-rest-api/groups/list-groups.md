---
description: Returns a list of groups and the assigned locations.
keywords:
  - turso
  - platform
  - rest
  - api
  - database
  - groups
---

# List Groups

Returns a list of groups and the assigned locations.

## User Groups

`GET /v1/groups`

### Headers

| Header          | Example            | Description                        |
| --------------- | ------------------ | ---------------------------------- |
| `Accept`        | `application/json` | The data requested should be JSON. |
| `Authorization` | `Bearer TOKEN`     | The platform or user auth `TOKEN`. |

### Example

```bash
curl \
  --location 'https://api.turso.tech/v1/groups' \
  --header 'Authorization: Bearer TOKEN'
```

```json
{
  "groups": [
    {
      "locations": ["bos", "lhr"],
      "name": "default",
      "primary": "lhr"
    }
  ]
}
```

## Organization Groups

`GET /v1/organizations/:organization/groups`

This endpoint retrieves groups that are specific to an organization.

### Headers

| Header          | Example            | Description                        |
| --------------- | ------------------ | ---------------------------------- |
| `Accept`        | `application/json` | The data requested should be JSON. |
| `Authorization` | `Bearer TOKEN`     | The platform or user auth `TOKEN`. |

### Path Parameters

| Header         | Type     | Description            |
| -------------- | -------- | ---------------------- |
| `organization` | `string` | The organization name. |

### Example

```bash
curl \
  --location 'https://api.turso.tech/v1/organizations/some_org/groups' \
  --header 'Authorization: Bearer TOKEN'
```

```json
{
  "groups": [
    {
      "locations": ["lhr"],
      "name": "default",
      "primary": "lhr"
    }
  ]
}
```

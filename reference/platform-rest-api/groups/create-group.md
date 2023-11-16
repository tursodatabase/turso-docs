---
description: Create a group for a specific user.
keywords:
  - turso
  - platform
  - rest
  - api
  - database
  - groups
---

# Create Group

Create a group for a specific user or organization.

## User Groups

`POST /v1/groups`

### Headers

| Header          | Example            | Description                        |
| --------------- | ------------------ | ---------------------------------- |
| `Authorization` | `Bearer TOKEN`     | The platform or user auth `TOKEN`. |
| `Content-Type`  | `application/json` | The data sent must be JSON.        |

### Request Body

| Field      | Type         | Description                      |
| ---------- | ------------ | -------------------------------- |
| `name`     | `string`     | The group name.                  |
| `location` | `[location]` | A valid supported location name. |

### Example

```bash
curl \
  --location 'https://api.turso.tech/v1/groups' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
      "name": "group2",
      "location": "lhr"
  }'
```

```json
{
  "group": {
    "locations": ["lhr"],
    "name": "group2",
    "primary": "lhr"
  }
}
```

## Organization Groups

`POST /v1/organizations/:organization/groups`

### Headers

| Header          | Example            | Description                        |
| --------------- | ------------------ | ---------------------------------- |
| `Authorization` | `Bearer TOKEN`     | The platform or user auth `TOKEN`. |
| `Content-Type`  | `application/json` | The data sent must be JSON.        |

### Path Parameters

| Parameter      | Type     | Description            |
| -------------- | -------- | ---------------------- |
| `organization` | `string` | The organization name. |

### Request Body

| Field      | Type         | Description                      |
| ---------- | ------------ | -------------------------------- |
| `name`     | `string`     | The group name.                  |
| `location` | `[location]` | A valid supported location name. |

### Example

```bash
curl \
  --location 'https://api.turso.tech/v1/organizations/some_org/groups' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
      "name": "group2",
      "location": "lhr"
  }'
```

```json
{
  "group": {
    "locations": ["lhr"],
    "name": "group2",
    "primary": "lhr"
  }
}
```

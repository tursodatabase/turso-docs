---
description: Invalidate all auth tokens for a group
keywords:
  - turso
  - platform
  - rest
  - api
  - database
  - groups
---

# Invalidate Group Tokens

Invalidate all auth tokens for a group.

## User Groups

`POST /v1/groups/:group/auth/rotate`

### Headers

| Header          | Example        | Description                        |
| --------------- | -------------- | ---------------------------------- |
| `Authorization` | `Bearer TOKEN` | The platform or user auth `TOKEN`. |

### Example

```bash
curl \
  --request POST
  --location 'https://api.turso.tech/v1/groups/some_group/auth/rotate' \
  --header 'Authorization: Bearer TOKEN'
```

Note: The response body is empty but returns HTTP status `200` for successful rotations.

## Organization Groups

`POST /v1/organizations/:organization/groups/:group/auth/rotate`

### Headers

| Header          | Example        | Description                        |
| --------------- | -------------- | ---------------------------------- |
| `Authorization` | `Bearer TOKEN` | The platform or user auth `TOKEN`. |

### Path Parameters

| Parameter      | Type     | Description            |
| -------------- | -------- | ---------------------- |
| `organization` | `string` | The organization name. |

### Example

```bash
curl \
  --request POST \
  --location 'https://api.turso.tech/v1/organizations/some_org/groups/some_group/auth/rotate' \
  --header 'Authorization: Bearer TOKEN'
```

Note: The response body is empty but returns HTTP status `200` for successful rotations.

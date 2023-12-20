---
description: Create an auth token for a group
keywords:
  - turso
  - platform
  - rest
  - api
  - database
  - groups
---

# Create Group Token

Create an auth token for a group.

## User Groups

`POST /v1/groups/:group/auth/tokens`

### Headers

| Header          | Example        | Description                        |
| --------------- | -------------- | ---------------------------------- |
| `Authorization` | `Bearer TOKEN` | The platform or user auth `TOKEN`. |

### Query String Parameters

| Parameter       | Required | Description                                                                                                                                                     |
| --------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `expiration`    | no       | Duration of the token until expiration as parsed by [go-str2duration], or `never` (default); for example: `1w2d6h3ns` (1 week 2 days 6 hours and 3 nanoseconds) |
| `authorization` | no       | Level of access granted to the bearer of the token; `read-only` or `full-access` (default)                                                                      |

### Example

```bash
curl \
  --request POST \
  --location 'https://api.turso.tech/v1/groups/some_group/auth/tokens?expiration=1d&authorization=read-only' \
  --header 'Authorization: Bearer TOKEN'
```

```json
{
  "jwt": "TOKEN"
}
```

## Organization Groups

`POST /v1/organizations/:organization/groups/:group/auth/tokens`

### Headers

| Header          | Example        | Description                        |
| --------------- | -------------- | ---------------------------------- |
| `Authorization` | `Bearer TOKEN` | The platform or user auth `TOKEN`. |

### Path Parameters

| Parameter      | Type     | Description            |
| -------------- | -------- | ---------------------- |
| `organization` | `string` | The organization name. |

### Query String Parameters

| Parameter       | Required | Description                                                                                                                                                     |
| --------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `expiration`    | no       | Duration of the token until expiration as parsed by [go-str2duration], or `never` (default); for example: `1w2d6h3ns` (1 week 2 days 6 hours and 3 nanoseconds) |
| `authorization` | no       | Level of access granted to the bearer of the token; `read-only` or `full-access` (default)                                                                      |

### Example

```bash
curl \
  --request POST \
  --location 'https://api.turso.tech/v1/organizations/some_org/groups/some_group/auth/tokens?expiration=1d&authorization=read-only' \
  --header 'Authorization: Bearer TOKEN'
```

```json
{
  "jwt": "TOKEN"
}
```

[go-str2duration]: https://github.com/xhit/go-str2duration

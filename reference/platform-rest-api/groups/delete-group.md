---
description: Delete a group for a specific user.
keywords:
  - turso
  - platform
  - rest
  - api
  - database
  - groups
---

# Delete Group

Delete a group for a specific user or organization.

## User Groups

`DELETE /v1/groups/:group`

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
  --location --request DELETE 'https://api.turso.tech/v1/groups/group2' \
  --header 'Authorization: Bearer TOKEN'
```

```json
{
  "group": {
    "name": "foo",
    "locations": ["fra"],
    "primary": "fra"
  }
}
```

## Organization Groups

`DELETE /v1/organizations/:organization/groups/:group`

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
  --location --request DELETE 'https://api.turso.tech/v1/organizations/some_org/groups/group2' \
  --header 'Authorization: Bearer TOKEN'
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

---
description: Technical reference for the Turso Platform API used to programmatically manage Turso database deployments.
keywords:
  - turso
  - platform
  - rest
  - api
  - management
  - reference
---

# Turso Platform REST API

The Turso Platform REST API is used to perform actions on data and databases
managed by Turso. The following groups of operations are available:

- [Authentication](/reference/platform-rest-api/auth/)
- [Manage organizations](/reference/platform-rest-api/organization/)
- [Location discovery](/reference/platform-rest-api/location/)
- [Manage logical databases](/reference/platform-rest-api/database/)
- [Manage database instances](/reference/platform-rest-api/instance/)

The API is served using HTTPS from the host `api.turso.tech`.

:::note

This API is used directly by the [Turso CLI]. However, the API does not operate
exactly like the interface provided CLI. Each operation includes a reference to
the analogous Turso CLI command, noting where there are significant differences
in behavior.

:::

## Conventions

### Request and response

The API accepts variable inputs from placeholders in the URL path, the query
string, and the HTTP body. HTTP request and response bodies are expressed as
JSON objects unless otherwise specified.

API errors yield an HTTP response body containing a JSON object with a string
property named "error".

### Universal HTTP response codes

| Code | Meaning |
| --- | --- |
| 200 | OK - operation completed successfully |
| 401 | Unauthorized - ensure that the [auth token](#authentication) is present and valid |
| 402 | Payment required - organization feature is not part of account plan |
| 409 | Conflict - resource already exists |

## About the examples in this documentation

The examples use curl and assume the following shell variables were established
ahead of time:

```bash
export TURSO_BASE_URL=https://api.turso.tech
export TURSO_TOKEN=[your-auth-token]
```

For `TURSO_TOKEN`, read the section about [authentication](#authentication).

## Authentication

The Turso Platform API requires that all requests include an authentication
token that identifies a user account. Operations are performed on behalf of this
user using the permissions granted to that user.

The recommended way to authenticate with the platform API is using [platform API
tokens](#platform-api-tokens). You can also authenticate with [user tokens from
the Turso CLI](#user-authentication-tokens).

:::note

The platform and user tokens mentioned above are different from the database
tokens used to allow [client application access] to the database for the purpose
of performing database queries. They are not interchangeable.

:::

### Platform API tokens

You can mint a platform API token in two ways:

- [Using the Authentication API]
- [Using the Turso CLI] (`turso auth api-tokens mint`)

### User authentication tokens

The Turso Platform API also recognizes tokens granted to a user when they [log
in to the Turso CLI] using `turso auth login`. After logging in, run `turso auth
token` to output the token string. These tokens expire after seven days, so they
are not suitable for use with non-interactive applications.

### Provide a token to the API

All HTTP requests must include the token string in the `Authorization` header.
The header takes the following form:

```
Authorization: Bearer [token]
```

`[token]` is is a placeholder for either a platform or user token.


[Turso CLI]: /reference/turso-cli
[Using the Authentication API]: /reference/platform-rest-api/auth
[Using the Turso CLI]: /reference/turso-cli#platform-api-auth-tokens
[log in to the Turso CLI]: /reference/turso-cli#logging-in-to-the-cli
[client application access]: /libsql/client-access

---
description: Technical reference for the libSQL Go client library used to access Turso databases, including sample code.
keywords:
  - turso
  - libsql
  - go
  - client
  - sdk
  - library
  - example
---

# Go SDK

The Go SDK is implemented as a driver for the standard Go [database/sql
package]. You can read more about how to install it and open a connection to
your Turso database using the documentation in the [README on GitHub]. Note that
you must provide a [client authentication token] in the query string of the URL
you receive from the Turso CLI.


[database/sql package]: https://pkg.go.dev/database/sql
[README on GitHub]: https://github.com/libsql/libsql-client-go/#readme
[client authentication token]: /reference/turso-cli#authentication-tokens-for-client-access

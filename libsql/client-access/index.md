---
description: Technical reference for libSQL client libraries used to access Turso databases.
keywords:
  - turso
  - libsql
  - client
  - sdk
  - library
---

# Client access

Client libraries for the following languages are available to query a Turso
database:

- [JavaScript & TypeScript](/libsql/client-access/javascript-typescript-sdk)
- [Rust](/libsql/client-access/rust-sdk)
- [Python](/libsql/client-access/python-sdk)
- [Go](/libsql/client-access/go-sdk)

The client libraries allow you to execute a single SQL statement, execute a
batch of statements in an implied transaction, and perform an interactive
transaction. The information that follows is common to all clients.

## Configuration

The client libraries require two pieces of information for initialization.

### 1. Database URL

You must have a [libSQL database URL] that identifies the [logical database] or
[instance] to connect with. You can get this using the [Turso CLI] by running
`turso db show`.

### 2. Authentication token

You must have an authentication token that authorizes your client application to
access the database. It should be a long-lived token with no expiration. You can
[get an auth token this using the Turso CLI] by running `turso db tokens create
$DBNAME`.

## Batches

With the libSQL client library, a batch is one or more SQL statements executed
in order in an implicit transaction. The transaction is controlled by the libSQL
backend. If all of the statements are successful, the transaction is committed.
If any of the statements fail, the entire transaction is rolled back and no
changes are made.

## Interactive transactions

Interactive transactions allow you to execute a series of read and write
statements in the context of a [SQLite transaction]. Reads and writes are all
consistent within the scope of that transaction, unaffected by other client
activity. The transaction API requires you to choose when to commit or roll back
the transaction.

:::note

Interactive transactions are not supported when using a stateless HTTP-based
client. They require a websocket-based client or local SQLite files.

:::

:::warning

Interactive transactions effectively lock the entire database for writing when a
write is first performed, and until the transaction is committed or rolled back.
libSQL aborts transactions after a 5 second timeout. Transactions may negatively
impact overall database performance when used on high latency connections or
with busy databases.

:::


[libSQL database URL]: /reference/libsql-urls
[logical database]: /concepts#logical-database
[instance]: /concepts#instance
[Turso CLI]: /reference/turso-cli
[get an auth token this using the Turso CLI]: /reference/turso-cli#authentication-tokens-for-client-access
[SQLite transaction]: https://www.sqlite.org/lang_transaction.html

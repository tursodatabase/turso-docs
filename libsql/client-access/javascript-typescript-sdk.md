---
description: Technical reference for the libSQL TypeScript & JavaScript client libraries used to access Turso databases, including sample code.
keywords:
  - turso
  - libsql
  - javascript
  - typescript
  - client
  - sdk
  - library
  - example
---

# JavaScript & TypeScript SDK

The JavaScript SDK comes with TypeScript bindings and supports environments
where either language can be used.  Both ESM and CJS modules are provided.
Example on this page show TypeScript.

The following runtime environments are known to be compatible:

- Node.js version 12 or later
- Deno
- CloudFlare Workers
- Netlify Edge Functions

## Installation

Add the `@libsql/client` package to your project using npm or a package manager
of your choice:

```bash
$ npm install @libsql/client
```

## Initialization

### Choose the correct import for your environment

There are two ways to import the client code. When running in a Node.js or
compatible environment, use the standard import:

```ts
import { createClient } from "@libsql/client";
```

Or, when running in a JavaScript environment without Node.js APIs (for example,
Cloudflare Workers or browsers):

```ts
import { createClient } from "@libsql/client/web";
```

The `@libsql/client` import allows for local testing using SQLite database files
using the exact same API as libSQL remote databases.  You can switch between
local files and a remote database easily by changing the URL used to initialize
the SDK. Use a `file:` URL to direct the SDK to a local SQLite database file.

:::note

The alternate `@libsql/client/web` import does not support local file URLs.

:::

### Create a database client object for local and remote access

For local and remote access, call the `createClient` factory function and invoke
it with your database URL and [database client authentication token] obtained using
the Turso CLI:

```ts
const client = createClient({
    url: "libsql://your-database.turso.io",
    authToken: "your-auth-token"
});
```

The `authToken` property is only required when using a remote database instance
managed by Turso.

### Create a database client object for hybrid access (embedded replica)

:::info

Support for hybrid access with embedded replicas requires version 0.3.5 or later
of the SDK.

:::

For hybrid access using an embedded replica, call the `createClient` factory
function and invoke it with your database URL, [database client authentication
token] obtained using the Turso CLI, and local database replica file:

```ts
const client = createClient({
    url: "file:path/to/db-file",
    syncUrl: "libsql://your-database.turso.io",
    authToken: "your-auth-token"
});

// Synchronize the embedded replica with the remote database
await client.sync();
```

For additional information about how embedded replicas work with the SDKs
provided for all languages, see the [common section on embedded replicas].


### Client capability summary

With the returned libSQL Client object you can call:

| Method | Description |
| --- | --- |
| `execute()` | [Execute a single statement](#execute-a-single-statement) |
| `batch()` | [Execute a batch of statements](#execute-a-batch-of-statements) |
| `transaction()` | Start an [interactive transaction](#interactive-transactions) |
| `sync()` | Synchronize the embedded replica from the remote database (hybrid access only) |


## Example data set

All of the examples in this section assume tables and data established by these
statements:

```sql
create table example_users (
    uid text primary key,
    email text
);
create table example_scores (
    uid text,
    level integer,
    score integer,
    primary key (uid, level)
);

insert into example_users values ('uid1', 'foo@bar.com');
insert into example_users values ('uid2', 'baz@bar.com');
insert into example_scores values ('uid1', 1, 100);
insert into example_scores values ('uid1', 2, 95);
```

## Execute a single statement

You can execute a single statement with the `execute()` method of a Client
object. `execute()` returns a promise that becomes resolved with a
[ResultSet](#resultset) object, or rejected with an error.

### SQL string argument

Pass a single string to `execute()` to invoke a SQL statement in the SQLite
dialect.

```ts
try {
    const rs = await client.execute("select * from example_users");
    // rs.columns == [ 'uid', 'email' ]
    // rs.rows[0] == [ 'uid1', 'foo@bar.com' ]
    // rs.rows[1] == [ 'uid2', 'baz@bar.com' ]
} catch (e) {
    console.error(e);
}
```

### Positional placeholders

libSQL supports positional placeholders using the same syntax as SQLite.  Pass
an object with `sql` and `args` properties to `execute()`. The `sql` property
must be a string containing placeholders, and the `args` property must be an
array of values to bind to the placeholders.

```ts
try {
    const rs = await client.execute({
    	sql: "select score from example_scores where uid = ? and level = ?",
    	args: [ "uid1", 2 ]
    });
    // rs.columns == [ 'score' ]
    // rs.rows[0] == [ 95 ]
} catch (e) {
    console.error(e);
}
```

### Named placeholders

libSQL supports named placeholders using the same syntax as SQLite. Pass an
object with `sql` and `args` properties to `execute()`. `sql` must be a string
containing placeholders, and `args` must be an object whose properties match the
names of the placeholders, and whose values will be bound to the placeholders.

```ts
try {
    const rs = await client.execute({
    	sql: "insert into example_scores values (:uid, :level, :score)",
    	args: { uid: "uid2", level: 1, score: 50 }
    });
    // rs.columns = []
    // rs.rows = []
    // rs.rowsAffected == 1
} catch (e) {
    console.error(e);
}
```

In the above example, there are placeholders for `uid`, `level`, and `score`
using the prefix character `:`. The values of the matching properties of `args`
are bound to each placeholder.

libSQL supports the same named placeholder prefix characters as SQLite: `:`,
`@`, and `$`.

## Batches and interactive transactions

Batches and interactive transactions provide a way to execute multiple
statements atomically, internally using a [SQLite transaction]. They both
require a mode to be specified to indicate what sort of operations can be
executed. The mode is specified as a string in the first argument of the call to
`batch()` or `transaction()`.

| Mode | SQLite command | Description |
| --- | --- | --- |
| `write` | `BEGIN IMMEDIATE` | The transaction may execute statements that read and write data. Write transactions executed on a replica are forwarded to the primary instance, and can't operate in parallel. |
| `read` | `BEGIN TRANSACTION READONLY` | The transaction may only execute statements that read data (select). Read transactions can occur on replicas, and can operate in parallel with other read transactions. |
| `deferred` | `BEGIN DEFERRED` | The transaction starts in `read` mode, then changes to `write` as soon as a write statement is executed. *This mode change may fail if there is a write transaction currently executing on the primary.* |

In general:

- You should prefer to use a `read` batch or transaction when possible in order
  to achieve the best latency with replicas, since they don't require
  interaction with the primary instance.
- You should be prepared to handle random failures with `deferred` transactions
  when a change in mode is required. The probability of such an error becomes
  more likely as the write load on the primary instance increases.

### Execute a batch of statements

:::info

Be sure to read the [common section on batches] for libSQL clients to understand
their behavior.

:::

To execute multiple statements in a transaction, use the `batch()` method on the
client object, passing it a transaction mode and array of statements. The array
may contain any type of statement that is also accepted by
[`execute()`](#execute-a-single-statement). `batch()` returns a promise that
becomes fulfilled with an array of [ResultSet](#resultset) objects (one for each
statement), or an error.

The following code uses a write batch to insert a row for uid3 in two different
tables using a transaction that commits them both at the same time.

```ts
try {
    const rss = await client.batch([
        {
            sql: "insert into example_users values (?, ?)",
            args: [ "uid3", "uid3@turso.tech" ]
        },
        {
            sql: "insert into example_scores values (?, ?, ?)",
            args: [ "uid3", 1, 200 ]
        }
    ], "write");

    // rss[0].columns = []
    // rss[0].rows = []
    // rss[0].rowsAffected == 1
    //
    // rss[1].columns = []
    // rss[1].rows = []
    // rss[1].rowsAffected == 1
} catch (e) {
    console.error(e);
}
```

### Interactive transactions

:::info

Be sure to read the [common section on interactive transactions] for libSQL
clients to understand their behavior.

:::

Use the `transaction()` method on the client object to start an interactive
transaction, passing it the mode of the transaction. The returned Transaction
object provides the following methods:

| Method | Description |
| --- | --- |
| `execute()` | Similar to the normal client `execute()`, except within the context of the transaction |
| `commit()` | Commits all the write statements in the transaction |
| `rollback()` | Rolls back the entire transaction |
| `close()` | Immediately stops the transaction - must be called if the transaction was not committed or rolled back in order to free resources |

The following code uses a write transaction to update a user’s level score, but
only if it’s greater than the one that currently exists:

```ts
try {
    const uid = "uid1";
    const level = 1;
    const newScore = 200;

    const transaction = await client.transaction("write");
    const rs = await transaction.execute({
        sql: "select score from example_scores where uid = ? and level = ?",
        args: [ uid, level ]
    });
    // rs.columns == [ 'score' ]
    // rs.rows[0]['score'] == 1000

    const oldScore = rs.rows[0]["score"] as number;
    if (newScore > oldScore) {
        await transaction.execute({
            sql: "update example_scores set score = ? where uid = ? and level = ?",
            args: [ newScore, uid, level ]
        })
    }
    await transaction.commit();
} catch (e) {
    console.error(e);
}
```

## ResultSet

Database queries always yield a ResultSet object. This object has the following
properties:

| Property | Type | Description |
| --- | --- | --- |
| `rows` | `Array<Row>` | An array of Row objects containing the row values, empty for write operations |
| `columns` | `Array<string>` | An array of strings with the names of the columns in the order they appear in each Row, empty for write operations |
| `rowsAffected` | `number` | The number of rows affected by a write statement, 0 otherwise |
| `lastInsertRowid` | <code>bigint &#124; undefined</code> | The rowid of a newly inserted row, or undefined if there is none for the statement |

A Row object contains the values of a row in a ResultSet. It can be indexed by
either an integer column index or the name of the column. Each element of a Row
can have one of the following types, depending on the source of data:

- `null`
- `string`
- `number`
- `ArrayBuffer` (for blobs)

```ts
const rs = await client.execute({
    sql: "select level, score from example_scores where uid = ?",
    args: [ "uid1" ]
});
for (const row of rs.rows) {
    // Can index row by column number
    const level1 = row[0] as number;
    const score1 = row[1] as number;

    // Can also index row by column name
    const level2 = row["level"] as number;
    const score2 = row["score"] as number;
}
```

:::warning

With TypeScript, casting row values without first checking their types might
result in errors at runtime. Check the type of any values before casting them
unless you are absolutely certain of their type.

:::


[database client authentication token]: /reference/turso-cli#database-client-authentication-tokens
[common section on embedded replicas]: /libsql/client-access#embedded-replicas
[common section on batches]: /libsql/client-access#batches
[common section on interactive transactions]: /libsql/client-access#interactive-transactions
[SQLite transaction]: https://www.sqlite.org/lang_transaction.html

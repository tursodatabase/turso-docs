---
description: Technical reference for the libSQL Python client library used to access Turso databases, including sample code.
keywords:
  - turso
  - libsql
  - python
  - client
  - sdk
  - library
  - example
---

# Python SDK

The Python SDK comes with APIs for both synchronous and asynchronous code.

## Installation

Add the [libsql-client module] to your project using `pip`:

```bash
$ pip install libsql-client
```

## Initialization

Import the module using `libsql_client`:

```py
import libsql_client
```

If you want to use the synchronous API, use the `create_client_sync` function:

```py
client = libsql_client.create_client_sync(
    url="libsql://your-database.turso.io"
    auth_token="your-auth-token"
)
```

If you want to use the asynchronous API, use the `create_client` function along
with `asyncio` and async/await syntax:

```py
client = libsql_client.create_client(
    url="libsql://your-database.turso.io"
    auth_token="your-auth-token"
)
```

:::note

Do not use `await` with `create_client()`. Only the database operations require
that.

:::

The `auth_token` parameter is only required when using a remote database
instance managed by Turso.

In either case, the returned object exposes an identical API, though they are
are defined with different classes. The synchronous client is a thin wrapper
around the asynchronous client.

The examples on this page use the synchronous API. The equivalent async code can
be easily derived from that by applying `async` and `await`.  For example, a
synchronous call to the client's `execute()` method takes this form:

```py
with client:
    result_set = client.execute("...")
    # Work with query results
```

While an asynchronous call takes this form:

```py
async with client:
    result_set = await client.execute("...")
    # Work with query results
```

In both cases above, the `with` keyword is used to close the client after the
work is complete. If you want to work with the client object across functions,
you should call `close()` on it after you're done with the client to clean up
the resources it uses.

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

### SQL string argument

You can execute a single statement with the `execute()` method of a Client
object. It returns a [ResultSet](#resultset) object containing the results of
the query.

```py
rs = client.execute("select * from users")

# rs.columns == ('uid', 'email')
# rs.rows[0] == ('uid1', 'foo@bar.com')
# rs.rows[1] == ('uid2', 'baz@bar.com')
```

### Positional placeholders

libSQL supports positional placeholders using the same syntax as SQLite. Pass
two parameters, with the first (`stmt`) being the SQL string with placeholders,
and the second (`args`) being a list of values to bind to the placeholders.

```py
rs = client.execute(
    "select score from example_scores where uid = ? and level = ?",
    [ "uid1", 2 ]
)

# rs.columns == ('score',)
# rs.rows[0] == (95,)
```

### Named placeholders

libSQL supports named placeholders using the same syntax as SQLite. Pass two
parameters, with the first (`stmt`) must be the SQL string with placeholders,
and the second (`args`) must be a dictionary whose keys match the names of the
placeholders, and whose values will be bound to the placeholders.

```py
rs = client.execute(
    "insert into example_scores values (:uid, :level, :score)",
    { "uid": "uid2", "level": 1, "score": 50 }
)

# rs.columns == ()
# rs.rows == []
# rs.rows_affected == 1
```

In the above example, there are placeholders for `uid`, `level`, and `score`
using the prefix character `:`. The values of the matching properties of `args`
are bound to each placeholder.

libSQL supports the same named placeholder prefix characters as SQLite: `:`,
`@`, and `$`.

## Execute a batch of statements

:::info

Be sure to read the [common section on batches] for libSQL clients to understand
their behavior.

:::

To execute multiple statements in a transaction, use the `batch()` method on the
client object, passing it an list of statements. The list may contain any type
of statement that is also accepted by
[`execute()`](#execute-a-single-statement). `batch()` returns a list of
[ResultSet](#resultset) objects (one for each statement).

The following code inserts a row for uid3 in two different tables using a
transaction that commits them both at the same time.

```py
rss = client.batch([
    libsql_client.Statement(
        "insert into example_users values (?, ?)",
        [ "uid3", "uid3@turso.tech" ]
    ),
    libsql_client.Statement(
        "insert into example_scores values (?, ?, ?)",
        [ "uid3", 1, 200 ]
    ),
])

# rss[0].columns == ()
# rss[0].rows == []
# rss[0].rows_affected == 1
# rss[1].columns == ()
# rss[1].rows == []
# rss[1].rows_affected == 1
```

## Interactive transactions

:::info

Be sure to read the [common section on interactive transactions] for libSQL
clients to understand their behavior.

:::

Use the `transaction()` method on the client object to create a Transaction
object to issue read and write statements to be executed atomically. It provides
the following methods:

| Method | Description |
| --- | --- |
| `execute()` | Similar to the normal client `execute()`, except within the context of the transaction |
| `commit()` | Commits all the write statements in the transaction |
| `rollback()` | Rolls back the entire transaction |
| `close()` | Immediately stops the transaction; must be called if the transaction was not committed or rolled back in order to free resources. Use `with` on the transaction object to ensure this happens automatically. This is always synchronous even with the async API. |

The following code uses an interactive transaction to update a user’s level
score, but only if it’s greater than the one that currently exists:

```py
uid = "uid1"
level = 1
new_score = 200

with client.transaction() as transaction:
    rs = transaction.execute(
        "select score from example_scores where uid = ? and level = ?",
        [ uid, level ]
    )

    # rs.columns == ('score',)
    # rs.rows[0] == (200,)

    old_score = rs.rows[0]["score"]
    if new_score > old_score:
        transaction.execute(
            "update example_scores set score = ? where uid = ? and level = ?",
            [ new_score, uid, level ]
        )

    transaction.commit()
```

## ResultSet

Database queries always yield a ResultSet object. This object has the following
attribute:

| Attribute | Type | Description |
| --- | --- | --- |
| `rows` | `List[Row]` | A list of Row objects containing the row values, empty for write operations |
| `columns` | `Tuple[str, ...]` | An tuple of strings with the names of the columns in the order they appear in each Row, empty for write operations |
| `rows_affected` | `int` | The number of rows affected by a write statement, 0 otherwise |
| `last_insert_rowid` | `Optional[int]` | The rowid of a newly inserted row, if there was one |

A ResultSet can also be used as a Sequence of Row objects. The following are all
valid on a ResultSet `rs`:

- `rs[0]` to get the first row
- `len(rs)` to get the number of rows
- `for row in rs` to iterate the rows

A Row object is a [Sequence] that contains the values of a row in a ResultSet.
It can be indexed by either an integer column index or the name of the column.
Each element of a Row can have one of the following types, depending on the
source of data:

- `None` (for SQL NULL)
- `str`
- `int`
- `float`
- `bytes` (for blobs)

```py
rs = client.execute(
    "select level, score from example_scores where uid = ?",
    [ "uid1" ]
)
for row in rs.rows:
    # Can index row by column number
    level1 = row[0]
    score1 = row[1]

    # Can also index row by column name
    level2 = row["level"]
    score2 = row["score"]
```


[libsql-client module]: https://github.com/libsql/libsql-client-py/
[common section on batches]: ../client-access#batches
[common section on interactive transactions]: ../client-access#interactive-transactions
[Sequence]: https://docs.python.org/3/library/stdtypes.html#sequence-types-list-tuple-range

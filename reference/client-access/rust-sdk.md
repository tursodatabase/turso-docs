# Rust SDK

## Installation

Add the [libsql-client crate] to your project using `cargo`:

```bash
$ cargo add libsql-client
```

For CloudFlare Workers code that compiles to WASM, you must use a special
configuration:

```bash
$ cargo add libsql-client --no-default-features -F workers_backend
```

## Initialization

Call the new_client_from_config function to create a new Client object:

```rust
use libsql_client::{new_client_from_config, Config, DatabaseClient};

let client = new_client_from_config(Config {
    url: "libsql://your-database.turso.io".try_into()?,
    auth_token: "your-auth-token",
})
.await?;
```


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

```rust
let rs = client.execute("select * from example_users").await?;
// rs is a ResultSet object containing rows and columns
```

### Positional placeholders

Create a new Statement using `Statement::with_args` and use the `args` macro to
specify the values to bind to the placeholders.

```rust
use libsql_client::{Statement, args};

let rs = client
    .execute(Statement::with_args(
        "select score from example_scores where uid = ? and level = ?",
        args!("uid1", 2),
    ))
    .await?;
// rs is a ResultSet object containing rows and columns
```

<!-- ### Named placeholders -->

## Execute a batch of statements

:::info

Be sure to read the [common section on batches] for libSQL clients to understand
their behavior.

:::

```rust
use libsql_client::{Statement, args};

client
    .batch([
        Statement::with_args(
            "insert into example_users values (?, ?)",
            args!("uid3", "uid3@turso.tech"),
        ),
        Statement::with_args(
            "insert into example_scores values (?, ?, ?)",
            args!("uid3", 1, 200),
        ),
    ])
    .await?;
```

## Interactive transactions

:::info

Be sure to read the [common section on interactive transactions] for libSQL
clients to understand their behavior.

:::

The following code uses an interactive transaction to update a user’s level
score, but only if it’s greater than the one that currently exists:

```rust
use libsql_client::{Statement, args};

let uid = "uid1";
let level = 1;
let new_score = 200;

let transaction = client.transaction().await?;
let rs = transaction
    .execute(Statement::with_args(
        "select score from example_scores where uid = ? and level = ?",
        args!(uid, level),
    ))
    .await?;

let old_score = rs.rows.first().map(|row| &row.values[0]);
let old_score = match old_score {
    Some(Value::Integer { value: i }) => *i,
    _ => 0,
};
if new_score > old_score {
    transaction
        .execute(Statement::with_args(
            "update example_scores set score = ? where uid = ? and level = ?",
            args!(new_score, uid, level),
        ))
        .await?;
}
transaction.commit().await?;
```

## ResultSet

A ResultSet struct contains values for the rows and columns returned by a query.

```rust
pub struct ResultSet {
    pub columns: Vec<String>,
    pub rows: Vec<Row>,
    pub rows_affected: u64,
    pub last_insert_rowid: Option<i64>,
}
```

Each row is contained in a Row struct that provides the values of the row
available by column index.

```rust
pub struct Row {
    pub values: Vec<Value>,
}
```

[libsql-client crate]: https://crates.io/crates/libsql-client
[common section on batches]: ../client-access#batches
[common section on interactive transactions]: ../client-access#interactive-transactions

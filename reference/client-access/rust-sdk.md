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
use libsql_client::{new_client_from_config, Config}

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
let users = client.execute("select * from example_users").await?;
```

### Positional placeholders

```rust
use libsql_client::{Statement, params};

let also_users = client
    .execute(Statement::with_params(
        "select score from example_scores where uid = ? and level = ?",
        params!("uid1", 2),
    ))
    .await?;
```

<!-- ### Named placeholders -->

## Execute a batch of statements

:::info

Be sure to read the [common section on batches] for libSQL clients to understand
their behavior.

:::

```rust
use libsql_client::{Statement, params};

client
    .batch([
        Statement::with_params(
            "insert into example_users values (?, ?)",
            params!("uid3", "uid3@turso.tech"),
        ),
        Statement::with_params(
            "insert into example_scores values (?, ?, ?)",
            params!("uid3", 1, 200),
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
use libsql_client::{Statement, Value, params};

let uid = "uid1";
let level = 1;
let new_score = 100;
let mut transaction = client.transaction().await?;
let rs = transaction
    .execute(Statement::with_params(
        "select score from example_scores where uid = ? and level = ?",
        params!(uid, level),
    ))
    .await?;

let old_score = rs.rows.first().map(|row| &row[0]);
let old_score = match old_score {
    Some(Value::Integer { value: i }) => *i,
    _ => 0,
};
if new_score > old_score {
    transaction
        .execute(Statement::with_params(
            "update example_scores set score = ? where uid = ? and level = ?",
            params!(new_score, uid, level),
        ))
        .await?;
}
transaction.commit().await?;
```

<!-- ## ResultSet -->


[libsql-client crate]: https://crates.io/crates/libsql-client
[common section on batches]: ../client-access#batches
[common section on interactive transactions]: ../client-access#interactive-transactions

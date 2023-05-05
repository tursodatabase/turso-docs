---
description: Make queries using the Turso CLI shell.
keywords:
  - turso
  - cli
  - tutorial
  - query
  - shell
---

# Step 4: Make queries with the shell

The output of `turso db create` in the last step shows a command to run to start
an interactive shell:

```bash
turso db shell my-db
```

```
Connected to my-db at libsql://my-db-[my-github-name].turso.io

Welcome to Turso SQL shell!

Type ".quit" to exit the shell, ".tables" to list all tables, and ".schema" to show table schemas.

→
```

See that the shell is working with a simple "hello world" SQL statement:

```
→  select "hello world" as message;
MESSAGE
hello world
```

:::note

The shell requires that SQL commands terminate with a semicolon. If you enter a
string that does not, the shell will continue accepting lines of SQL input until
a terminating semicolon is provided.

:::

:::note

Turso is backed by libSQL, which is a fork of SQLite, so you must provide SQL
commands in the SQLite dialect.

:::

Create and populate a table, and view its contents by copying the following SQL
statements into the shell:

```
→  create table users (id text, email text);

→  insert into users values ("001", "test@foo.com");

→  select * from users;
ID   EMAIL
001  test@foo.com
```

The shell reminds you of some the commands `.tables` and `.schema` to inspect
the structure of the database:

```
→  .tables
NAME
users

→  .schema
SQL
CREATE TABLE users (id text, email text)
```

`.quit` or CTRL-d ends the shell.

```
→  .quit
```

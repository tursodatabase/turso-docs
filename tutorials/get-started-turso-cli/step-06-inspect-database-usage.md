---
description: Inspect database using using for billing purposes using the Turso CLI.
keywords:
  - turso
  - cli
  - tutorial
  - billing
  - usage
---

# Step 6: Inspect database usage

Turso bills you based on the usage of your database, including total size and
number of rows read.

:::info

During the Turso, public beta there is no cost to use Turso, but you are limited
in how much data you can store, and how many databases you can have.

:::

You can check the usage using `turso db inspect`:

```bash
turso db inspect my-db
```

The output looks similar to the following:

```
Total space used for tables: 8.0 KiB
Total space used for indexes: 0 B
Number of rows read: 13
```

Internally, Turso uses the [SQLite dbstat virtual table] to calculate usage
among all user-defined tables and indexes.

:::note

Use the `--verbose` flag to see a detailed breakdown of usage per table, index,
and [location].

:::

[SQLite dbstat virtual table]: https://www.sqlite.org/dbstat.html
[location]: /concepts#location

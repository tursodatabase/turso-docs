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

New Turso accounts, are automatically subscribed to the free Starter plan, which
has limits to its monthly usage. Run the following command to see your account's
current usage among all of its databases as it relates to your plan limits:

```bash
turso plan show
```

You can see per-database usage with the following command:

```bash
turso db inspect my-db
```

The output looks similar to the following:

```
Total space used: 40 KiB
Number of rows read: 13
Number of rows written: 1
```

Add the `--verbose` flag to the command to see a detailed breakdown of usage per
table, index, and [location].

:::note

Internally, Turso uses the [SQLite dbstat virtual table] to calculate usage
among all user-defined tables and indexes.

:::note


[SQLite dbstat virtual table]: https://www.sqlite.org/dbstat.html
[location]: /concepts#location

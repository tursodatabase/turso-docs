---
description: Create a logical database with the Turso CLI.
keywords:
  - turso
  - cli
  - tutorial
  - database
  - creation
---

# Step 3: Create a logical database

When creating a logical database, Turso requires a [location] for the [primary
instance]. By default, it will select a default location based on your physical
location as suggested by your IP address.  To see all locations supported by
Turso, run the following command:

```bash
turso db locations
```

Your default location appears highlighted in the list.

To create a database using the default location with the name `my-db`:

```bash
turso db create my-db
```

It takes a few moments to create the database, then generates output similar to
the following (with replacements for the parts that may vary):

```
Created group default at [your location] in 9 seconds.
Created database my-db at group default in 6 seconds.

Start an interactive SQL shell with:

   turso db shell my-db

To see information about the database, including a connection URL, run:

   turso db show my-db

To get an authentication token for the database, run:

   turso db tokens create my-db
```

:::note

You can override the default location using the `--location` flag.

:::

:::note

You'll see that Turso created both a "group" and a "database" for you. All
databases exist within a container called a "placement group". It's not
important to understand right now, but we'll come back to that later.

:::

As suggested by the output, you can view information about the database using:

```bash
turso db show my-db
```

The output looks similar to the following:

```
Name:           my-db
URL:            libsql://my-db-[my-github-name].turso.io
ID:             [UUID]
Group:          default
Version:        [version]
Locations:      [location]
Size:           8.2 kB

Database Instances:
NAME     TYPE        LOCATION
[loc]    primary     [loc]
```

Note the following in the above output:

- [Database URLs] use a custom `libsql` scheme, and are composed using a
  combination of the name of the database and your GitHub ID.
- The URL is the [logical database URL] that you provide to [libSQL client
  libraries] to query the database. This URL automatically forwards the client
  to the [instance] with the lowest latency.
- The [primary] instance has a random name that was assigned by the CLI.

To see a list of all logical databases associated with the account that's
currently logged in:

```bash
turso db list
```

[location]: /concepts#location
[Database URLs]: /reference/libsql-urls
[logical database URL]: /reference/libsql-urls#logical-database-url
[instance]: /concepts#instance
[primary]: /concepts#primary
[libSQL client libraries]: /libsql/client-access

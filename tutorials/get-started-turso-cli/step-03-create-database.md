# Step 3: Create a logical database

When creating a logical database, Turso requires a [location] for the [primary
instance]. By default, it will select a default location based on your physical
location as suggested by your IP address.  To see all locations supported by
Turso, run the following command:

```bash
$ turso db locations
```

Your default location appears highlighted in the list.

To create a database using the default location with the name `my-db`:

```bash
$ turso db create my-db
```

It takes a few moments to create the database, then generates output similar to
the following (with replacements for the parts that may vary):

```
Created database my-db in [Your Location] in [xx] seconds.

You can start an interactive SQL shell with:

   turso db shell my-db

To see information about the database, including a connection URL, run:

   turso db show my-db
```

:::note

You can override the default location using the `--location` flag.

:::

:::note

If you don’t provide a database name on the command line, a random name is
generated for you.

:::

As suggested by the output, you can view information about the database using:

```bash
$ turso db show my-db
```

The output looks similar to the following:

```
Name:       my-db
URL:        libsql://my-db-[my-github-name].turso.io
ID:         [UUID]
Locations:  [location]

Database Instances:
NAME            TYPE      LOCATION    VERSION   URL
[random-name] 	primary   [location]  0.7.0     libsql://[random-string]-my-db-[my-github-name].turso.io
```

Note the following in the above output:

- [Database URLs] use a custom `libsql` scheme, and are composed using a
  combination of the name of the database and your GitHub ID.
- The first URL is the [logical database URL] that you provide to [libSQL client
  libraries] to query the database. This URL automatically forwards the client
  to the closest [instance].
- The [primary] instance has a random name that was assigned by the CLI.
- Each database instance also has its own [database instance URL] that connects
  directly to it.

To see a list of all logical databases associated with the account that's
currently logged in:

```bash
$ turso db list
```

[location]: /concepts#location
[Database URLs]: /reference/libsql-urls
[logical database URL]: /reference/libsql-urls#logical-database-url
[instance]: /concepts#instance
[primary]: /concepts#primary
[libSQL client libraries]: /reference/client-access

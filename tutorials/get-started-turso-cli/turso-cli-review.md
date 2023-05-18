---
description: The Turso CLI in review - a list of the most important commands.
keywords:
  - turso
  - cli
  - tutorial
  - commands
  - help
pagination_next: null
---

# Turso CLI in review

Congratulations, you’ve finished the Turso CLI tutorial! You should now be able
to effectively use most of the functionality provided by the CLI.

## Commands you learned

### `turso auth signup`

This starts the signup process that allows the CLI to work with Turso databases.

### `turso auth login`

This starts the authentication process, similar to `turso auth signup`. Since
the authentication token you receive expires after 7 days, you must run this
periodically to continue working with your databases.

### `turso db locations`

This lists all supported [locations], highlighting your current default location.

### `turso db create`

This creates a new [logical database] with a [primary] instance. You choose the
location for the primary, or accept the default near you.

### `turso db show`

This shows details for a specific logical database, including its URL, all of
the instances in all locations, and their URLs as well.

### `turso db list`

This lists all of the logical databases associated with the account that’s
currently logged in.

### `turso db shell`

This starts an interactive shell to issue SQL statements against your database.
By default it uses the primary, and you can also point it to a replica using its
URL.

### `turso db replicate`

This creates a [replica] of the primary in a location you choose. Use this to
put data closer to the source of queries and get lower latency on the results.

### `turso db inspect`

This shows current database usage for billing purposes.

### `turso db destroy`

This destroys a specific replica by name, or all replicas in a named location,
or the entire database.

### `turso auth logout`

This removes the authentication token previously provided by `turso auth login`,
requiring you to log in again to continue working with your databases.

### Built-in help

The CLI has help available.  The following command summarizes the top-level
commands available:

```bash
turso help
```

For each specific command, you can add the `--help` flag to get details on all
the sub-commands and flags. For example:

```
turso db --help
turso db create --help
```

### Reference documentation

To learn about additional the functionality of the CLI, consult its [reference
documentation].


[locations]: /concepts#location
[logical database]: /concepts#logical-database
[primary]: /concepts#primary
[replica]: /concepts#replica
[reference documentation]: /reference/turso-cli

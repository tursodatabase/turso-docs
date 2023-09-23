---
description: Destroy a database using the Turso CLI.
keywords:
  - turso
  - cli
  - tutorial
  - destroy
---

# Step 7: Destroy the logical database

The CLI can destroy the entire [logical database], including the [primary] and
all of its [replicas] with the following command:

```bash
turso db destroy my-db
```

This is a very dangerous command since it deletes all data in the database and
cannot be reversed. The CLI will interactively prompt you to ask if it’s OK to
do so:

```
Database my-db, and all its data will be destroyed.
Are you sure you want to do this? [y/n]:
```

Type “y” + return to continue destroying the database.

Notes about destroying logical databases:

- There is no recovery from a destroyed logical database.
- You can bypass the interactive prompt for use with automated scripts using the
  `--yes` flag.


[logical database]: /concepts#logical-database
[primary]: /concepts#primary
[replicas]: /concepts#replica

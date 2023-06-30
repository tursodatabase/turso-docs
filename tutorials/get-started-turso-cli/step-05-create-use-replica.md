---
description: Create a database replica and query it using the Turso CLI.
keywords:
  - turso
  - cli
  - tutorial
  - replicate
  - query
---

# Step 5: Create and use a replica

## Create a replica

The CLI creates a [replica] of the database in a specified [location] with
`turso db replicate`. The following creates a replica in Tokyo, Japan using its
three-letter location code from the output of `turso db locations`:

```bash
turso db replicate my-db nrt
```

This generates output similar to the following:

```
Replicated database my-db to Tokyo, Japan (nrt) in 8 seconds.

To see information about the database my-db, run:

	turso db show my-db

To see a connection URL directly to the new replica, run:

	turso db show my-db --instance-url [name-of-replica]
```

## Find the replica

To work with the replica directly, you must know its unique name. The CLI
randomly generates one for it at the time it was created. You can find the names
of all the replicas using the the following command:

```bash
turso db show my-db
```

The output is similar to this:

```
Name:           my-db
URL:            libsql://my-db-[my-github-name].turso.io
ID:             [UUID]
Locations:      nrt, [location]
Size:           0 B

Database Instances:
NAME                  TYPE        LOCATION
premium-triathlon     primary     [location]
sweeping-ultragirl    replica     nrt
```

On the last line, you can see the replica in the location "nrt" in this case is
named "sweeping-ultragirl".

## Query the replica

You can query the instance directly using the shell. Copy the name of the
replica from the output above into the following command as the last argument:

```
turso db shell my-db --instance [NAME-OF-INSTANCE]
```

Now you can query the contents of the replica like you did previously:

```
→  select * from users;
ID   EMAIL
001  test@foo.com

→  .quit
```

## Destroy the replica

Run the following command to destroy the replica, copying it name into the
command as the last argument:

```bash
turso db destroy my-db --instance [NAME-OF-REPLICA]
```
```
Destroyed instance sweeping-ultragirl of database my-db.
```

Notes about destroying replicas:

- You can destroy all of the replicas in a location using the `--location` flag
  (except the primary if in that location).
- Destroying a replica will not change any database data.


[replica]: /concepts#replica
[location]: /concepts#location

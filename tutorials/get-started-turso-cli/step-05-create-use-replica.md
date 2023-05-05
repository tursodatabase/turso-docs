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
Replicated database my-db to Tokyo, Japan (nrt) in [xx] seconds.

URL:

   libsql://[random-string]-my-db-[my-github-name].turso.io

You can start an interactive SQL shell with:

   turso db shell libsql://[random string]-my-db-[my-github-name].turso.io
```

## Query the replica

The above output gives a suggestion for running the Turso CLI shell against the
replica. Copy that command and run it to start the shell. The replica should
contain the same table and row that you previously added to the primary:

```
→  select * from users;
ID   EMAIL
001  test@foo.com

→  .quit
```

Some things to note about replicas:

- It is possible to create replicas in any supported location, including the
  location of the primary.
- Creating more than one replica in a location is currently required for scaling
  out support in that location. Automatic scaling based on current load is
  something we hope to implement in the future.
- The URL specific to the replica should only be used in situations where you
  know you want to query that one replica directly. Most applications should
  instead use the logical database URL for automatic location routing for the
  lowest latency for read operations.

## Destroy the replica

To destroy the replica, you must know its unique name. The CLI randomly
generated one for it at the time it was created. You can find the names of all
the replicas using the the following command:

```bash
turso db show my-db
```

The output is similar to this:

```
Name:       my-db
URL:        libsql://my-db-[my-github-name].turso.io
ID:         [UUID]
Locations:  nrt, [location]

Database Instances:
NAME                TYPE        LOCATION     VERSION     URL
Key-dazzler         primary     [location]   0.7.0       libsql://[random-string]-my-db-[my-github-name].turso.io
sweeping-ultragirl  replica     nrt          0.7.0       libsql://[random-string]-my-db-[my-github-name].turso.io
```

On the last line, you can see the replica in the location "nrt" in this case is
named "sweeping-ultragirl". Use this command to destroy it (replacing the name
of the replica with your own):

```bash
turso db destroy my-db --instance sweeping-ultragirl
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

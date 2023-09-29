---
description: Create a database replica and query it using the Turso CLI.
keywords:
  - turso
  - cli
  - tutorial
  - replicate
---

# Step 5: Replicate the database to another location

:::note

In step 3, you created a database in a [placement group] named "default" with a
primary [location] near you. The placement group defines the set of locations
where the database is replicated. When you create additional databases in this
group it will also exist in the same set of locations, all hosted by the same
hardware at those locations.

:::

## Replicate a database by adding a location to its placement group

You can add and remove replica locations easily with the Turso CLI. Adding a
location to a placement group automatically replicates all of the databases in
that group to the new location. Adding replica locations reduces latency for
database queries that originate in places near those locations. This is why
Turso is referred to as an "edge" database - you can better serve users who are
geographically distributed by placing copies of data closer to them.

Add a new location in Tokyo, Japan (nrt) to your "default" group with the
following command:

```bash
turso group locations add default nrt
```

## Understand billing for placement groups

Adding a location to a placement group incurs the cost of one "database" for the
purpose of billing. On the free starter plan, you have an allowance of three
databases to use for creating multiple placement groups or adding replica
locations to a group. Right now, your "default" placement group costs two
"databases": one for the primary location near you, and one for the replica
location in Tokyo.

If you add a new logical database to this placement group, it will **not** incur
the cost of another database for billing. All of the databases in a placement
group are hosted together on the same hardware.

## Viewing replica information

You can see the list of locations for the "default" placement group:

```bash
turso group locations list default
```

You can also see the list of locations for a specific logical database using the
`show` command you used earlier:

```bash
turso db show my-db
```

```console {6,11-12}
Name:           my-db
URL:            libsql://my-db-[my-github-name].turso.io
ID:             [UUID]
Group:          default
Version:        [version]
Locations:      [location], nrt
Size:           8.2 kB

Database Instances:
NAME     TYPE        LOCATION
[loc]    primary     [loc]
nrt      replica     nrt
```


[placement group]: /concepts#placement-group
[location]: /concepts#location

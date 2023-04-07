---
description: Concepts for understanding how Turso works, including location, logical database, primary, and replica instances.
keywords:
  - turso
  - concepts
  - database
  - logical
  - instance
  - primary
  - replica
---

# Concepts

In order to better understand how Turso works, please read through the following
concepts that are used throughout this documentation.

## Location

Turso databases are deployed using Fly.io, which allows Turso to host database
instances in [26 locations around the world], each identified with a three
letter code. When creating a database with [replicas](#replica), you should
consider which locations best support the code running any queries. In general,
the physical distance between the code and the database determines the latency,
so it's recommended to benchmark your location options for better performance.

When you create a Turso database with the [Turso CLI], it will automatically
choose a location based on the physical location of the machine where you run
the `turso db create` command. The default can be overridden on the command
line.

## Logical database

A logical database is a collection of libSQL [instances](#instance) with one
[primary](#primary) and zero or more [replicas](#replica). Running the `turso db
create` command creates a new logical database with a primary instance.

<!-- TODO: diagram of a logical database with a primary and replicas -->

## Instance

A database instance is an installation of libSQL running on a single machine
that is part of a logical database. All instances contain data related only to
that database, and automatically participate in replication of that data between
the instances. There are two types of instances: [primary](#primary) and
[replica](#replica).

### Primary

The primary instance of a logical database is the main source of data for the
database. Once allocated to a location, it cannot be moved. All changes to the
database are handled by the primary. Client applications may connect directly to
the primary for read and write operations.

### Replica

A replica of a logical database contains a copy of the data from the primary and
is kept in sync as changes are made over time. Client applications may connect
directly to a replica for read and write operations, but any writes are
automatically forwarded to the primary. As such, read operations have minimized
latency, but write operations must make another hop to the primary. The primary
will then push that change to all replicas. The replicas provide snapshot
isolation for read transactions.


[26 locations around the world]: https://fly.io/docs/reference/regions/
[Turso CLI]: /reference/turso-cli

---
description: Description of the free Starter Plan limits during the Turso public beta.
keywords:
  - turso
  - beta
  - starter
  - limit
---

# Beta limits

During the public beta, Turso's Starter Plan is available. This plan is free
forever, and includes the following:

## 3 database instances

You may have up to 3 database [instances]. These instances can be different
[logical databases], or include additional [replicas] within a single logical
database.

## 8 GiB storage total

You may use up to 8 GiB among all of your databases. This usage can be
[inspected using the Turso CLI] per logical database.

## 1 billion rows read per month

You may read up to 1 billion rows per month. This usage can be
[inspected using the Turso CLI] per logical database.


[instances]: ./concepts#instance
[logical databases]: ./concepts#logical-database
[replicas]: ./concepts#replica
[inspected using the Turso CLI]: /reference/turso-cli#inspect-database-usage

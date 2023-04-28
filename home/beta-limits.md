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

## 10 GiB data transferred per month

You may transfer up to 10 GiB of data, including ingress and egress from all
sources that connect to any database instance. This includes the [Turso CLI],
the [client SDKs], and any other direct connections you manage.


[instances]: ./concepts#instance
[logical databases]: ./concepts#logical-database
[replicas]: ./concepts#replica
[inspected using the Turso CLI]: /reference/turso-cli#inspect-database-usage
[Turso CLI]: /reference/turso-cli
[client SDKs]: /reference/client-access/

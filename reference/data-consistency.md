---
description: Description of Turso data consistency guarantees for connections to a primary instance and its replicas.
keywords:
  - turso
  - technical
  - reference
  - consistency
  - connection
  - transaction
  - isolation
---

# Data consistency

Turso is built on top of [libSQL], which is a fork of [SQLite]. SQLite, as an
embedded database, offers a strictly serializable consistency model. However,
libSQL, as a network-accessible and replicated database provided by [sqld], can
not offer such a strong guarantee.

## Connections

There are two types of connections involved with libSQL:

- The HTTP or websocket connection a client makes to a sqld instance.
- The underlying [SQLite database connection] established within sqld.

For the purpose of this documentation, a SQLite database connection is referred
to as a *process*, which issues an ordered sequence of queries with results.
Each database operation exposed by sqld (execute a statement, [batch], or
[interactive transaction]) is executed within a dedicated process, isolated from
all other processes running concurrently.

## Read and write behavior

### On the primary instance

All operations by processes connected to the [primary] are linearizable, forming
a ordered sequence of completed operations (a history).

#### All writes are serialized

All write operations are fully serialized on the primary. When a transaction
performs a write operation, all other write operations must wait for the
transaction to complete in order to preserve this serialization.

:::warning

Take care when using an [interactive transaction] that perform a write
operation. Since writes are fully serialized on the primary, a long-running or
abandoned transaction will block all writes from other processes until libSQL
aborts the transaction after a 5 second timeout.

:::

### On the replicas

#### Writes are forwarded to the primary

All writes from a process connected to a [replica] are automatically forwarded
to the primary and applied there. Changes to the primary are eventually pulled
from each replica and made available locally. A process is guaranteed to see all
writes that happened on the primary up until (at least) the last write performed
by the process. There are no hard guarantees on how long it will take for a
replica to observe a change from the primary, considering network latency and
availability, and total load on the primary.

#### Reads are local and not globally ordered

All reads by a process come from the locally replicated database. Peer replicas
are not necessarily all in sync with each other. Reads from different replicas
can yield different data until each replica receives the latest changes from the
primary. Furthermore, concurrent reads on a replica may observe snapshots of
data from different points in time.

### Monotonic reads

All database instances offer monotonic reads. A read operation will never appear
to yield data older than a prior read on the same instance.

## Transactional consistency

A sqld transaction ([batch] or [interactive transaction]) is equivalent to a
[SQLite transaction] and observes its semantics.

During a transaction:

- All reads operations are guaranteed snapshot isolation. A transactional read
  will never yield changes from other processes.

- All write operations performed by a process are immediately visible to itself
  in a subsequent read operation. The writes are isolated from all other ongoing
  transactions. As such, libSQL transactions are considered serializable.


[libSQL]: https://libsql.org
[SQLite]: https://sqlite.org
[sqld]: https://github.com/libsql/sqld/
[SQLite database connection]: https://www.sqlite.org/c3ref/open.html
[libSQL url]: ./libsql-urls
[replica]: /concepts#replica
[primary]: /concepts#primary
[SQLite transaction]: https://www.sqlite.org/lang_transaction.html
[batch]: /libsql/client-access#batches
[interactive transaction]: /libsql/client-access#interactive-transactions

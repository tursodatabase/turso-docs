---
description: pg_turso is a Postgres plugin that enables you to replicate data to Turso.
keywords:
  - turso
  - database
  - postgres
  - pg_turso
  - replication
---

# Integration with Postgres

If you have an existing Postgres database and want to replicate some portion of
it to Turso, you can do that using the [pg_turso] Postgres plugin. pg_turso
allows you to configure specific tables and materialized views for replication.

:::caution

pg_turso is currently experimental and not yet ready for production use.

:::

To work with pg_turso, you must:

- Build the plugin from source.
- Install the plugin using `CREATE EXTENSION`
- Choose tables and materialized views to replicate
- Choose a frequency at which updates are pushed to Turso
- Invoke a provided function to begin scheduling

Data replicated to Turso must be considered read-only for database clients.
Writes to Turso replicas are not reflected back into Postgres.


[pg_turso]: https://github.com/turso-extended/pg_turso/

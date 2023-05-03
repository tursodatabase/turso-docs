---
description: List of third party developer tools that support Turso and libSQL, including ORMs and migration utilities.
keywords:
  - turso
  - database
  - ORM
  - migration
  - tools
  - utilities
  - libsql
  - sqlite
---

# Third party developer tools

There are a number of tools supported by third party organizations that work
with Turso and libSQL.

- [ORMs](#orms)
- [Query builders](#query-builders)
- [Compatibility libraries](#compatibility-libraries)

If you're interested in adding libSQL support to your own tool, please reach out
to us to coordinate.

## ORMs

### Drizzle ORM

[Drizzle ORM] is a TypeScript ORM for SQL databases designed with maximum type
safety in mind. Drizzle supports libSQL, with an complete example that shows how
to build a Hono server that:

- Declares a Drizzle schema for tables
- Uses a Zod validator with the schema to handle incoming JSON
- Uses the schema make queries with a type-safe, fluent API
- Switch seamlessly between SQLite local file and Turso remote database

[Go to the example for libSQL on the Drizzle GitHub.][drizzle-libsql-example]

## Query builders

### Kysely {#kysely}

[Kysely] is a type-safe and autocompletion-friendly TypeScript SQL query builder.
libSQL provides a plugin (dialect) that allows you to take full advantage of the
features of Kysely.

[Go to the Kysely libSQL dialect repo on GitHub.][kysely-libsql]

### Knex.js {#knex-js}

[Knex.js] is a "batteries included" SQL query builder for a variety of
databases, designed to be flexible, portable, and fun to use. It supports use of
libSQL sqld instances in the same way that it supports local SQLite files by
swapping the sqlite3 module with [libsql-node-sqlite3](#libsql-node-sqlite3).

[Go to example code in the libsql-node-sqlite3 README.][libsql-node-sqlite3-knex]

## Compatibility libraries

### libsql-node-sqlite3 (node-sqlite3 replacement) {#libsql-node-sqlite3}

The [sqlite3 node module] is commonly used to access SQLite database files.
libSQL provides a drop-in replacement module for this that exposes the same API,
accessing a libSQL sqld instance instead. This replacement module can also be
used with [Knex.js](#knex-js).

[Go to the libsql-node-sqlite3 repo on GitHub.][libsql-node-sqlite3]


[Drizzle ORM]: https://github.com/drizzle-team/drizzle-orm#readme
[drizzle-libsql-example]: https://github.com/drizzle-team/drizzle-orm/tree/main/examples/libsql#readme
[Kysely]: https://github.com/kysely-org/kysely#readme
[kysely-libsql]: https://github.com/libsql/kysely-libsql#readme
[sqlite3 node module]: https://github.com/TryGhost/node-sqlite3#readme
[libsql-node-sqlite3]: https://github.com/libsql/libsql-node-sqlite3#readme
[Knex.js]: https://knexjs.org/
[libsql-node-sqlite3-knex]: https://github.com/libsql/libsql-node-sqlite3#usage-with-knex

---
description: Documentation for Turso, an edge-hosted, distributed database based on libSQL, an open-source and open-contribution fork of SQLite.
keywords:
  - turso
  - database
  - documentation
  - libsql
  - sqlite
---

# Turso documentation

## About Turso

[Turso] is an edge-hosted, distributed database based on [libSQL], an
open-source and open-contribution fork of [SQLite]. It was designed to minimize
query latency for applications where queries come from anywhere in the world. In
particular, it works well with edge functions provided by cloud platforms such
as CloudFlare, Netlify, and Vercel, by putting your data geographically close to
the code that accesses it.

## Getting started

- [Install and learn to use the Turso CLI]
- [Access Turso using the libSQL client libraries]
- Follow along with Turso [tutorials]

## Learn more about Turso

Watch this video presentation to learn more about the origin of Turso and
libSQL, and the problems they were designed to solve. This presentation was
given to collegiate level web development students, but is accessible to a wider
audience.

<iframe width="560" height="315" src="https://www.youtube.com/embed/ANuraQJTc7c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


[Turso]: https://turso.tech/
[libSQL]: https://github.com/libsql/libsql#readme
[SQLite]: https://sqlite.org/
[Install and learn to use the Turso CLI]: /tutorials/get-started-turso-cli
[Access Turso using the libSQL client libraries]: /libsql/client-access
[tutorials]: /tutorials/

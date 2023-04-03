# Turso documentation

## About Turso

[Turso] is an edge-hosted, distributed database based on [libSQL], an
open-source and open-contribution fork of [SQLite]. It was designed to minimize
query latency for applications where queries come from anywhere in the world. In
particular, it works well with edge functions provided by cloud platforms such
as CloudFlare, Netlify, and Vercel, by putting your data geographically close to
the code that accesses it.

## Recommended reading

To learn about Turso quickly, we suggest the following path through this
documentation:

- Understand the [concepts] behind Turso.
- Follow a [walkthrough of the Turso CLI] to experience how it works.
- Learn how to access Turso using the [libSQL client libraries].


[Turso]: https://chiselstrike.com/
[libSQL]: https://libsql.org/
[SQLite]: https://sqlite.org/
[concepts]: /concepts
[walkthrough of the Turso CLI]: /tutorials/get-started-turso-cli
[libSQL client libraries]: /reference/client-access

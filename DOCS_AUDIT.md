# Turso Docs Audit — Outdated & Misleading Content

Tracked issues found during a full audit of the documentation.
Goal: Turso is a full rewrite of SQLite (not a fork), provides the highest density of databases in the industry with no need for servers or connectivity. Turso Cloud runs libSQL and provides SQLite over the wire for direct query and sync, but no longer any replication.

---

## 1. libSQL called a "fork of SQLite" — it's now a full rewrite

- [x] `libsql.mdx:6` — "Turso is a distributed database built on libSQL, a fork of SQLite"
- [x] `libsql.mdx:10` — "libSQL is a fork of SQLite that aims to be a modern database..."
- [x] `libsql.mdx:28` — Section heading: "Why fork SQLite?"
- [x] `libsql.mdx:32` — "committed to keeping libSQL free and open-source, as well rejoining core SQLite if their policy changes"
- [x] `libsql.mdx:44-46` — "libSQL will remain SQLite compatible by providing the same API and file format" — Turso no longer uses the SQLite file format
- [x] `libsql.mdx:52` — "integrating them directly into the fork of SQLite"
- [x] `libsql.mdx:10` — "designed to be a drop-in replacement for SQLite"
- [ ] `data-and-connections.mdx:6` — "Turso, an extension of libSQL (a SQLite fork)"
- [ ] `introduction.mdx:40` — "The next evolution of SQLite" — better than "fork" but still frames Turso as derivative
- [ ] `turso-cloud.mdx:3,13` — "Your fully managed SQLite-compatible database platform"

The entire `libsql.mdx` page needs a rewrite. The "Why fork SQLite?" framing is historical.

## 2. Edge / replication language still pervasive

- [ ] `features/data-edge.mdx` (entire file) — Deprecated but still fully documented with API examples and CLI commands. Still linked from nav (`docs.json:126`).
- [ ] `features/embedded-replicas/introduction.mdx:6` — "without needing to relying on Turso's edge network" — links to deprecated data-edge page
- [ ] `quickstart.mdx:17` — "create replicas in other regions" — replication is deprecated, yet this is in the first quickstart step
- [ ] `cli/group/locations/add.mdx:6` — "You can replicate databases globally by adding locations to a group" — no deprecation warning
- [ ] `cli/group/locations/remove.mdx:14` — "All database replicas belonging to the provided group will be immediately removed" — no deprecation warning
- [ ] `features/scale-to-zero.mdx:7` — mentions "Existing free users will be moved from Fly to AWS"
- [ ] `turso-cloud.mdx:39` — Feature card: "Replication & Sync" — "Replication" reinforces the old edge model

## 3. Fly.io location codes and infrastructure references

- [ ] `api-reference/openapi.json:883-1171` — Full list of Fly.io location codes (`iad`, `lhr`, `nrt`, `sin`, `ams`, `fra`, etc.) in the OpenAPI schema
- [ ] `features/embedded-replicas/with-fly.mdx` (entire file) — Full Fly.io deployment guide
- [ ] `features/embedded-replicas/introduction.mdx:226-230` — Cards linking to Fly.io deployment guide
- [ ] `features/scale-to-zero.mdx:7` — "moved from Fly to AWS"

## 4. "Distributed database" and server-centric framing

- [ ] `libsql.mdx:6` — "Turso is a distributed database"
- [ ] `libsql.mdx:10` — "focus on low query latency and high availability" — HA was the edge story
- [ ] `libsql.mdx:10` — "scales globally with Turso over HTTP" — implies old global replication
- [ ] `libsql.mdx:38` — "Turso manages the distribution of libSQL instances"
- [ ] `libsql.mdx:40` — "you don't need to worry about managing libSQL instances, or configuring replication"
- [ ] `data-and-connections.mdx:6` — "modifies the consistency model due to its network-accessible and replicated nature"
- [ ] `local-development.mdx:9` — "managed libSQL server" — server-centric framing
- [ ] `local-development.mdx:45` — "Works with non-serverless based Turso SDKs" — outdated SDK terminology

## 5. Turso Cloud description doesn't reflect current positioning

- [ ] `turso-cloud.mdx:13` — "provides the performance and reliability of SQLite with the convenience and scalability of a modern cloud database service"
- [ ] `turso-cloud.mdx:199` — "Learn how to manage, distribute and integrate your databases"
- [ ] `quickstart.mdx:57` — "create your first database in a location closest to you"
- [ ] `quickstart.mdx:63` — "The Turso CLI automatically detected your closest region to create a database"

## 6. Embedded Replicas vs. new Sync — potential confusion

- [ ] `features/embedded-replicas/introduction.mdx` (entire file) — Describes old libSQL-based sync (frame-based, WAL shipping). New Turso Database has a different sync model (`push`/`pull` in `sync/usage.mdx`). Presented as if they're the same thing.
- [ ] `sync/usage.mdx:9` — "uses the Turso Cloud to sync" — relationship between this page and embedded-replicas page is unclear
- [ ] Multiple SDK files — every SDK quickstart has "Sync (Embedded Replicas only)" using old `syncUrl`/`.sync()` API. Newer `push()`/`pull()` API not mentioned in SDK docs.

## 7. Missing "Turso Database" identity in key pages

- [ ] `introduction.mdx` — Card title says "Turso Database (Embedded)" — "embedded" alone doesn't convey the density/no-server/no-connectivity story
- [ ] `tursodb/quickstart.mdx` — Very bare, just `tursodb` CLI with in-memory database. No mention of density story, no comparison with SQLite, no explanation of what makes it different.

## 8. Stale cross-references and broken links

- [ ] `features/data-edge.mdx:39` — Links to `/api-reference/groups/add-location` — page does not exist
- [ ] `features/data-edge.mdx:56` — Links to `/api-reference/groups/remove-location` — page does not exist
- [ ] `features/embedded-replicas/with-fly.mdx:7` — Image alt text says "Koyeb banner" but it's the Fly.io page

## 9. README.md tagline mismatch

- [ ] `README.md` — Says "Databases for multi-tenant AI Apps" — different from docs landing page ("The small database to power your big dreams in the age of AI"). Neither mentions what Turso actually is.

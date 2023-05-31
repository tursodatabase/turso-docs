---
description: Technical reference for the SQLite extensions supported by Turso
keywords:
  - turso
  - database
  - extensions
  - sqlite
  - reference
---

# SQLite extensions

:::caution

SQLite extensions are an experimental feature in Turso. Your observations and
feedback are welcome on our Discord.

:::

SQLite extensions add optional features, supported by the SQLite community, that
can be used in queries handled by the SQLite query engine. The instances of sqld
managed by Turso can be configured to enable a select few extensions.

## Enabling extensions

Extensions are enabled using the `--enable-extensions` flag when creating a
database with the [Turso CLI]. For example:

```bash
$ turso db create my-db --enable-extensions
```

Extensions can't be enabled for existing databases.

## List of extensions

The following extensions are loaded into sqld for databases that have extensions
enabled.

| Extension | Purpose |
| --- | --- |
| [SQLean Crypto] | Hashing, message digest, encoding, and decoding |
| [SQLean Fuzzy] | Fuzzy string matching and phonetics |
| [SQLean Math] | Advanced mathematical calculations |
| [SQLean Stats] | Common statistical functions |
| [SQLean Text] | String manipulation (reverse, split) |
| [SQLean Unicode] | Case-insensitive string comparison for Unicode strings |
| [SQLean UUID] | Limited support for RFC 4122 compliant UUIDs |
| [Vector Similarity Search] | Vector search capabilities based on [Faiss]. |

:::note

SQLite maintains three official extensions that are enabled by default in Turso:
[JSON], [FTS5] (full text search), and [R*Tree] (range queries).

:::

[Turso CLI]: /reference/turso-cli
[SQLean Crypto]: https://github.com/nalgeon/sqlean/blob/main/docs/crypto.md
[SQLean Fuzzy]: https://github.com/nalgeon/sqlean/blob/main/docs/fuzzy.md
[SQLean Math]: https://github.com/nalgeon/sqlean/blob/main/docs/math.md
[SQLean Stats]: https://github.com/nalgeon/sqlean/blob/main/docs/stats.md
[SQLean Text]: https://github.com/nalgeon/sqlean/blob/main/docs/text.md
[SQLean Unicode]: https://github.com/nalgeon/sqlean/blob/main/docs/unicode.md
[SQLean UUID]: https://github.com/nalgeon/sqlean/blob/main/docs/uuid.md
[Vector Similarity Search]: https://github.com/asg017/sqlite-vss
[Faiss]: https://faiss.ai/
[JSON]: https://www.sqlite.org/json1.html
[FTS5]: https://www.sqlite.org/fts5.html
[R*Tree]: https://www.sqlite.org/rtree.html

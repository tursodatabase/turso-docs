# Agent guidelines for turso-docs

## The SQL reference is GENERATED — never hand-edit it here

`sql-reference/**` and the SQL/CLI Reference navigation in `docs.json` are **generated
artifacts**. They are produced by `scripts/sync-sql-reference.py`, which copies the
canonical docs from the `turso` submodule:

```
turso/docs/sql-reference/**   ->   sql-reference/**   (+ auto-generated docs.json nav)
```

The sync also rewrites internal links (`/docs/sql-reference/` → `/sql-reference/`),
strips `{#heading-id}` anchors, and escapes bare `<` for MDX.

**Do not edit `sql-reference/**` or the generated `docs.json` groups directly in this
repo.** Any manual change here is overwritten the next time the sync runs.

### To change the SQL reference

1. Make the change upstream in **`turso/docs/sql-reference/**`** (the `turso` repo) and
   open a PR there. Use the `/docs/sql-reference/...` link convention in that repo.
2. Once merged, bump the `turso` submodule and run the sync to bring it here:
   ```bash
   git submodule update --remote turso
   python3 scripts/sync-sql-reference.py
   ```
3. Nav ordering for these pages lives in `scripts/sync-sql-reference.py`
   (`STATEMENTS_ORDER`, `FUNCTIONS_ORDER`, etc.). New upstream pages that aren't listed
   there are appended alphabetically — add them to the relevant ORDER list if a specific
   position is wanted. That script IS a real file in this repo and may be edited here.

If you found a way to improve the SQL reference docs, the fix goes to `turso` first, not
here.

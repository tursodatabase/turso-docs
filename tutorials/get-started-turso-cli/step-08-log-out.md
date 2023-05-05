---
description: Log out of the Turso CLI.
keywords:
  - turso
  - cli
  - tutorial
  - authentication
  - logout
---

# Step 8: Log out of the CLI

To log out, use the following command:

```bash
turso auth logout
```

This removes the persisted authentication token you received from the last
invocation of `turso auth signup` or `turso auth login`. To continue working
with any databases you created previously, run `turso auth login` using the same
GitHub account.

---
description: Sign up for Turso with the Turso CLI.
keywords:
  - turso
  - cli
  - tutorial
  - authentication
  - signup
  - login
---

# Step 2: Sign up for Turso

A GitHub account is required to sign up using the Turso CLI. Start the process
with the following command:

```bash
turso auth signup
```

The CLI launches your default browser and asks to log in with GitHub. The first
time you log in, you are asked to grant the GitHub Turso app some permissions to
your account. Accept this in order to continue. (If desired, you can revoke
those permissions later in the GitHub settings for your account.)

After the login process completes, the CLI receives a token that identifies you,
and stores it in a local file.  On macOS, the file is located in
`$HOME/Library/Application Support/turso`. On Linux, it’s `$HOME/.config/turso`.
Some things to note about this token:

- Do not share this token with anyone you don’t trust fully, as they can use it
  to work with Turso on your behalf.
- The token is passed along with all backend API requests made by the CLI while
  logged in.
- You can print it using the command `turso auth token`.
- It expires after 7 days. After that, you must log in again with `turso auth
  login`.

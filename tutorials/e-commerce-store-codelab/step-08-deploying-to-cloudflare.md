---
description: Deploying an e-commerce app built with Remix, Drizzle, and Turso to Cloudflare Workers
keywords:
  - deploy
  - turso
  - drizzle
  - remix
  - cloudflare
  - workers
  - e-commerce
---

# Step 8: Deploying the app to Cloudflare Workers

After having built our Mug Store app, we can then proceed to the next step which
is making it accessible to users.

Our app already has the necessary Cloudflare Worker configuration for deployment
set. This was done automatically while the Remix project was being scaffolded.
We can make modifications to things such as the app name by making changes
inside the `wrangler.toml` file. Here is the [guiding documentation] to
understand the configurations that can be set inside this file.

After everything is set up, run the following command to deploy the Mug Store
e-commerce store to Cloudflare Workers.

```sh
npm run deploy
```

When the command runs successfully, you should see a log output close to the
following.

```
Uploading 19 new assets...
Uploaded 100% [19 out of 19]
↗️  Done syncing assets
Your worker has access to the following bindings:
- Vars:
  - TURSO_DB_URL: "..."
  - ITEMS_PER_PAGE: 20
Total Upload: 2545.15 KiB / gzip: 618.44 KiB
Uploaded the-mug-store (25.54 sec)
Published the-mug-store (1.79 sec)
  <https://the-mug-store.infra-43f.workers.dev>
Current Deployment ID: 4341d6a9-008e-4113-bc4c-653fc24a3456
```

You can then visit the published url shown in the log above to see a live demo
of the e-commerce store.

For more information on the stack choice used in this tutorial you can visit the
following links:

- [Remix]
- [Turso]
- [Cloudflare Workers]
- [Drizzle]

[guiding documentation]: https://developers.cloudflare.com/workers/wrangler/configuration/
[Remix]: https://remix.run/docs/en/1.18.1
[Turso]: https://turso.tech/
[Cloudflare Workers]: https://workers.cloudflare.com/
[Drizzle]: https://orm.drizzle.team/

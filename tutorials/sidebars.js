/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  sidebar: [
    {
      type: "doc",
      label: "Tutorials introduction",
      id: "index",
    },
    {
      type: "category",
      label: "Turso CLI walkthrough",
      link: {
        type: "doc",
        id: "get-started-turso-cli/index",
      },
      items: [
        "get-started-turso-cli/step-01-installation",
        "get-started-turso-cli/step-02-sign-up",
        "get-started-turso-cli/step-03-create-database",
        "get-started-turso-cli/step-04-make-queries-with-shell",
        "get-started-turso-cli/step-05-create-use-replica",
        "get-started-turso-cli/step-06-inspect-database-usage",
        "get-started-turso-cli/step-07-destroy-logical-database",
        "get-started-turso-cli/step-08-log-out",
        "get-started-turso-cli/step-09-update-cli",
        "get-started-turso-cli/turso-cli-review",
      ],
    },
    {
      type: "doc",
      label: "Netlify setup guide",
      id: "netlify-setup-guide/index",
    },
    {
      type: "doc",
      label: "Vercel setup guide",
      id: "vercel-setup-guide/index",
    },
    {
      type: "link",
      label: "Using CloudFlare Workers and TypeScript",
      href: "https://developers.cloudflare.com/workers/tutorials/connect-to-turso-using-workers/",
    },
  ],
};

module.exports = sidebars;

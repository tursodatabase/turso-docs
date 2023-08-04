/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  sidebar: [
    {
      type: 'doc',
      label: 'Tutorials introduction',
      id: 'index',
    },
    {
      type: 'category',
      label: 'Turso CLI walkthrough',
      link: {
        type: 'doc',
        id: 'get-started-turso-cli/index',
      },
      items: [
        'get-started-turso-cli/step-01-installation',
        'get-started-turso-cli/step-02-sign-up',
        'get-started-turso-cli/step-03-create-database',
        'get-started-turso-cli/step-04-make-queries-with-shell',
        'get-started-turso-cli/step-05-create-use-replica',
        'get-started-turso-cli/step-06-inspect-database-usage',
        'get-started-turso-cli/step-07-destroy-logical-database',
        'get-started-turso-cli/step-08-log-out',
        'get-started-turso-cli/turso-cli-review',
      ],
    },
    {
      type: 'doc',
      id: 'netlify-setup-guide/index',
    },
    {
      type: 'doc',
      id: 'vercel-setup-guide/index',
    },
    {
      type: 'doc',
      id: 'fermyon-spin-rust-setup-guide/index',
    },
    {
      type: 'category',
      label: 'E-commerce store with Remix, Drizzle & Turso',
      link: {
        type: 'doc',
        id: 'e-commerce-store-codelab/index',
      },
      items: [
        'e-commerce-store-codelab/step-01-setting-up-the-project',
        'e-commerce-store-codelab/step-02-setting-up-turso',
        'e-commerce-store-codelab/step-03-configuring-drizzle',
        'e-commerce-store-codelab/step-04-listing-products',
        'e-commerce-store-codelab/step-05-user-authentication',
        'e-commerce-store-codelab/step-06-shopping-cart',
        'e-commerce-store-codelab/step-07-checking-out',
        'e-commerce-store-codelab/step-08-deploying-to-cloudflare',
      ],
    },
    {
      type: 'link',
      label: 'Using CloudFlare Workers and TypeScript',
      href: 'https://developers.cloudflare.com/workers/tutorials/connect-to-turso-using-workers/',
    },
    {
      type: 'link',
      label: 'Example apps and more',
      href: 'https://github.com/turso-extended/',
    },
  ],
};

module.exports = sidebars;

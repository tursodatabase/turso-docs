/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  sidebar: [
    {
      type: 'doc',
      label: 'Introduction',
      id: 'index',
    },
    {
      type: 'category',
      label: 'Getting Started',
      link: {
        type: 'doc',
        id: 'get-started-turso-cli/index',
      },
      items: [
        'get-started-turso-cli/step-01-installation',
        'get-started-turso-cli/step-02-sign-up',
        'get-started-turso-cli/step-03-create-database',
        'get-started-turso-cli/step-04-make-queries-with-shell',
        'get-started-turso-cli/step-05-replicate-database-another-location',
        'get-started-turso-cli/step-06-inspect-database-usage',
        'get-started-turso-cli/step-07-destroy-logical-database',
        'get-started-turso-cli/step-08-log-out',
        'get-started-turso-cli/turso-cli-review',
      ],
    },
    {
      type: 'doc',
      label: 'Concepts',
      id: 'concepts',
    },
    {
      type: 'doc',
      label: 'Billing details',
      id: 'billing-details',
    },
    {
      type: 'doc',
      label: '3p dev tools',
      id: '3p-dev-tools',
    },
    {
      type: 'link',
      label: 'Tutorials',
      href: '/tutorials/'
    },
    {
      type: 'link',
      label: 'Turso reference',
      href: '/reference/'
    },
    {
      type: 'link',
      label: 'libSQL reference',
      href: '/libsql/'
    },
  ],
};

module.exports = sidebars;

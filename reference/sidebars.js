/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  sidebar: [
    {
      type: 'doc',
      label: 'Reference introduction',
      id: 'index',
    },
    'turso-cli',
    'libsql-urls',
    'local-development',
    'extensions',
    'data-consistency',
    {
      type: 'category',
      label: 'Client access',
      collapsed: false,
      link: {
        type: 'doc',
        id: 'client-access/index',
      },
      items: [
        'client-access/javascript-typescript-sdk',
        'client-access/rust-sdk',
        'client-access/python-sdk',
      ]
    },
  ],
};

module.exports = sidebars;

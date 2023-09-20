/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  sidebar: [
    {
      type: 'doc',
      label: 'libSQL introduction',
      id: 'index',
    },
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
        'client-access/go-sdk',
      ]
    },
  ],
};

module.exports = sidebars;

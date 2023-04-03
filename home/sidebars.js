/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  sidebar: [
    {
      type: 'doc',
      label: 'Introduction',
      id: 'index',
    },
    {
      type: 'doc',
      label: 'Concepts',
      id: 'concepts',
    },
    {
      type: 'doc',
      label: 'Beta limits',
      id: 'beta-limits',
    },
    {
      type: 'link',
      label: 'Tutorials',
      href: '/tutorials/'
    },
    {
      type: 'link',
      label: 'Reference',
      href: '/reference/'
    },
  ],
};

module.exports = sidebars;

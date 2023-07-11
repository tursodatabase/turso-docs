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
      label: 'Reference',
      href: '/reference/'
    },
  ],
};

module.exports = sidebars;

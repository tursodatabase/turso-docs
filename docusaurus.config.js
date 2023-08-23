// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/plugin-content-docs').Options} */
const homePluginOptions = {
  id: 'home',
  path: 'home',
  routeBasePath: '/',
  sidebarPath: require.resolve('./home/sidebars.js'),
}

/** @type {import('@docusaurus/plugin-content-docs').Options} */
const tutorialsPluginOptions = {
  id: 'tutorials',
  path: 'tutorials',
  routeBasePath: 'tutorials',
  sidebarPath: require.resolve('./tutorials/sidebars.js'),
}

/** @type {import('@docusaurus/plugin-content-docs').Options} */
const referencePluginOptions = {
  id: 'reference',
  path: 'reference',
  routeBasePath: 'reference',
  sidebarPath: require.resolve('./reference/sidebars.js'),
}

/** @type {import('@docusaurus/theme-common').UserThemeConfig} */
const themeConfig = {
  // Replace with your project's social card
  // image: 'img/docusaurus-social-card.jpg',
  navbar: {
    title: 'Turso docs',
    logo: {
      alt: 'Turso logo',
      src: 'img/turso.png',
    },
    items: [
      {
        type: 'doc',
        docsPluginId: 'home',
        docId: 'index',
        label: 'Home',
        position: 'left',
      },
      {
        type: 'doc',
        docsPluginId: 'tutorials',
        docId: 'index',
        label: 'Tutorials',
        position: 'left',
      },
      {
        type: 'doc',
        docsPluginId: 'reference',
        docId: 'index',
        label: 'Reference',
        position: 'left',
      },
      {
        href: 'https://turso.tech',
        label: 'Website',
        position: 'right',
      },
      {
        href: 'https://turso.tech/app',
        label: 'Dashboard',
        position: 'right',
      },
    ],
  },

  footer: {
    style: 'dark',
    logo: {
      alt: 'Turso logo',
      src: 'img/turso-by-chiselstrike.svg',
    },
    links: [
      {
        title: 'Turso: SQLite for the Edge',
        items: [
          {
            html: `
              <a href="https://api.turso.io/?website=true" target="_blank" rel="noreferrer noopener" aria-label="Turso Sign Up">
                <div class="footer__button signUp">
                  <p>Sign Up</p>
                  <svg width="16" height="16" viewBox="0 0 18 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M17.0303 6.28033C17.3232 5.98744 17.3232 5.51256 17.0303 5.21967L12.2574 0.4467C11.9645 0.153807 11.4896 0.153807 11.1967 0.4467C10.9038 0.739593 10.9038 1.21447 11.1967 1.50736L15.4393 5.75L11.1967 9.99264C10.9038 10.2855 10.9038 10.7604 11.1967 11.0533C11.4896 11.3462 11.9645 11.3462 12.2574 11.0533L17.0303 6.28033ZM0.5 6.5L16.5 6.5L16.5 5L0.5 5L0.5 6.5Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </a>
            `,
          },
          {
            html: `
              <a href="https://github.com/libsql/libsql" target="_blank" rel="noreferrer noopener" aria-label="LibSQL Github repo">
                <div class="footer__button github">
                  <p>Star Our Repo</p>
                  <svg width="16" height="16" viewBox="0 0 18 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M17.0303 6.28033C17.3232 5.98744 17.3232 5.51256 17.0303 5.21967L12.2574 0.4467C11.9645 0.153807 11.4896 0.153807 11.1967 0.4467C10.9038 0.739593 10.9038 1.21447 11.1967 1.50736L15.4393 5.75L11.1967 9.99264C10.9038 10.2855 10.9038 10.7604 11.1967 11.0533C11.4896 11.3462 11.9645 11.3462 12.2574 11.0533L17.0303 6.28033ZM0.5 6.5L16.5 6.5L16.5 5L0.5 5L0.5 6.5Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <!-- tracking pixel -->
                <img style="display: block" referrerpolicy="no-referrer-when-downgrade" src="https://static.scarf.sh/a.png?x-pxid=8c62883f-5506-4b33-8006-ea2cfbfd4523" />
              </a>
            `,
          },
        ]
      },
      {
        title: 'Company',
        items: [
          {
            label: 'About',
            href: 'https://turso.tech/about-us',
          },
          {
            label: 'Investors',
            href: 'https://turso.tech/investors',
          },
          {
            label: 'Blog',
            href: 'https://blog.turso.tech',
          },
        ],
      },
      {
        title: 'Community',
        items: [
          // {
          //   label: 'Stack Overflow',
          //   href: 'https://stackoverflow.com/questions/tagged/turso',
          // },
          {
            label: 'Turso Discord',
            href: 'https://discord.com/invite/4B5D7hYwub',
          },
          {
            label: 'libSQL Discord',
            href: 'https://discord.gg/TxwbQTWHSr',
          },
          {
            label: 'Follow us on Twitter',
            href: 'https://twitter.com/tursodatabase',
          },
          {
            label: 'Schedule a Zoom',
            href: 'https://calendly.com/d/gt7-bfd-83n/meet-with-chiselstrike',
          },
        ],
      },
      {
        title: 'Open Source',
        items: [
          {
            label: 'Turso GitHub',
            href: 'https://github.com/tursodatabase/',
          },
          {
            label: 'Turso extended GitHub',
            href: 'https://github.com/turso-extended/',
          },
          {
            label: 'libSQL GitHub',
            href: 'https://github.com/libsql/',
          },
        ],
      },
      {
        title: 'Legal',
        items: [
          {
            label: 'Privacy Policy',
            href: 'https://turso.tech/privacy-policy',
          },
          {
            label: 'Terms of Use',
            href: 'https://turso.tech/terms-of-use',
          },
        ],
      },
    ],
    copyright: `Copyright © ${new Date().getFullYear()} ChiselStrike, Inc. Built with Docusaurus.`,
  },

  prism: {
    // @ts-ignore
    theme: lightCodeTheme,
    // @ts-ignore
    darkTheme: darkCodeTheme,
    additionalLanguages: ['rust', 'toml'],
  },

  colorMode: {
    defaultMode: 'dark',
    respectPrefersColorScheme: true,
  },

  algolia: {
    // The application ID provided by Algolia
    appId: 'EEBD8P3V4D',
    // Public API key: it is safe to commit it
    apiKey: 'da17bdeb96dabdb6db1643b86f907595',
    indexName: 'turso',
  }
};

/** @type {import('@docusaurus/theme-classic').Options} */
const themeOptions = {
  customCss: require.resolve('./src/css/custom.css'),
}

/** @type {import('@docusaurus/plugin-google-gtag').Options} */
const gtagOptions = {
  trackingID: 'G-YMMQC402S1',
}

/** @type {import('@docusaurus/plugin-sitemap').Options} */
const sitemapOptions = {
  // @ts-ignore
  changefreq: 'daily',
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Turso',
  tagline: 'The edge database based on libSQL',
  favicon: 'img/favicon.ico',
  themes: ['@docusaurus/theme-search-algolia'],

  // Set the production url of your site here
  url: 'https://docs.turso.tech',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  // organizationName: 'facebook', // Usually your GitHub org/user name.
  // projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  themeConfig: themeConfig,

  plugins: [
    [ 'content-docs', homePluginOptions ],
    [ 'content-docs', tutorialsPluginOptions ],
    [ 'content-docs', referencePluginOptions ],
    [ '@docusaurus/theme-classic', themeOptions ],
    // [ '@docusaurus/plugin-client-redirects', redirectOptions ],
    // [ '@docusaurus/plugin-google-analytics', gaOptions ],
    [ '@docusaurus/plugin-google-gtag', gtagOptions ],
    [ '@docusaurus/plugin-sitemap', sitemapOptions ],
  ],
};

module.exports = config;

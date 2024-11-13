import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const userName = 'zaneuuuu';
const projectName = 'learning-notes';
const websiteTitle = 'Learning Notes';
const websiteDesc = 'This is a repository for my learning notes.';

const config: Config = {
  title: `${websiteTitle}`,
  tagline: `${websiteDesc}`,
  favicon: 'https://github.githubassets.com/favicons/favicon.png',

  url: `https://${userName}.github.io`,
  baseUrl: `/${projectName}/`,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: `${userName}`, // Usually your GitHub org/user name.
  projectName: `/${projectName}/`, // Usually your repo name.
  deploymentBranch: 'gh-pages', // The name of the branch to deploy the static files to.
  githubHost: 'github.com', // Useful if you are using GitHub Enterprise.
  githubPort: '22', // The port of your server. Useful if you are using GitHub Enterprise.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  onDuplicateRoutes: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/zaneuuuu/learning-notes/blob/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/zaneuuuu/learning-notes/blob/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    docs: {
      sidebar: {
        hideable: true,
      },
    },
    image: 'img/social-card.jpg',
    navbar: {
      title: `${websiteTitle}`,
      logo: { alt: `${websiteTitle}`, src: 'https://github.githubassets.com/assets/apple-touch-icon-144x144-b882e354c005.png' },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docusaurusTutorial',
          position: 'left',
          label: 'Docusaurus',
        },
        {
          type: 'docSidebar',
          sidebarId: 'others',
          position: 'left',
          label: 'Others',
        },
        {
          to: '/blog',
          position: 'left',
          label: 'Blog',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Docusaurus',
              href: 'https://docusaurus.io/docs',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: `https://github.com/${userName}/${projectName}`,
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ${userName}. Built with <a href='https://docusaurus.io' >Docusaurus</a>.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    }
  } satisfies Preset.ThemeConfig,
};

export default config;

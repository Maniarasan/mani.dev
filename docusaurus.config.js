// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config
import { themes as prismThemes } from "prism-react-renderer";
// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)
/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Mani.dev",
  tagline: "Software Engineering Knowledge Base",
  favicon: "img/favicon.ico",
  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },
  // Set the production url of your site here
  url: "https://maniarasan.github.io/",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/mani.dev/",
  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "Maniarasan", // Usually your GitHub org/user name.
  projectName: "mani.dev", // Usually your repo name.
  onBrokenLinks: "throw",
  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/Maniarasan/mani.dev/tree/main/",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/Maniarasan/mani.dev/tree/main/",
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: "Mani.dev",
        logo: {
          alt: "Mani.dev Logo",
          src: "img/logo.svg",
        },
        items: [
          { to: "/", label: "Home", position: "left" },
          { to: "/docs/ai/ai-trends-2025", label: "Docs", position: "left" },
          { to: "/blog", label: "Blog", position: "left" },
          { to: "/about", label: "About Me", position: "left" },
          {
            href: "https://github.com/Maniarasan/mani.dev",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Content",
            items: [
              {
                label: "Documentation",
                to: "/docs/ai/ai-trends-2025",
              },
              {
                label: "Blog",
                to: "/blog",
              },
              {
                label: "About Me",
                to: "/about",
              },
            ],
          },
          {
            title: "Connect",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/Maniarasan",
              },
              {
                label: "LinkedIn",
                href: "https://www.linkedin.com/in/maniarasan-sivaseran-09494553/",
              },
            ],
          },
          {
            title: "Resources",
            items: [
              {
                label: "Repository",
                href: "https://github.com/Maniarasan/mani.dev",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Maniarasan Sivaseran. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};
export default config;

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/index',
        'getting-started/demo-application',
        'getting-started/upgrade-guide',
      ],
    },
    {
      type: 'category',
      label: 'Installation',
      items: [
        'installation/server-side-setup',
        'installation/client-side-setup',
      ],
    },
    {
      type: 'category',
      label: 'Core Concepts',
      items: [
        'core-concepts/who-is-it-for',
        'core-concepts/how-it-works',
        'core-concepts/the-protocol',
      ],
    },
    {
      type: 'category',
      label: 'The Basics',
      items: [
        'the-basics/pages',
        'the-basics/responses',
        'the-basics/redirects',
        'the-basics/routing',
        'the-basics/title-and-meta',
        'the-basics/links',
        'the-basics/manual-visits',
        'the-basics/forms',
        'the-basics/file-uploads',
        'the-basics/validation',
        'the-basics/shared-data',
      ],
    },
    {
      type: 'category',
      label: 'Advanced',
      items: [
        'advanced/events',
        'advanced/testing',
        'advanced/partial-reloads',
        'advanced/scroll-management',
        'advanced/authentication',
        'advanced/authorization',
        'advanced/csrf-protection',
        'advanced/error-handling',
        'advanced/asset-versioning',
        'advanced/progress-indicators',
        'advanced/remembering-state',
        'advanced/server-side-rendering',
      ],
    },
  ],
};

module.exports = sidebars;

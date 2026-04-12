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
        'the-basics/view-transitions',
      ],
    },
    {
      type: 'category',
      label: 'Data & Props',
      items: [
        'data-props/shared-data',
        'data-props/flash-data',
        'data-props/partial-reloads',
        'data-props/deferred-props',
        'data-props/merging-props',
        'data-props/once-props',
        'data-props/polling',
        'data-props/prefetching',
        'data-props/load-when-visible',
        'data-props/infinite-scroll',
        'data-props/remembering-state',
      ],
    },
    {
      type: 'category',
      label: 'Security',
      items: [
        'security/authentication',
        'security/authorization',
        'security/csrf-protection',
        'security/history-encryption',
      ],
    },
    {
      type: 'category',
      label: 'Advanced',
      items: [
        'advanced/asset-versioning',
        'advanced/code-splitting',
        'advanced/error-handling',
        'advanced/events',
        'advanced/progress-indicators',
        'advanced/scroll-management',
        'advanced/server-side-rendering',
        'advanced/testing',
        'advanced/typescript',
      ],
    },
  ],
};

module.exports = sidebars;

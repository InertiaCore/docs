// Ported from docusaurus/sidebars-v1.js. Slugs are relative to
// src/content/docs/ and point at the symlinked v1/ tree.
const base = "docs/v1";

export const sidebarV1 = [
  {
    label: "Getting Started",
    items: [
      { label: "Introduction", slug: `${base}/getting-started` },
      { label: "Demo Application", slug: `${base}/getting-started/demo-application` },
      { label: "Upgrade Guide", slug: `${base}/getting-started/upgrade-guide` },
      { label: "Recommended Middleware", slug: `${base}/getting-started/recommended-middleware` },
      { label: "Vite Helper", slug: `${base}/getting-started/vite-helper` },
    ],
  },
  {
    label: "Installation",
    items: [
      { label: "Server-side Setup", slug: `${base}/installation/server-side-setup` },
      { label: "Client-side Setup", slug: `${base}/installation/client-side-setup` },
    ],
  },
  {
    label: "Core Concepts",
    items: [
      { label: "Who is it for", slug: `${base}/core-concepts/who-is-it-for` },
      { label: "How it works", slug: `${base}/core-concepts/how-it-works` },
      { label: "The Protocol", slug: `${base}/core-concepts/the-protocol` },
    ],
  },
  {
    label: "The Basics",
    items: [
      "pages",
      "responses",
      "redirects",
      "routing",
      "title-and-meta",
      "links",
      "manual-visits",
      "forms",
      "file-uploads",
      "validation",
      "shared-data",
    ].map((s) => ({ slug: `${base}/the-basics/${s}` })),
  },
  {
    label: "Advanced",
    items: [
      "events",
      "testing",
      "partial-reloads",
      "scroll-management",
      "authentication",
      "authorization",
      "csrf-protection",
      "error-handling",
      "asset-versioning",
      "progress-indicators",
      "remembering-state",
      "server-side-rendering",
    ].map((s) => ({ slug: `${base}/advanced/${s}` })),
  },
];

const base = "v3";

export const sidebarV3 = [
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
    items: ["server-side-setup", "client-side-setup"].map((s) => ({
      slug: `${base}/installation/${s}`,
    })),
  },
  {
    label: "Core Concepts",
    items: ["who-is-it-for", "how-it-works", "the-protocol"].map((s) => ({
      slug: `${base}/core-concepts/${s}`,
    })),
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
      "instant-visits",
      "forms",
      "http-requests",
      "optimistic-updates",
      "file-uploads",
      "validation",
      "layouts",
      "view-transitions",
    ].map((s) => ({ slug: `${base}/the-basics/${s}` })),
  },
  {
    label: "Data & Props",
    items: [
      "shared-data",
      "flash-data",
      "partial-reloads",
      "deferred-props",
      "merging-props",
      "once-props",
      "polling",
      "prefetching",
      "load-when-visible",
      "infinite-scroll",
      "remembering-state",
    ].map((s) => ({ slug: `${base}/data-props/${s}` })),
  },
  {
    label: "Security",
    items: [
      "authentication",
      "authorization",
      "csrf-protection",
      "history-encryption",
    ].map((s) => ({ slug: `${base}/security/${s}` })),
  },
  {
    label: "Advanced",
    items: [
      "asset-versioning",
      "code-splitting",
      "error-handling",
      "events",
      "progress-indicators",
      "scroll-management",
      "server-side-rendering",
      "testing",
      "typescript",
    ].map((s) => ({ slug: `${base}/advanced/${s}` })),
  },
];

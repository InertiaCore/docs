import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";
import path from "node:path";
import starlight from "@astrojs/starlight";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import { injectMdxImports } from "./src/remark/inject-mdx-imports.mjs";
import { rewriteCodeGroup } from "./src/remark/rewrite-code-group.mjs";
import { rewriteAsides } from "./src/remark/rewrite-asides.mjs";
import { prependBaseToLinks } from "./src/remark/prepend-base-to-links.mjs";
import { sidebarV1 } from "./src/sidebars/v1.mjs";
import { sidebarV2 } from "./src/sidebars/v2.mjs";
import { sidebarV3 } from "./src/sidebars/v3.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const docsRoot = path.resolve(here, "..");
const snippetsDir = path.resolve(docsRoot, "snippets");
const mintlifyShim = path.resolve(here, "src/components/mintlify-compat.jsx");

// Names the shim re-exports (both its own components and re-exported
// Starlight primitives). Every .mdx file gets these injected globally,
// except when the file already imports a binding with the same name.
//
// Intentionally NOT in this list:
//   - CodeGroup → rewritten to a div tree by rewriteCodeGroup
//   - Warning/Note/Info/Tip → rewritten to <Aside type="..."> by rewriteAsides
const GLOBAL_MDX_NAMES = [
  "Card",
  "Aside",
  "Columns",
  "Steps",
  "Step",
  "Frame",
  "ParamField",
  "Badge",
  "ClientSpecific",
  "VueSpecific",
  "Vue2Specific",
  "Vue3Specific",
  "ReactSpecific",
  "SvelteSpecific",
  "Svelte4Specific",
  "Svelte5Specific",
  "CurrentCodeTab",
];

// Mirror of docusaurus/src/loaders/snippet-loader.js — snippet .jsx files
// omit React hook imports and assume a browser `localStorage`. Inject both
// so the originals work without modification.
function snippetLoaderPlugin() {
  return {
    name: "inertia-snippet-loader",
    enforce: "pre",
    transform(code, id) {
      if (!id.includes(`${path.sep}snippets${path.sep}`)) return null;
      if (!/\.jsx?$/.test(id)) return null;
      const preamble =
        `import React, { useState, useCallback, useEffect } from "react";\n` +
        `const _ls = typeof window !== "undefined" ? window.localStorage : { getItem: () => null, setItem: () => {} };\n`;
      const safe = code.replace(/\blocalStorage\b/g, "_ls");
      return { code: preamble + safe, map: null };
    },
  };
}

export default defineConfig({
  site: "https://inertiajs.com",
  base: "/docs",
  // Emit build output under dist/docs/ so the on-disk layout mirrors
  // the URL layout. The docs worker is mounted at /docs/* via service
  // binding — a request for /docs/v3/... resolves to dist/docs/v3/...
  // without the worker having to rewrite paths.
  outDir: "./dist/docs",
  // The root splash page lives in a separate repo; this build only owns
  // /docs/*. Redirect the bare /docs entry point to the latest version's
  // intro page so wandering links land somewhere useful.
  redirects: {
    "/": "/docs/v3/getting-started/",
  },
  markdown: {
    remarkPlugins: [
      // Element rewrites must run BEFORE injectMdxImports — they replace
      // the original tag names so the import injector knows it doesn't
      // need to provide bindings for the originals.
      rewriteCodeGroup,
      rewriteAsides,
      prependBaseToLinks,
      [
        injectMdxImports,
        {
          imports: [{ source: mintlifyShim, names: GLOBAL_MDX_NAMES }],
        },
      ],
    ],
  },
  integrations: [
    react(),
    starlight({
      title: "Inertia.js Documentation",
      favicon: "/favicon.svg",
      head: [
        // Pre-paint: read the saved framework and set it on <html> so
        // CSS attribute selectors (e.g. initial tab highlight) apply
        // before the main sync script runs, avoiding a framework flash.
        {
          tag: "script",
          content:
            "try{var v=localStorage.getItem('code');if(v)document.documentElement.dataset.framework=v.replace(/^\"|\"$/g,'');}catch(e){}",
        },
        // Deferred sync script: wires up tab clicks + hides non-matching
        // framework wrappers. Module script ensures it's deferred and
        // runs once per navigation.
        {
          tag: "script",
          attrs: { type: "module", src: "/docs/framework-switcher.js" },
        },
      ],
      expressiveCode: {
        // Paired dark/light themes — auto-switches with Starlight's theme toggle.
        themes: ["github-dark-default", "github-light-default"],
        styleOverrides: {
          borderRadius: "0.5rem",
          codeFontSize: "0.875rem",
          codePaddingBlock: "0.875rem",
          frames: {
            shadowColor: "transparent",
          },
        },
        shiki: {
          // The v2/v3 content uses ```cshtml fences; Shiki bundles razor
          // (which handles .cshtml files) but not the alias.
          langAlias: { cshtml: "razor" },
        },
      },
      logo: {
        light: "./src/assets/logo-light.svg",
        dark: "./src/assets/logo-dark.svg",
        replacesTitle: true,
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/inertiacore",
        },
      ],
      components: {
        Head: "./src/components/Head.astro",
        SiteTitle: "./src/components/SiteTitleWithVersion.astro",
        Sidebar: "./src/components/VersionedSidebar.astro",
        PageTitle: "./src/components/PageTitleWithMarkdownActions.astro",
        Search: "./src/components/VersionedSearch.astro",
      },
      customCss: ["./src/styles/custom.css"],
      sidebar: [
        { label: "v3.x", collapsed: true, items: sidebarV3 },
        { label: "v2.x", collapsed: true, items: sidebarV2 },
        { label: "v1.x", collapsed: true, items: sidebarV1 },
      ],
    }),
    mdx(),
    // markdownSource() integration removed — replaced by the
    // src/pages/docs/[...slug].md.ts endpoint, which works in dev too.
  ],
  vite: {
    plugins: [snippetLoaderPlugin()],
    resolve: {
      // Alias array form: exact-file regexes redirect the framework-specific
      // snippet files to the local shim (which outputs div + data-framework-only
      // attributes), while `/snippets` still maps to the shared dir for
      // everything else (v1-eol-warning.mdx, v2-upgrade-warning.mdx, etc.).
      alias: [
        {
          find: /^\/snippets\/(vue|vue2|vue3|react|svelte|svelte4|svelte5|client)-specific\.jsx$/,
          replacement: mintlifyShim,
        },
        {
          find: /^\/snippets\/current-code-tab\.jsx$/,
          replacement: mintlifyShim,
        },
        { find: "/snippets", replacement: snippetsDir },
      ],
    },
    server: { fs: { allow: [docsRoot] } },
  },
});

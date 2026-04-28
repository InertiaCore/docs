import { visit } from "unist-util-visit";

// MDX files use absolute slugs like `/v3/core-concepts/the-protocol` for
// cross-page links, and absolute public-asset paths like `/images/foo.png`.
// With Astro's `base: "/docs"`, those would 404 — the real URLs live under
// `/docs/...`. Rewrite any link/image URL rooted at a known top-level
// segment to prepend the base.
const REWRITE_PREFIX = /^\/(v\d+|images|mp4|assets|fonts)(\/|$|#)/;

export function prependBaseToLinks() {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type !== "link" && node.type !== "image") return;
      const url = node.url;
      if (typeof url !== "string") return;
      if (REWRITE_PREFIX.test(url)) {
        node.url = "/docs" + url;
      }
    });
  };
}

import { visit } from "unist-util-visit";

// MDX files use absolute slugs like `/v3/core-concepts/the-protocol` for
// cross-page links. With Astro's `base: "/docs"`, those would 404 — the
// real URL is `/docs/v3/...`. Rewrite any link/image URL that starts with
// a version segment to prepend the base.
const VERSION_PREFIX = /^\/v\d+(\/|$|#)/;

export function prependBaseToLinks() {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type !== "link" && node.type !== "image") return;
      const url = node.url;
      if (typeof url !== "string") return;
      if (VERSION_PREFIX.test(url)) {
        node.url = "/docs" + url;
      }
    });
  };
}

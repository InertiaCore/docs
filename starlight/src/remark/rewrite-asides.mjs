import { visit } from "unist-util-visit";

/**
 * Remark plugin that rewrites Mintlify-style admonition tags into
 * Starlight's native <Aside> component. The original wrappers were
 * React shims that re-built the aside markup by hand and silently
 * dropped Starlight's icon SVGs — using <Aside> directly gets the
 * icons, ARIA semantics, and any future styling for free.
 *
 * Mappings:
 *   <Warning>  →  <Aside type="caution">
 *   <Note>     →  <Aside type="note">
 *   <Info>     →  <Aside type="note">    // Mintlify "info" ≈ Starlight "note"
 *   <Tip>      →  <Aside type="tip">
 *
 * Children pass through unchanged. The rewrite runs before
 * injectMdxImports so the resulting <Aside> tag picks up its global
 * import from the shim re-export.
 */
const ASIDE_TYPES = {
  Warning: "caution",
  Note: "note",
  Info: "note",
  Tip: "tip",
};

export function rewriteAsides() {
  return function transformer(tree) {
    visit(tree, "mdxJsxFlowElement", (node) => {
      const type = ASIDE_TYPES[node.name];
      if (!type) return;
      node.name = "Aside";
      node.attributes = [
        { type: "mdxJsxAttribute", name: "type", value: type },
      ];
    });
  };
}

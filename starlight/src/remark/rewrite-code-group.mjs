import { visit } from "unist-util-visit";
import { FRAMEWORK_ICONS } from "./framework-icons.mjs";

/**
 * Remark plugin that replaces <CodeGroup>...</CodeGroup> in MDX with a
 * framework-aware tab widget. Each fenced code block inside becomes a
 * panel tagged with `data-framework="<label>"`, and tab buttons above
 * the code drive a single `document.documentElement.dataset.framework`
 * value — so every CodeGroup (and every framework-specific wrapper)
 * on the page stays in sync.
 *
 * Why at the AST level rather than a React component? Astro's
 * expressive-code renders code fences as Astro virtual components, so
 * a React CodeGroup can't peek at its children's props to extract the
 * language/metastring. Transforming before expressive-code runs lets
 * us read `node.lang` and `node.meta` directly.
 *
 * The tab label is pulled from the fence metastring, with any
 * `icon="..."` attribute stripped, falling back to the language name:
 *     ```vue Vue 3 icon="vuejs"   =>  label "Vue 3", icon "vuejs"
 *     ```jsx React icon="react"   =>  label "React", icon "react"
 *
 * Non-first panels are emitted with `hidden` set at build time so the
 * no-JS fallback shows only the first block — the client switcher then
 * toggles `hidden` on subsequent user selections.
 */

function attr(name, value) {
  return { type: "mdxJsxAttribute", name, value };
}

// Labels in this list are pulled to the front of every CodeGroup,
// preserving relative order among themselves and among the rest. Lets
// us promote `.NET` over `Laravel` (the upstream Inertia.js content's
// default) without rewriting any .mdx file.
const PROMOTE_TO_FIRST = ["Razor (.NET)", ".NET"];

function reorderForPromotion(items, labelOf) {
  const promoted = [];
  const rest = [];
  for (const item of items) {
    if (PROMOTE_TO_FIRST.includes(labelOf(item))) {
      promoted.push(item);
    } else {
      rest.push(item);
    }
  }
  return [...promoted, ...rest];
}

function parseFence(node, index) {
  const raw = node.meta || "";
  const iconMatch = raw.match(/icon="([^"]*)"/);
  const icon = iconMatch ? iconMatch[1] : null;
  const label = raw.replace(/\s*icon="[^"]*"/g, "").trim() || node.lang || `Tab ${index + 1}`;
  return { label, icon };
}

export function rewriteCodeGroup() {
  return function transformer(tree) {
    visit(tree, "mdxJsxFlowElement", (node, index, parent) => {
      if (!parent || node.name !== "CodeGroup") return;

      const rawCodes = node.children.filter((c) => c.type === "code");
      if (rawCodes.length === 0) return;

      // Pair each code node with its parsed metadata BEFORE reordering
      // so the two arrays can't drift out of sync, then sort to promote
      // any preferred labels (e.g. .NET) to the front.
      const paired = rawCodes.map((code, i) => ({ code, ...parseFence(code, i) }));
      const ordered = reorderForPromotion(paired, (p) => p.label);
      const codes = ordered.map((p) => p.code);
      const fences = ordered.map(({ label, icon }) => ({ label, icon }));

      const tabButtons = fences.map(({ label, icon }, i) => {
        const children = [];
        const svg = icon && FRAMEWORK_ICONS[icon];
        if (svg) {
          // Raw HTML node — Astro's MDX pipeline passes these through as
          // unescaped HTML, which lets us inline the SVG without building
          // an mdxJsxFlowElement tree for every path/circle.
          children.push({ type: "html", value: svg });
        }
        children.push({ type: "text", value: label });
        return {
          type: "mdxJsxFlowElement",
          name: "button",
          attributes: [
            attr("type", "button"),
            attr("class", `code-group__tab${i === 0 ? " is-active" : ""}`),
            attr("data-framework", label),
          ],
          children,
        };
      });

      const panels = codes.map((code, i) => {
        const attrs = [
          attr("class", "code-group__panel"),
          attr("data-framework", fences[i].label),
        ];
        // Hide non-first panels at build time — no-JS fallback shows the
        // first; the switcher script re-assigns `hidden` on click. mdast
        // renders an attribute with `value: null` as a bare boolean attr.
        if (i !== 0) attrs.push({ type: "mdxJsxAttribute", name: "hidden", value: null });
        return {
          type: "mdxJsxFlowElement",
          name: "div",
          attributes: attrs,
          children: [code],
        };
      });

      const wrapper = {
        type: "mdxJsxFlowElement",
        name: "div",
        attributes: [
          attr("class", "code-group"),
          attr("data-code-group", ""),
          attr("data-frameworks", fences.map((f) => f.label).join("|")),
        ],
        children: [
          {
            type: "mdxJsxFlowElement",
            name: "div",
            attributes: [attr("class", "code-group__tabs")],
            children: tabButtons,
          },
          {
            type: "mdxJsxFlowElement",
            name: "div",
            attributes: [attr("class", "code-group__panels")],
            children: panels,
          },
        ],
      };

      parent.children.splice(index, 1, wrapper);
      return index + 1;
    });
  };
}

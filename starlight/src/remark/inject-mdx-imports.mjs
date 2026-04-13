import { parse as parseJs } from "acorn";

/**
 * Remark plugin: inject a set of named imports into every .mdx file, but
 * skip any identifier that is already imported by the file. This is the
 * piece that `astro-auto-import` gets wrong for our setup — the Mintlify
 * content sometimes imports `<ClientSpecific>` explicitly from a snippet,
 * and sometimes relies on it being globally available, and a naive
 * injection causes "identifier already declared" errors on the former.
 *
 * @param {{ imports: Array<{ source: string, names: string[] }> }} options
 */
export function injectMdxImports({ imports }) {
  return function transformer(tree, vfile) {
    if (!vfile.basename?.endsWith(".mdx")) return;

    // Collect identifiers that are already bound by existing imports in
    // this file. We only look at top-level mdxjsEsm nodes.
    const existing = new Set();
    for (const child of tree.children) {
      if (child.type !== "mdxjsEsm") continue;
      const program = child.data?.estree;
      if (!program) continue;
      for (const node of program.body) {
        if (node.type !== "ImportDeclaration") continue;
        for (const spec of node.specifiers) {
          // ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier
          if (spec.local?.name) existing.add(spec.local.name);
        }
      }
    }

    // Build the list of imports to inject, skipping already-bound names.
    const statements = [];
    for (const { source, names } of imports) {
      const needed = names.filter((n) => !existing.has(n));
      if (needed.length === 0) continue;
      statements.push(
        `import { ${needed.join(", ")} } from ${JSON.stringify(source)};`,
      );
    }
    if (statements.length === 0) return;

    const js = statements.join("\n");
    tree.children.unshift({
      type: "mdxjsEsm",
      value: "",
      data: {
        estree: {
          ...parseJs(js, { ecmaVersion: "latest", sourceType: "module" }),
          type: "Program",
          sourceType: "module",
        },
      },
    });
  };
}

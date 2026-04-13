import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs/promises";
import fssync from "node:fs";

/**
 * Astro integration that mirrors docusaurus.config.js's postBuild hook:
 * for every .mdx file under v1/, v2/, v3/, write a cleaned .md file next
 * to its built HTML so the "View as Markdown" / "Copy Page as Markdown"
 * actions can fetch it at runtime.
 *
 * Cleaning rules (same as Docusaurus version):
 *   - Strip YAML frontmatter
 *   - Remove MDX import statements
 *   - Remove custom React/MDX components (JSX tags)
 *   - Trim leading blank lines
 */

function cleanMarkdown(content) {
  let out = content.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
  out = out.replace(/^import\s+.*?from\s+['"].*?['"];?\s*$/gm, "");
  out = out.replace(/<[A-Z][a-zA-Z]*[\s\S]*?(?:\/>|<\/[A-Z][a-zA-Z]*>)/g, "");
  out = out.replace(/^\s*\n/, "");
  return out;
}

function walk(dir, baseDir = dir, out = []) {
  for (const entry of fssync.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, baseDir, out);
    else if (/\.(md|mdx)$/.test(entry.name)) out.push(path.relative(baseDir, full));
  }
  return out;
}

export function markdownSource({ docsRoot, versions }) {
  return {
    name: "inertia-markdown-source",
    hooks: {
      "astro:build:done": async ({ dir, logger }) => {
        const outDir = fileURLToPath(dir);
        let total = 0;

        for (const { src, route } of versions) {
          const srcDir = path.resolve(docsRoot, src);
          if (!fssync.existsSync(srcDir)) continue;

          for (const rel of walk(srcDir)) {
            const srcPath = path.join(srcDir, rel);
            const mdName = rel.replace(/\.mdx$/, ".md");
            const baseName = mdName.replace(/\.md$/, "");
            const destDirect = path.join(outDir, route, mdName);
            const destIndex = path.join(outDir, route, baseName, "index.md");

            try {
              const raw = await fs.readFile(srcPath, "utf8");
              const cleaned = cleanMarkdown(raw);
              await fs.mkdir(path.dirname(destDirect), { recursive: true });
              await fs.writeFile(destDirect, cleaned, "utf8");
              await fs.mkdir(path.dirname(destIndex), { recursive: true });
              await fs.writeFile(destIndex, cleaned, "utf8");
              total++;
            } catch (err) {
              logger.warn(`[markdown-source] ${src}/${rel}: ${err.message}`);
            }
          }
        }
        logger.info(`emitted ${total} markdown source files`);
      },
    },
  };
}

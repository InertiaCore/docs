import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";

// Endpoint for `View as Markdown` / `Copy Page as Markdown`. Hit any
// docs page URL with `.md` appended (drop the trailing slash) and you
// get the cleaned markdown source for that page:
//
//   /docs/v2/installation/server-side-setup/  →  page
//   /docs/v2/installation/server-side-setup.md →  cleaned markdown
//
// In `astro dev` the endpoint runs on demand. In `astro build` it
// pre-renders to dist/docs/.../server-side-setup.md alongside the HTML,
// which is what Cloudflare serves to the markdown actions dropdown.

function cleanMarkdown(content: string): string {
  let out = content.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
  out = out.replace(/^import\s+.*?from\s+['"].*?['"];?\s*$/gm, "");
  out = out.replace(/<[A-Z][a-zA-Z]*[\s\S]*?(?:\/>|<\/[A-Z][a-zA-Z]*>)/g, "");
  out = out.replace(/^\s*\n/, "");
  return out;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const entries = await getCollection("docs");
  return entries
    .filter((entry) => /^docs\/v\d+\//.test(entry.id))
    .map((entry) => ({
      // Strip the leading `docs/` from the collection id — the file
      // sits inside `src/pages/docs/`, so the slug param is the
      // remainder of the URL between `/docs/` and `.md`.
      params: { slug: entry.id.replace(/^docs\//, "") },
      props: { entry },
    }));
};

export const GET: APIRoute = ({ props }) => {
  const entry = (props as { entry: { body?: string } }).entry;
  return new Response(cleanMarkdown(entry.body ?? ""), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
};

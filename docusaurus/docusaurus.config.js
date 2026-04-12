const path = require("path");
const docsRoot = path.resolve(__dirname, "..");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Inertia.js Documentation",
  favicon: "favicon.svg",

  url: "https://inertiajs.com",
  baseUrl: "/",

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  markdown: {
    preprocessor: ({ filePath, fileContent }) => {
      // Use pathname:// protocol for absolute image paths so Docusaurus
      // skips local file resolution (assets are copied via webpack plugin).
      let out = fileContent.replace(
        /!\[([^\]]*)\]\((\/[^)]+)\)/g,
        "![$1](pathname://$2)",
      );
      // Rewrite legacy version links to their new /docs/N.x routes.
      out = out.replace(/\]\(\/v1\//g, "](/docs/1.x/");
      out = out.replace(/\]\(\/v2\//g, "](/docs/2.x/");
      out = out.replace(/\]\(\/v3\//g, "](/docs/3.x/");
      return out;
    },
  },

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: path.resolve(docsRoot, "v2"),
          routeBasePath: "docs/2.x",
          sidebarPath: "./sidebars-v2.js",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  staticDirectories: [],

  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "v1",
        path: path.resolve(docsRoot, "v1"),
        routeBasePath: "docs/1.x",
        sidebarPath: "./sidebars-v1.js",
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "v3",
        path: path.resolve(docsRoot, "v3"),
        routeBasePath: "docs/3.x",
        sidebarPath: "./sidebars-v3.js",
      },
    ],
    "docusaurus-markdown-source-plugin",
    "docusaurus-lunr-search",
    function customPlugins() {
      return {
        name: "custom-plugins",
        configureWebpack() {
          const CopyPlugin = require("copy-webpack-plugin");
          return {
            resolve: {
              alias: {
                "/snippets": path.resolve(docsRoot, "snippets"),
              },
            },
            module: {
              rules: [
                {
                  test: /[\\/]snippets[\\/].*\.jsx$/,
                  enforce: "pre",
                  loader: path.resolve(
                    __dirname,
                    "src/loaders/snippet-loader.js",
                  ),
                },
              ],
            },
            plugins: [
              new CopyPlugin({
                patterns: [
                  { from: "favicon.svg", to: ".", context: docsRoot },
                  { from: "logo", to: "logo", context: docsRoot },
                  { from: "images", to: "images", context: docsRoot },
                  { from: "assets", to: "assets", context: docsRoot },
                  { from: "mp4", to: "mp4", context: docsRoot },
                  { from: "fonts", to: "fonts", context: docsRoot },
                  { from: "_headers", to: ".", context: __dirname },
                ],
              }),
            ],
          };
        },
        // Copy cleaned markdown source files to build output so the
        // "View as Markdown" / "Copy Page as Markdown" buttons work.
        // The docusaurus-markdown-source-plugin only scans a hardcoded
        // `docs/` directory, so we handle our v1/ and v2/ dirs here.
        async postBuild({ outDir }) {
          const fs = require("fs-extra");

          function cleanMarkdown(content) {
            // Strip YAML front matter
            content = content.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
            // Remove MDX import statements
            content = content.replace(
              /^import\s+.*?from\s+['"].*?['"];?\s*$/gm,
              "",
            );
            // Remove custom React/MDX components (self-closing and paired)
            content = content.replace(
              /<[A-Z][a-zA-Z]*[\s\S]*?(?:\/>|<\/[A-Z][a-zA-Z]*>)/g,
              "",
            );
            // Remove leading blank lines
            content = content.replace(/^\s*\n/, "");
            return content;
          }

          function findMdxFiles(dir, fileList = [], baseDir = dir) {
            for (const file of fs.readdirSync(dir)) {
              const filePath = path.join(dir, file);
              if (fs.statSync(filePath).isDirectory()) {
                findMdxFiles(filePath, fileList, baseDir);
              } else if (file.endsWith(".mdx") || file.endsWith(".md")) {
                fileList.push(path.relative(baseDir, filePath));
              }
            }
            return fileList;
          }

          const versions = [
            { src: "v1", route: "docs/1.x" },
            { src: "v2", route: "docs/2.x" },
            { src: "v3", route: "docs/3.x" },
          ];
          let total = 0;

          for (const { src, route } of versions) {
            const srcDir = path.resolve(docsRoot, src);
            if (!fs.existsSync(srcDir)) continue;

            for (const relFile of findMdxFiles(srcDir)) {
              const srcPath = path.join(srcDir, relFile);
              const mdName = relFile.replace(/\.mdx$/, ".md");
              const baseName = mdName.replace(/\.md$/, "");
              const destDirect = path.join(outDir, route, mdName);
              const destIndex = path.join(outDir, route, baseName, "index.md");

              try {
                const raw = await fs.readFile(srcPath, "utf8");
                const cleaned = cleanMarkdown(raw);
                await fs.ensureDir(path.dirname(destDirect));
                await fs.writeFile(destDirect, cleaned, "utf8");
                // Also write as index.md inside the page directory
                await fs.ensureDir(path.dirname(destIndex));
                await fs.writeFile(destIndex, cleaned, "utf8");
                total++;
              } catch (err) {
                console.error(
                  `[markdown-source] Failed: ${src}/${relFile}:`,
                  err.message,
                );
              }
            }
          }

          console.log(
            `[markdown-source] Copied ${total} markdown source files for v1/v2`,
          );
        },
      };
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        logo: {
          alt: "Inertia.js",
          src: "logo/light.svg",
          srcDark: "logo/dark.svg",
        },
        items: [
          {
            type: "dropdown",
            position: "left",
            label: "2.x",
            className: "navbar-version-dropdown",
            items: [
              { label: "3.x", to: "/docs/3.x" },
              { label: "2.x", to: "/docs/2.x" },
              { label: "1.x", to: "/docs/1.x" },
            ],
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Community",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/inertiacore",
              },
            ],
          },
        ],
      },
      colorMode: {
        defaultMode: "light",
        respectPrefersColorScheme: true,
      },
      prism: {
        additionalLanguages: ["php", "bash", "json", "http", "csharp"],
      },
    }),
};

module.exports = config;

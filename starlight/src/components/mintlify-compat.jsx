import React from "react";

// Re-export Starlight components from this shim so content files outside
// the project root (symlinked v1/v2/v3 trees) can reach them via the
// shim's absolute path — Vite can't resolve `@astrojs/starlight/...`
// from /docs/v* MDX files because they live outside the project's
// `node_modules` lookup chain.
//
// `Aside` is referenced via the rewriteAsides remark plugin which maps
// <Warning>/<Note>/<Info>/<Tip> → <Aside type="...">. `Card` is
// referenced directly by content files.
export { Aside, Card } from "@astrojs/starlight/components";

// --- Framework filter wrappers ---
// Emit a wrapper <div> with `data-framework-only` listing every framework
// value that should reveal this block. The client script toggles `hidden`
// on these based on the current `document.documentElement.dataset.framework`.
// The separator is `|` because framework labels contain spaces ("Vue 2").

const FrameworkOnly = ({ match, children }) => (
  <div data-framework-only={match}>{children}</div>
);

// Frameworks that a Vue-generic block is relevant to, etc.
export const VueSpecific = ({ children }) => (
  <FrameworkOnly match="Vue|Vue 2|Vue 3">{children}</FrameworkOnly>
);
export const Vue2Specific = ({ children }) => (
  <FrameworkOnly match="Vue 2">{children}</FrameworkOnly>
);
export const Vue3Specific = ({ children }) => (
  <FrameworkOnly match="Vue 3">{children}</FrameworkOnly>
);
export const ReactSpecific = ({ children }) => (
  <FrameworkOnly match="React">{children}</FrameworkOnly>
);
export const SvelteSpecific = ({ children }) => (
  <FrameworkOnly match="Svelte|Svelte 4|Svelte 5">{children}</FrameworkOnly>
);
export const Svelte4Specific = ({ children }) => (
  <FrameworkOnly match="Svelte 4">{children}</FrameworkOnly>
);
export const Svelte5Specific = ({ children }) => (
  <FrameworkOnly match="Svelte 5">{children}</FrameworkOnly>
);
// Always renders — "this content is about client-side code" but not a specific framework.
export const ClientSpecific = ({ children }) => <>{children}</>;
// Displays the current framework name inline. Replaced in-place by the
// client script via the `data-current-framework` hook.
export const CurrentCodeTab = () => <span data-current-framework>Vue</span>;

// --- Misc Mintlify layout primitives (minimal styling) ---

export const Columns = ({ cols = 2, children }) => (
  <div className="compat-columns" style={{ "--compat-cols": cols }}>{children}</div>
);

export const Steps = ({ children }) => <ol className="compat-steps">{children}</ol>;
export const Step = ({ title, children }) => (
  <li className="compat-step">
    {title && <h3 className="compat-step__title">{title}</h3>}
    {children}
  </li>
);

export const Frame = ({ children }) => <div className="compat-frame">{children}</div>;

export const ParamField = ({ header, body, type, children }) => (
  <div className="compat-param">
    <div className="compat-param__head">
      <code>{header || body}</code>
      {type && <span className="compat-param__type">{type}</span>}
    </div>
    {children && <div className="compat-param__body">{children}</div>}
  </div>
);

export const Badge = ({ children }) => <span className="compat-badge">{children}</span>;

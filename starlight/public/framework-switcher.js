// Global framework switcher for CodeGroup tabs + <XxxSpecific> wrappers.
// The active framework is stored in localStorage under key "code" (same
// key the original Mintlify snippets use, for forward-compat with any
// legacy bookmarks/links) and mirrored to `document.documentElement`
// dataset so CSS selectors can respond.
(function () {
  const KEY = "code";
  const DEFAULT_FRAMEWORK = "Vue";

  function read() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return DEFAULT_FRAMEWORK;
      // Original code stored quoted JSON; tolerate both quoted and plain.
      return raw.replace(/^"|"$/g, "");
    } catch {
      return DEFAULT_FRAMEWORK;
    }
  }

  function write(value) {
    try {
      localStorage.setItem(KEY, JSON.stringify(value));
    } catch {}
  }

  function matches(allowed, active) {
    // `allowed` is a pipe-separated list from data-framework-only.
    if (!allowed) return true;
    return allowed.split("|").some((v) => v.trim() === active);
  }

  function apply(active) {
    document.documentElement.dataset.framework = active;

    // CodeGroup panels: show the panel matching `active`, fall back to
    // first panel if this group doesn't offer the active framework.
    document.querySelectorAll("[data-code-group]").forEach((group) => {
      const panels = group.querySelectorAll(".code-group__panel");
      const tabs = group.querySelectorAll(".code-group__tab");
      let activeIdx = -1;
      panels.forEach((p, i) => {
        if (p.getAttribute("data-framework") === active) activeIdx = i;
      });
      if (activeIdx === -1) activeIdx = 0;
      panels.forEach((p, i) => {
        p.toggleAttribute("hidden", i !== activeIdx);
      });
      tabs.forEach((t, i) => {
        t.classList.toggle("is-active", i === activeIdx);
        t.setAttribute("aria-selected", i === activeIdx ? "true" : "false");
      });
    });

    // Framework-specific wrappers.
    document.querySelectorAll("[data-framework-only]").forEach((el) => {
      const allowed = el.getAttribute("data-framework-only");
      el.toggleAttribute("hidden", !matches(allowed, active));
    });

    // Inline <CurrentCodeTab/> placeholders.
    document.querySelectorAll("[data-current-framework]").forEach((el) => {
      // The Svelte-specific snippet renders "Svelte" for either Svelte 4/5.
      el.textContent = active.startsWith("Svelte") ? "Svelte" : active;
    });
  }

  function onTabClick(event) {
    // Walk up from the click target — if the user clicks the inline SVG
    // icon, target will be an <svg> or <path> element rather than the
    // button itself.
    const tab = event.currentTarget;
    const fw = tab.getAttribute("data-framework");
    if (!fw) return;
    write(fw);
    apply(fw);
    window.dispatchEvent(
      new CustomEvent("localStorageUpdate", {
        detail: { key: KEY, value: JSON.stringify(fw) },
      }),
    );
  }

  function init() {
    apply(read());
    // Direct per-button handlers rather than delegation, to sidestep any
    // event-path quirks from SVG children inside the <button>.
    document.querySelectorAll(".code-group__tab").forEach((tab) => {
      tab.addEventListener("click", onTabClick);
    });
  }

  // `astro:page-load` fires at the end of every navigation — the initial
  // full load AND each subsequent client-side nav from <ClientRouter />.
  // Using it (instead of DOMContentLoaded) ensures tab handlers + wrapper
  // visibility re-sync after SPA transitions, since the new <body> is
  // swapped in without re-running scripts from <head>.
  document.addEventListener("astro:page-load", init);
})();

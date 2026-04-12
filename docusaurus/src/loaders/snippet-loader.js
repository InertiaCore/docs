/**
 * Webpack loader that auto-injects React hook imports and an SSR-safe
 * localStorage shim into snippet JSX files, so the source files can
 * stay identical to their Mintlify originals.
 */
module.exports = function snippetLoader(source) {
  const preamble = [
    "import { useState, useCallback, useEffect } from 'react';",
    "const _ls = typeof window !== 'undefined' ? window.localStorage : { getItem: () => null, setItem: () => {} };",
  ].join('\n') + '\n';

  // Replace bare `localStorage` references with the SSR-safe shim,
  // but not inside strings like "localStorageUpdate".
  const safe = source.replace(/\blocalStorage\b/g, '_ls');

  return preamble + safe;
};

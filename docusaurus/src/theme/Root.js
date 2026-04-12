import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from '@docusaurus/router';

function isDocsPage(pathname) {
  return (
    pathname.startsWith('/docs/1.x/') ||
    pathname.startsWith('/docs/2.x/') ||
    pathname.startsWith('/docs/3.x/')
  );
}

function MarkdownActionsDropdown() {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  if (!isDocsPage(currentPath)) return null;

  const markdownUrl = currentPath.endsWith('/')
    ? `${currentPath}index.md`
    : `${currentPath}.md`;

  const handleOpenMarkdown = () => {
    window.open(markdownUrl, '_blank');
    setIsOpen(false);
  };

  const handleCopyMarkdown = async () => {
    try {
      const response = await fetch(markdownUrl);
      if (!response.ok) throw new Error('Failed to fetch markdown');
      const markdown = await response.text();
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => { setCopied(false); setIsOpen(false); }, 2000);
    } catch (error) {
      console.error('Failed to copy markdown:', error);
    }
  };

  return (
    <div ref={dropdownRef} className={`dropdown ${isOpen ? 'dropdown--show' : ''}`}>
      <button
        className="button button--outline button--secondary button--sm"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        Open Markdown
        <svg width="14" height="14" viewBox="0 0 16 16" style={{ marginLeft: '4px' }}>
          <path fill="currentColor" d="M4.427 6.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396a.25.25 0 00-.177-.427H4.604a.25.25 0 00-.177.427z" />
        </svg>
      </button>
      <ul className="dropdown__menu">
        <li>
          <button className="dropdown__link" onClick={handleOpenMarkdown}
            style={{ cursor: 'pointer', border: 'none', background: 'none', width: '100%', textAlign: 'left' }}>
            View as Markdown
          </button>
        </li>
        <li>
          <button className="dropdown__link" onClick={handleCopyMarkdown} disabled={copied}
            style={{ cursor: 'pointer', border: 'none', background: 'none', width: '100%', textAlign: 'left' }}>
            {copied ? 'Copied!' : 'Copy Page as Markdown'}
          </button>
        </li>
      </ul>
    </div>
  );
}

export default function Root({ children }) {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const scrollToElement = () => {
        const id = decodeURIComponent(hash.substring(1));
        const element = document.getElementById(id);
        if (element) { element.scrollIntoView({ behavior: 'smooth' }); return true; }
        return false;
      };
      if (!scrollToElement()) {
        [100, 300, 500, 1000].forEach(delay => setTimeout(scrollToElement, delay));
        window.addEventListener('load', scrollToElement, { once: true });
      }
    }
  }, [hash]);

  useEffect(() => {
    const match = pathname.match(/^\/docs\/(\d+\.x)(?:\/|$)/);
    const label = match ? match[1] : "2.x";

    let observer;
    let cancelled = false;

    const attach = (attempts = 0) => {
      if (cancelled) return;
      const link = document.querySelector("a.navbar-version-dropdown");
      if (!link) {
        if (attempts < 20) setTimeout(() => attach(attempts + 1), 50);
        return;
      }
      const setLabel = () => {
        if (link.firstChild && link.firstChild.nodeType === Node.TEXT_NODE) {
          if (link.firstChild.nodeValue !== label) {
            link.firstChild.nodeValue = label;
          }
        } else if (link.textContent !== label) {
          link.textContent = label;
        }
      };
      setLabel();
      observer = new MutationObserver(setLabel);
      observer.observe(link, {
        childList: true,
        characterData: true,
        subtree: true,
      });
    };

    attach();
    return () => {
      cancelled = true;
      if (observer) observer.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    const injectDropdown = () => {
      if (!isDocsPage(pathname)) return;
      const articleHeader = document.querySelector('article .markdown header');
      if (!articleHeader || articleHeader.querySelector('.markdown-actions-container')) return;

      const container = document.createElement('div');
      container.className = 'markdown-actions-container';
      articleHeader.appendChild(container);

      const { createRoot } = require('react-dom/client');
      const root = createRoot(container);
      root.render(<MarkdownActionsDropdown />);
    };
    [0, 100, 300].forEach(delay => setTimeout(injectDropdown, delay));
  }, [pathname]);

  return <>{children}</>;
}

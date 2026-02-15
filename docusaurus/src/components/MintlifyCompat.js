import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Admonition from '@theme/Admonition';

// --- Admonition wrappers ---

export function Warning({ children }) {
  return <Admonition type="warning">{children}</Admonition>;
}

export function Note({ children }) {
  return <Admonition type="note">{children}</Admonition>;
}

export function Info({ children }) {
  return <Admonition type="info">{children}</Admonition>;
}

export function Tip({ children }) {
  return <Admonition type="tip">{children}</Admonition>;
}

// --- Framework icons (inline SVG) ---

const frameworkIcons = {
  vuejs: (
    <svg viewBox="0 0 256 221" width="16" height="14" style={{ marginRight: 6, verticalAlign: 'middle' }}>
      <path d="M204.8 0H256L128 220.8 0 0h97.92L128 51.2 157.44 0h47.36z" fill="#41B883" />
      <path d="M0 0l128 220.8L256 0h-51.2L128 132.48 50.56 0H0z" fill="#41B883" />
      <path d="M50.56 0L128 133.12 204.8 0h-47.36L128 51.2 97.92 0H50.56z" fill="#35495E" />
    </svg>
  ),
  react: (
    <svg viewBox="0 0 256 228" width="16" height="14" style={{ marginRight: 6, verticalAlign: 'middle' }}>
      <path d="M210.483 73.824a171.49 171.49 0 00-8.24-2.597c.465-1.9.893-3.777 1.273-5.621 6.238-30.281 2.16-54.676-11.769-62.708-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 00-6.375 5.848 155.866 155.866 0 00-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233 50.33 10.957 46.379 33.89 51.986 62.588a170.974 170.974 0 001.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 006.921 2.165 167.467 167.467 0 00-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266 13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 005.342-4.923 168.064 168.064 0 006.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586 13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 00-1.535-6.842c1.62-.48 3.21-.99 4.76-1.53 29.151-10.09 48.44-25.678 48.44-41.27 0-14.791-17.608-29.725-45.504-39.844z" fill="#61DAFB" />
      <circle cx="128" cy="113.669" r="23.275" fill="#61DAFB" />
    </svg>
  ),
  s: (
    <svg viewBox="0 0 256 308" width="14" height="16" style={{ marginRight: 6, verticalAlign: 'middle' }}>
      <path d="M239.682 40.707C211.113-.182 154.69-12.301 113.895 13.69L42.247 59.356a82.198 82.198 0 00-37.135 55.056 86.566 86.566 0 008.536 55.576 82.425 82.425 0 00-12.296 30.719 87.596 87.596 0 0014.964 66.244c28.574 40.893 84.997 53.007 125.787 27.016l71.648-45.664a82.182 82.182 0 0037.135-55.057 86.601 86.601 0 00-8.53-55.577 82.4 82.4 0 0012.296-30.592 87.573 87.573 0 00-14.97-66.37z" fill="#FF3E00" />
      <path d="M106.889 270.841c-23.102 6.007-47.497-3.036-61.103-22.648a52.685 52.685 0 01-9.003-39.85 49.978 49.978 0 011.713-6.693l1.35-4.115 3.671 2.697a92.447 92.447 0 0028.036 14.007l2.663.808-.245 2.659a16.067 16.067 0 002.89 10.656 17.143 17.143 0 0018.397 6.828 15.786 15.786 0 004.403-1.935l71.67-45.672a14.922 14.922 0 006.734-9.977 15.923 15.923 0 00-2.713-12.011 17.156 17.156 0 00-18.404-6.832 15.78 15.78 0 00-4.396 1.933l-27.35 17.434a52.298 52.298 0 01-14.553 6.391c-23.101 6.007-47.497-3.036-61.101-22.649a52.681 52.681 0 01-9.004-39.849 49.428 49.428 0 0122.34-33.114l71.664-45.677a52.218 52.218 0 0114.563-6.398c23.101-6.007 47.497 3.036 61.101 22.648a52.685 52.685 0 019.004 39.85 50.559 50.559 0 01-1.713 6.692l-1.35 4.116-3.67-2.693a92.373 92.373 0 00-28.037-14.013l-2.664-.809.246-2.658a16.099 16.099 0 00-2.89-10.656 17.143 17.143 0 00-18.398-6.828 15.786 15.786 0 00-4.402 1.935l-71.67 45.674a14.898 14.898 0 00-6.73 9.975 15.9 15.9 0 002.709 12.012 17.156 17.156 0 0018.404 6.832 15.841 15.841 0 004.402-1.935l27.345-17.427a52.147 52.147 0 0114.552-6.397c23.101-6.006 47.497 3.037 61.102 22.65a52.681 52.681 0 019.003 39.848 49.453 49.453 0 01-22.34 33.12l-71.664 45.673a52.218 52.218 0 01-14.563 6.398z" fill="#FFF" />
    </svg>
  ),
  laravel: (
    <svg viewBox="0 0 256 264" width="16" height="16" style={{ marginRight: 6, verticalAlign: 'middle' }}>
      <path d="M255.856 59.62c.095.351.144.713.144 1.077v56.568c0 1.478-.79 2.843-2.073 3.578L206.335 148.5v54.18c0 1.478-.79 2.842-2.073 3.578l-99.108 57.234c-.227.13-.468.228-.717.3-.078.024-.16.032-.24.054-.196.054-.396.1-.6.1-.204 0-.404-.046-.6-.1-.08-.022-.162-.03-.24-.054a4.15 4.15 0 01-.717-.3L3.928 206.258A4.135 4.135 0 011.855 202.68V32.544c0-.364.05-.726.144-1.077.03-.116.088-.218.128-.33.054-.152.104-.31.176-.452.064-.126.156-.236.236-.354.066-.098.12-.2.2-.29.1-.11.224-.2.34-.296.08-.066.148-.148.234-.206L52.92 1.256a4.128 4.128 0 014.145 0l49.607 28.612c.086.058.154.14.234.206.116.096.24.186.34.296.08.09.134.192.2.29.08.118.172.228.236.354.072.142.122.3.176.452.04.112.098.214.128.33.095.35.144.714.144 1.078v106.044l41.284-23.836V60.697c0-.363.048-.726.144-1.076.03-.116.086-.22.128-.332.054-.15.104-.308.176-.45.064-.128.156-.238.236-.356.066-.098.12-.2.198-.29.1-.11.226-.2.342-.296.08-.066.148-.148.232-.206l49.608-28.616a4.13 4.13 0 014.146 0l49.608 28.616c.088.058.154.14.234.206.116.096.24.186.342.296.078.09.132.192.198.29.08.118.172.228.236.356.072.142.122.3.176.45.042.112.098.216.128.332zM247.584 114.97V65.39l-17.344 10.012-23.94 13.82v49.576l41.284-23.828zm-49.608 85.166V150.56l-23.548 13.482-67.344 38.564v50.226l90.892-52.496zM9.992 40.238v160.14l90.892 52.494v-50.226L52.94 174.356l-.016-.01-.012-.006c-.082-.058-.15-.138-.23-.2a3.916 3.916 0 01-.336-.29c-.076-.088-.13-.188-.196-.284a3.684 3.684 0 01-.236-.356c-.064-.136-.11-.284-.166-.428a3.49 3.49 0 01-.142-.37c-.034-.12-.09-.222-.118-.348A4.006 4.006 0 0151.4 121v-49.4l-23.94-13.82L10 47.768v-7.53h-.008zM54.992 9.62L13.708 33.446l41.284 23.828 41.284-23.828L54.992 9.62zm21.56 141.474l23.94-13.82V36.2L83.148 46.21l-23.94 13.82v101.074l17.344-10.012zM202.19 37.34l-41.284 23.828 41.284 23.828 41.284-23.828L202.19 37.34zm-4.128 55.36l-23.94-13.82-17.344-10.012v49.578l23.94 13.82 17.344 10.012V92.7zm-94.764 109.9l60.508-34.642 30.362-17.38-41.224-23.796-47.594 27.476-43.346 25.016 41.294 23.326z" fill="#FF2D20" />
    </svg>
  ),
  dotnet: (
    <svg viewBox="0 0 256 256" width="16" height="16" style={{ marginRight: 6, verticalAlign: 'middle' }}>
      <rect width="256" height="256" rx="128" fill="#512BD4" />
      <path d="M48.8 176c-1.3 0-2.5-.5-3.4-1.4-.9-.9-1.4-2.1-1.4-3.4 0-1.3.5-2.5 1.4-3.4.9-.9 2.1-1.4 3.4-1.4 1.3 0 2.5.5 3.5 1.4.9.9 1.4 2.1 1.4 3.4 0 1.3-.5 2.5-1.4 3.4-1 .9-2.2 1.4-3.5 1.4zm79.4-2.4h-12.3l-34-53.5c-.8-1.2-1.3-2.2-1.7-3h-.2c.2 1.5.3 4.1.3 7.7V174H71V82h13.2l33 52.3c1.2 1.9 2 3.2 2.2 3.8h.2c-.3-1.5-.4-4.1-.4-7.6V82h9.3v91.6h-.3zm36.7 2.4c-8.2 0-14.8-2.6-19.8-7.8-5-5.2-7.4-12.2-7.4-20.9 0-9.2 2.6-16.5 7.8-21.8 5.2-5.3 12.1-8 20.7-8 7.9 0 14.2 2.6 18.8 7.7 4.6 5.1 6.9 12.1 6.9 20.9 0 9-2.5 16.2-7.6 21.5-5.1 5.3-11.9 8-20.4 8h1zm.6-51c-5.9 0-10.5 2-13.8 6-3.3 4-5 9.5-5 16.5 0 6.8 1.7 12.2 5 16 3.3 3.8 7.9 5.8 13.8 5.8 5.9 0 10.5-1.9 13.5-5.7 3-3.8 4.6-9.3 4.6-16.4 0-7.2-1.5-12.7-4.6-16.5-3.1-3.8-7.6-5.7-13.5-5.7zm64.7 51c-5.6 0-10.5-1.4-14.6-4.2-4.2-2.8-7.4-6.8-9.6-12.1l8.6-3.6c3.5 8 8.8 12 15.9 12 4 0 7.1-1 9.3-3 2.2-2 3.3-4.5 3.3-7.6 0-3.4-1.3-6-3.9-8-2.6-1.9-6.7-4.1-12.3-6.4-5.8-2.4-10.1-5.1-12.9-8-2.8-2.9-4.2-6.8-4.2-11.4 0-4.8 1.9-8.8 5.6-12.1 3.7-3.2 8.5-4.8 14.2-4.8 4.7 0 8.8 1.1 12.3 3.2 3.5 2.2 6.2 5 8 8.6l-8 4.6c-2.8-5.2-6.8-7.8-12.1-7.8-3.4 0-6.1.9-8.2 2.6-2.1 1.8-3.1 4-3.1 6.8 0 2.5 1 4.6 3.1 6.4 2 1.8 5.6 3.6 10.8 5.6 3.8 1.5 6.8 2.9 9 4.2 2.2 1.3 4.1 2.9 5.7 4.7 1.6 1.8 2.8 3.9 3.5 6.1.7 2.3 1.1 4.9 1.1 7.8 0 5.2-2 9.5-5.9 12.8-3.9 3.3-9 5-15.1 5h.4z" fill="#FFF" />
    </svg>
  ),
};

// --- CodeGroup: wraps fenced code blocks into tabs ---

function extractCodeBlockInfo(child) {
  const codeEl = child?.props?.children;
  if (!codeEl?.props) return null;

  const className = codeEl.props.className || '';
  const metastring = codeEl.props.metastring || '';

  const langMatch = className.match(/language-(\w+)/);
  const lang = langMatch ? langMatch[1] : '';

  // Extract icon from metastring (e.g., 'icon="vuejs"')
  const iconMatch = metastring.match(/icon="([^"]*)"/);
  const icon = iconMatch ? iconMatch[1] : null;

  // Title: everything before icon="..." (e.g., 'Vue 2 icon="vuejs"' → "Vue 2")
  const title = metastring.replace(/icon="[^"]*"/, '').trim() || lang || 'Code';

  return { title, lang, icon };
}

function TabLabel({ title, icon }) {
  const iconEl = icon && frameworkIcons[icon];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
      {iconEl}
      {title}
    </span>
  );
}

export function CodeGroup({ children }) {
  const childArray = React.Children.toArray(children).filter(
    (child) => {
      if (!React.isValidElement(child)) return false;
      const inner = child?.props?.children;
      if (!React.isValidElement(inner)) return false;
      const cls = inner?.props?.className || '';
      return cls.includes('language-');
    }
  );

  if (childArray.length === 0) {
    return <>{children}</>;
  }

  const tabs = childArray.map((child) => extractCodeBlockInfo(child));

  return (
    <Tabs groupId="code-group">
      {childArray.map((child, i) => {
        const { title, icon } = tabs[i] || {};
        const label = icon && frameworkIcons[icon]
          ? React.createElement(TabLabel, { title, icon })
          : title || `Tab ${i + 1}`;
        return (
          <TabItem
            value={title || `tab-${i}`}
            label={label}
            key={i}
          >
            {child}
          </TabItem>
        );
      })}
    </Tabs>
  );
}

// --- Card ---

export function Card({ title, href, icon, children, arrow, cta }) {
  const style = {
    border: '1px solid var(--ifm-color-emphasis-300)',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '12px',
    textDecoration: 'none',
    display: 'block',
    color: 'inherit',
  };

  const content = (
    <div style={style}>
      <strong>{title}</strong>
      {children && <div style={{ marginTop: '4px', fontSize: '0.9em', opacity: 0.85 }}>{children}</div>}
      {cta && <div style={{ marginTop: '8px', fontSize: '0.85em', color: 'var(--ifm-color-primary)' }}>{cta} &rarr;</div>}
    </div>
  );

  if (href) {
    return <a href={href} style={{ textDecoration: 'none', color: 'inherit' }}>{content}</a>;
  }

  return content;
}

// --- Steps / Step ---

export function Steps({ children }) {
  return <div className="mintlify-steps">{children}</div>;
}

export function Step({ title, children }) {
  return (
    <div className="mintlify-step">
      <h3>{title}</h3>
      {children}
    </div>
  );
}

// --- Frame ---

export function Frame({ children }) {
  return (
    <div style={{
      border: '1px solid var(--ifm-color-emphasis-200)',
      borderRadius: '8px',
      overflow: 'hidden',
      marginBottom: '16px',
    }}>
      {children}
    </div>
  );
}

// --- ParamField ---

export function ParamField({ header, body, type, children }) {
  const name = header || body;
  return (
    <div style={{
      borderBottom: '1px solid var(--ifm-color-emphasis-200)',
      padding: '8px 0',
      marginBottom: '4px',
    }}>
      <div>
        <code style={{ fontWeight: 'bold' }}>{name}</code>
        {type && <span style={{ marginLeft: '8px', fontSize: '0.85em', opacity: 0.7 }}>{type}</span>}
      </div>
      {children && <div style={{ marginTop: '4px', fontSize: '0.9em' }}>{children}</div>}
    </div>
  );
}

// --- Badge ---

export function Badge({ children }) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 8px',
      fontSize: '0.75em',
      fontWeight: 500,
      borderRadius: '4px',
      backgroundColor: 'var(--ifm-color-primary-lightest)',
      color: 'var(--ifm-color-primary-darkest)',
      verticalAlign: 'middle',
      marginLeft: '4px',
    }}>
      {children}
    </span>
  );
}

// --- Columns ---

export function Columns({ cols = 2, children }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap: '12px',
      marginBottom: '16px',
    }}>
      {children}
    </div>
  );
}

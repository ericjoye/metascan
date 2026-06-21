// MetaScan content script — extracts meta tags from the page
'use strict';

function safeUrl(url) {
  try { return new URL(url); } catch { return null; }
}

function safeHostname(url) {
  const u = safeUrl(url);
  return u ? u.hostname : 'example.com';
}

function safePathname(url) {
  const u = safeUrl(url);
  return u ? u.pathname : '/';
}

function extractMetaTags() {
  const doc = document;
  const result = {
    title: doc.title || '',
    url: location.href,
    hostname: safeHostname(location.href),
    canonical: '',
    meta: [],
    og: [],
    twitter: [],
    issues: [],
    headings: { h1: 0, h2: 0, h3: 0, h4: 0, h5: 0, h6: 0 },
    images: { total: 0, missingAlt: 0 },
    robots: '',
    viewport: '',
    lang: doc.documentElement.lang || '',
  };

  // Title analysis
  if (!result.title) {
    result.issues.push({ severity: 'error', msg: 'Missing page title' });
  } else if (result.title.length < 10) {
    result.issues.push({ severity: 'warning', msg: `Title too short (${result.title.length} chars, recommend 10-60)` });
  } else if (result.title.length > 60) {
    result.issues.push({ severity: 'warning', msg: `Title too long (${result.title.length} chars, recommend ≤60)` });
  }

  // Meta tags
  const metaTags = doc.querySelectorAll('meta');
  metaTags.forEach(tag => {
    const name = (tag.getAttribute('name') || '').toLowerCase();
    const prop = (tag.getAttribute('property') || '').toLowerCase();
    const content = tag.getAttribute('content') || '';

    if (name === 'description') {
      result.meta.push({ name: 'description', content });
      if (content.length < 50) {
        result.issues.push({ severity: 'warning', msg: `Meta description too short (${content.length} chars, recommend 50-160)` });
      } else if (content.length > 160) {
        result.issues.push({ severity: 'warning', msg: `Meta description too long (${content.length} chars, recommend ≤160)` });
      }
    } else if (name === 'robots') {
      result.robots = content;
    } else if (name === 'viewport') {
      result.viewport = content;
    } else if (prop.startsWith('og:')) {
      result.og.push({ property: prop, content });
    } else if (name.startsWith('twitter:') || name === 'twitter:card') {
      result.twitter.push({ name, content });
    } else if (name && content) {
      result.meta.push({ name, content });
    }
  });

  // Canonical
  const canonical = doc.querySelector('link[rel="canonical"]');
  if (canonical) {
    result.canonical = canonical.getAttribute('href') || '';
  }

  // Headings
  for (let i = 1; i <= 6; i++) {
    const count = doc.querySelectorAll(`h${i}`).length;
    result.headings[`h${i}`] = count;
  }
  if (result.headings.h1 === 0) {
    result.issues.push({ severity: 'error', msg: 'Missing H1 tag' });
  } else if (result.headings.h1 > 1) {
    result.issues.push({ severity: 'warning', msg: `Multiple H1 tags (${result.headings.h1})` });
  }

  // Images
  const images = doc.querySelectorAll('img');
  result.images.total = images.length;
  images.forEach(img => {
    if (!img.getAttribute('alt')) result.images.missingAlt++;
  });
  if (result.images.missingAlt > 0) {
    result.issues.push({ severity: 'warning', msg: `${result.images.missingAlt} image(s) missing alt text` });
  }

  // OG checks
  const ogTitle = result.og.find(o => o.property === 'og:title');
  const ogDesc = result.og.find(o => o.property === 'og:description');
  const ogImage = result.og.find(o => o.property === 'og:image');
  if (!ogTitle) result.issues.push({ severity: 'warning', msg: 'Missing og:title' });
  if (!ogDesc) result.issues.push({ severity: 'warning', msg: 'Missing og:description' });
  if (!ogImage) result.issues.push({ severity: 'warning', msg: 'Missing og:image' });

  // Twitter checks
  const twCard = result.twitter.find(t => t.name === 'twitter:card');
  const twTitle = result.twitter.find(t => t.name === 'twitter:title');
  if (!twCard) result.issues.push({ severity: 'info', msg: 'Missing twitter:card' });
  if (!twTitle) result.issues.push({ severity: 'info', msg: 'Missing twitter:title' });

  // Lang check
  if (!result.lang) {
    result.issues.push({ severity: 'warning', msg: 'Missing lang attribute on <html>' });
  }

  return result;
}

// Auto-inject on load
if (document.readyState === 'complete') {
  const data = extractMetaTags();
  chrome.runtime.sendMessage({ action: 'metaExtracted', data }).catch(() => {});
} else {
  window.addEventListener('load', () => {
    const data = extractMetaTags();
    chrome.runtime.sendMessage({ action: 'metaExtracted', data }).catch(() => {});
  });
}

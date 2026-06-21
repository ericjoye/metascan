// MetaScan service worker — message routing & script injection
'use strict';

chrome.runtime.onInstalled.addListener(async () => {
  const data = await new Promise(resolve => chrome.storage.local.get(null, resolve));
  if (!data.ms_tier) {
    chrome.storage.local.set({ ms_tier: 'free' });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  handleMessage(message, sender).then(sendResponse).catch(err => {
    console.error('[MetaScan] Error:', err);
    sendResponse({ error: err.message });
  });
  return true;
});

async function handleMessage(message, sender) {
  const { action, payload } = message;

  switch (action) {
    case 'metaExtracted':
      return { received: true };

    case 'getTabMeta': {
      try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tab) return { error: 'No active tab' };

        const results = await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: extractMetaTagsFromPage,
        });
        return { data: results[0]?.result };
      } catch (err) {
        return { error: err.message };
      }
    }

    case 'getTier':
      return { tier: await getTier() };

    case 'setLicense': {
      const result = await setLicense(payload.key);
      return result;
    }

    default:
      throw new Error(`Unknown action: ${action}`);
  }
}

function extractMetaTagsFromPage() {
  const doc = document;
  const result = {
    title: doc.title || '',
    url: location.href,
    hostname: (() => { try { return new URL(location.href).hostname; } catch { return 'example.com'; } })(),
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

  if (!result.title) {
    result.issues.push({ severity: 'error', msg: 'Missing page title' });
  } else if (result.title.length < 10) {
    result.issues.push({ severity: 'warning', msg: `Title too short (${result.title.length} chars, recommend 10-60)` });
  } else if (result.title.length > 60) {
    result.issues.push({ severity: 'warning', msg: `Title too long (${result.title.length} chars, recommend ≤60)` });
  }

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

  const canonical = doc.querySelector('link[rel="canonical"]');
  if (canonical) result.canonical = canonical.getAttribute('href') || '';

  for (let i = 1; i <= 6; i++) {
    result.headings[`h${i}`] = doc.querySelectorAll(`h${i}`).length;
  }
  if (result.headings.h1 === 0) result.issues.push({ severity: 'error', msg: 'Missing H1 tag' });
  else if (result.headings.h1 > 1) result.issues.push({ severity: 'warning', msg: `Multiple H1 tags (${result.headings.h1})` });

  const images = doc.querySelectorAll('img');
  result.images.total = images.length;
  images.forEach(img => { if (!img.getAttribute('alt')) result.images.missingAlt++; });
  if (result.images.missingAlt > 0) result.issues.push({ severity: 'warning', msg: `${result.images.missingAlt} image(s) missing alt text` });

  const ogTitle = result.og.find(o => o.property === 'og:title');
  const ogDesc = result.og.find(o => o.property === 'og:description');
  const ogImage = result.og.find(o => o.property === 'og:image');
  if (!ogTitle) result.issues.push({ severity: 'warning', msg: 'Missing og:title' });
  if (!ogDesc) result.issues.push({ severity: 'warning', msg: 'Missing og:description' });
  if (!ogImage) result.issues.push({ severity: 'warning', msg: 'Missing og:image' });

  const twCard = result.twitter.find(t => t.name === 'twitter:card');
  const twTitle = result.twitter.find(t => t.name === 'twitter:title');
  if (!twCard) result.issues.push({ severity: 'info', msg: 'Missing twitter:card' });
  if (!twTitle) result.issues.push({ severity: 'info', msg: 'Missing twitter:title' });

  if (!result.lang) result.issues.push({ severity: 'warning', msg: 'Missing lang attribute on <html>' });

  return result;
}

async function getTier() {
  const data = await new Promise(resolve => chrome.storage.local.get(['ms_tier'], resolve));
  return data.ms_tier || 'free';
}

async function setLicense(key) {
  if (!key || typeof key !== 'string') return { tier: 'free', valid: false };
  const trimmed = key.trim().toUpperCase();
  const proPattern = /^PRO-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
  const teamPattern = /^TEAM-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
  let tier = null;
  if (proPattern.test(trimmed)) tier = 'pro';
  else if (teamPattern.test(trimmed)) tier = 'team';
  if (!tier) return { tier: 'free', valid: false };
  await new Promise(resolve => chrome.storage.local.set({ ms_license: trimmed, ms_tier: tier }, resolve));
  return { tier, valid: true };
}

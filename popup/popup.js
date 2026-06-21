// MetaScan popup logic
'use strict';

let currentData = null;

// ── Tab Navigation ───────────────────────────────────────────────────────

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const tabId = `tab-${btn.dataset.tab}`;
    document.getElementById(tabId).classList.add('active');
  });
});

// ── Scan Tab ─────────────────────────────────────────────────────────────

async function scanPage() {
  const loading = document.getElementById('scan-loading');
  const results = document.getElementById('scan-results');
  const issuesLoading = document.getElementById('issues-loading');
  const issuesList = document.getElementById('issues-list');

  loading.classList.remove('hidden');
  results.classList.add('hidden');
  issuesLoading.classList.remove('hidden');
  issuesList.classList.add('hidden');

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) {
      loading.textContent = 'No active tab found';
      return;
    }

    const results_arr = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: extractMetaTagsFromPage,
    });

    const data = results_arr[0]?.result;
    if (!data) {
      loading.textContent = 'Could not extract meta tags';
      return;
    }

    currentData = data;
    renderScanResults(data);
    renderIssues(data);
    renderSocialPreviews(data);

    loading.classList.add('hidden');
    results.classList.remove('hidden');
    issuesLoading.classList.add('hidden');
    issuesList.classList.remove('hidden');
  } catch (err) {
    loading.textContent = `Error: ${err.message}`;
  }
}

function renderScanResults(data) {
  document.getElementById('result-title').textContent = data.title || '(no title)';
  document.getElementById('title-len').textContent = data.title.length;

  const desc = data.meta.find(m => m.name === 'description');
  document.getElementById('result-desc').textContent = desc ? desc.content : '(no description)';
  document.getElementById('desc-len').textContent = desc ? desc.content.length : 0;

  const ogList = document.getElementById('result-og');
  ogList.innerHTML = data.og.length
    ? data.og.map(o => `<div class="tag-item"><span class="tag-name">${o.property}</span><span class="tag-value">${escapeHtml(o.content)}</span></div>`).join('')
    : '<p style="color:#9ca3af;font-size:11px">No Open Graph tags</p>';

  const twList = document.getElementById('result-twitter');
  twList.innerHTML = data.twitter.length
    ? data.twitter.map(t => `<div class="tag-item"><span class="tag-name">${t.name}</span><span class="tag-value">${escapeHtml(t.content)}</span></div>`).join('')
    : '<p style="color:#9ca3af;font-size:11px">No Twitter tags</p>';

  const metaList = document.getElementById('result-meta');
  const otherMeta = data.meta.filter(m => m.name !== 'description');
  metaList.innerHTML = otherMeta.length
    ? otherMeta.map(m => `<div class="tag-item"><span class="tag-name">${m.name}</span><span class="tag-value">${escapeHtml(m.content)}</span></div>`).join('')
    : '<p style="color:#9ca3af;font-size:11px">No other meta tags</p>';

  document.getElementById('result-canonical').textContent = data.canonical || '(no canonical)';
  document.getElementById('result-robots').textContent = data.robots || '(no robots meta)';

  const headingsGrid = document.getElementById('result-headings');
  headingsGrid.innerHTML = Object.entries(data.headings).map(([h, count]) =>
    `<div class="h-count ${count > 0 ? 'active' : ''}">${h.toUpperCase()}: ${count}</div>`
  ).join('');

  document.getElementById('result-images').textContent =
    `${data.images.total} total, ${data.images.missingAlt} missing alt text`;
}

function renderIssues(data) {
  const list = document.getElementById('issues-list');
  if (!data.issues.length) {
    list.innerHTML = '<p style="color:#059669;font-size:13px;text-align:center;padding:20px">No issues found!</p>';
    return;
  }
  list.innerHTML = data.issues.map(issue => `
    <div class="issue-item ${issue.severity}">
      <span class="issue-icon">${issue.severity === 'error' ? '✗' : issue.severity === 'warning' ? '⚠' : 'ℹ'}</span>
      <span class="issue-msg">${escapeHtml(issue.msg)}</span>
    </div>
  `).join('');
}

function renderSocialPreviews(data) {
  const ogTitle = data.og.find(o => o.property === 'og:title');
  const ogDesc = data.og.find(o => o.property === 'og:description');
  const twTitle = data.twitter.find(t => t.name === 'twitter:title');
  const twDesc = data.twitter.find(t => t.name === 'twitter:description');

  document.getElementById('fb-hostname').textContent = data.hostname;
  document.getElementById('fb-title').textContent = ogTitle ? ogTitle.content : data.title;
  document.getElementById('fb-desc').textContent = ogDesc ? ogDesc.content : (data.meta.find(m => m.name === 'description')?.content || '');

  document.getElementById('tw-hostname').textContent = data.hostname;
  document.getElementById('tw-title').textContent = twTitle ? twTitle.content : data.title;
  document.getElementById('tw-desc').textContent = twDesc ? twDesc.content : (data.meta.find(m => m.name === 'description')?.content || '');

  document.getElementById('wa-hostname').textContent = data.hostname;
  document.getElementById('wa-title').textContent = data.title;
  document.getElementById('wa-desc').textContent = data.meta.find(m => m.name === 'description')?.content || '';
}

// ── Editor Tab ───────────────────────────────────────────────────────────

function setupEditor() {
  const fields = ['edit-title', 'edit-desc', 'edit-og-title', 'edit-og-desc', 'edit-tw-title', 'edit-tw-desc', 'edit-canonical'];
  const counters = { 'edit-title': 'edit-title-count', 'edit-desc': 'edit-desc-count' };

  fields.forEach(id => {
    const el = document.getElementById(id);
    if (counters[id]) {
      el.addEventListener('input', () => {
        document.getElementById(counters[id]).textContent = el.value.length;
      });
    }
  });

  document.getElementById('copy-json-btn').addEventListener('click', async () => {
    if (!currentData) {
      await scanPage();
    }
    if (currentData) {
      const json = JSON.stringify(currentData, null, 2);
      await navigator.clipboard.writeText(json);
      const btn = document.getElementById('copy-json-btn');
      btn.textContent = 'Copied!';
      setTimeout(() => { btn.textContent = 'Copy as JSON'; }, 1500);
    }
  });

  document.getElementById('save-draft-btn').addEventListener('click', () => {
    const draft = {};
    fields.forEach(id => { draft[id] = document.getElementById(id).value; });
    chrome.storage.local.set({ ms_draft: draft });
    const btn = document.getElementById('save-draft-btn');
    btn.textContent = 'Saved!';
    setTimeout(() => { btn.textContent = 'Save Draft'; }, 1500);
  });
}

function loadEditorValues(data) {
  if (!data) return;
  const desc = data.meta.find(m => m.name === 'description');
  const ogTitle = data.og.find(o => o.property === 'og:title');
  const ogDesc = data.og.find(o => o.property === 'og:description');
  const twTitle = data.twitter.find(t => t.name === 'twitter:title');
  const twDesc = data.twitter.find(t => t.name === 'twitter:description');

  document.getElementById('edit-title').value = data.title || '';
  document.getElementById('edit-desc').value = desc ? desc.content : '';
  document.getElementById('edit-og-title').value = ogTitle ? ogTitle.content : '';
  document.getElementById('edit-og-desc').value = ogDesc ? ogDesc.content : '';
  document.getElementById('edit-tw-title').value = twTitle ? twTitle.content : '';
  document.getElementById('edit-tw-desc').value = twDesc ? twDesc.content : '';
  document.getElementById('edit-canonical').value = data.canonical || '';

  document.getElementById('edit-title-count').textContent = (data.title || '').length;
  document.getElementById('edit-desc-count').textContent = desc ? desc.content.length : 0;
}

// ── Export Tab ───────────────────────────────────────────────────────────

function setupExport() {
  document.getElementById('export-json').addEventListener('click', () => {
    if (!currentData) return;
    const json = JSON.stringify(currentData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    chrome.downloads.download({ url, filename: `metascan-${currentData.hostname}.json` });
  });

  document.getElementById('export-csv').addEventListener('click', () => {
    if (!currentData) return;
    const rows = [
      ['Type', 'Name', 'Content'],
      ['title', 'title', currentData.title],
      ['meta', 'description', currentData.meta.find(m => m.name === 'description')?.content || ''],
      ...currentData.og.map(o => ['og', o.property, o.content]),
      ...currentData.twitter.map(t => ['twitter', t.name, t.content]),
      ...currentData.meta.filter(m => m.name !== 'description').map(m => ['meta', m.name, m.content]),
    ];
    const csv = rows.map(r => r.map(c => `"${(c || '').replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    chrome.downloads.download({ url, filename: `metascan-${currentData.hostname}.csv` });
  });

  document.getElementById('export-html').addEventListener('click', () => {
    if (!currentData) return;
    const html = generateHtmlReport(currentData);
    const win = window.open('', '_blank');
    win.document.write(html);
    win.document.close();
  });
}

function generateHtmlReport(data) {
  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>MetaScan Report — ${data.hostname}</title>
<style>body{font-family:sans-serif;max-width:800px;margin:40px auto;padding:0 20px;color:#1a1a2e}
h1{color:#16213e}table{width:100%;border-collapse:collapse;margin:16px 0}th,td{padding:8px 12px;border:1px solid #e5e7eb;text-align:left;font-size:13px}
th{background:#f3f4f6;font-weight:600}.error{color:#ef4444}.warning{color:#f59e0b}.info{color:#3b82f6}
h2{color:#374151;margin-top:24px}</style></head>
<body><h1>MetaScan Report</h1>
<p>URL: <a href="${data.url}">${data.url}</a></p>
<h2>Title</h2><p>${escapeHtml(data.title)}</p>
<h2>Meta Description</h2><p>${escapeHtml(data.meta.find(m => m.name === 'description')?.content || 'N/A')}</p>
<h2>Open Graph Tags</h2>
<table><tr><th>Property</th><th>Content</th></tr>
${data.og.map(o => `<tr><td>${o.property}</td><td>${escapeHtml(o.content)}</td></tr>`).join('')}
${data.og.length ? '' : '<tr><td colspan="2">None found</td></tr>'}</table>
<h2>Twitter Tags</h2>
<table><tr><th>Name</th><th>Content</th></tr>
${data.twitter.map(t => `<tr><td>${t.name}</td><td>${escapeHtml(t.content)}</td></tr>`).join('')}
${data.twitter.length ? '' : '<tr><td colspan="2">None found</td></tr>'}</table>
<h2>Issues</h2>
${data.issues.map(i => `<p class="${i.severity}">${i.severity === 'error' ? '✗' : i.severity === 'warning' ? '⚠' : 'ℹ'} ${escapeHtml(i.msg)}</p>`).join('')}
${data.issues.length ? '' : '<p>No issues found!</p>'}
<h2>Canonical</h2><p>${data.canonical || 'N/A'}</p>
<h2>Robots</h2><p>${data.robots || 'N/A'}</p>
</body></html>`;
}

// ── Options Tab ──────────────────────────────────────────────────────────

function setupOptions() {
  document.getElementById('activate-btn').addEventListener('click', async () => {
    const key = document.getElementById('opt-tier').value.trim();
    const resp = await chrome.runtime.sendMessage({ action: 'setLicense', payload: { key } });
    const status = document.getElementById('activate-status');
    if (resp.valid) {
      status.textContent = `✓ Activated as ${resp.tier}`;
      status.className = 'status-text success';
      updateTierBadge(resp.tier);
    } else {
      status.textContent = '✗ Invalid key format';
      status.className = 'status-text error';
    }
  });

  // Load saved settings
  chrome.storage.local.get(['ms_autoscan', 'ms_badge'], data => {
    document.getElementById('opt-autoscan').checked = data.ms_autoscan !== false;
    document.getElementById('opt-badge').checked = data.ms_badge !== false;
  });

  document.getElementById('opt-autoscan').addEventListener('change', e => {
    chrome.storage.local.set({ ms_autoscan: e.target.checked });
  });
  document.getElementById('opt-badge').addEventListener('change', e => {
    chrome.storage.local.set({ ms_badge: e.target.checked });
  });
}

// ── Upgrade Button ──────────────────────────────────────────────────────

document.getElementById('upgrade-btn').addEventListener('click', () => {
  window.open('https://buy.stripe.com/test_metascan_pro', '_blank');
});

// ── Helpers ──────────────────────────────────────────────────────────────

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function updateTierBadge(tier) {
  const badge = document.getElementById('tier-badge');
  badge.textContent = tier === 'free' ? 'Free' : 'Pro';
  badge.className = `badge badge-${tier}`;
}

// ── Init ─────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', async () => {
  setupEditor();
  setupExport();
  setupOptions();

  // Load tier
  const { tier } = await chrome.runtime.sendMessage({ action: 'getTier' });
  updateTierBadge(tier);

  // Load draft
  const data = await new Promise(resolve => chrome.storage.local.get(['ms_draft'], resolve));
  if (data.ms_draft) {
    Object.entries(data.ms_draft).forEach(([id, val]) => {
      const el = document.getElementById(id);
      if (el) el.value = val;
    });
    document.getElementById('edit-title-count').textContent = (data.ms_draft['edit-title'] || '').length;
    document.getElementById('edit-desc-count').textContent = (data.ms_draft['edit-desc'] || '').length;
  }

  // Scan
  await scanPage();
  if (currentData) loadEditorValues(currentData);
});

// ── Content script function (injected) ──────────────────────────────────

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

  doc.querySelectorAll('meta').forEach(tag => {
    const name = (tag.getAttribute('name') || '').toLowerCase();
    const prop = (tag.getAttribute('property') || '').toLowerCase();
    const content = tag.getAttribute('content') || '';

    if (name === 'description') {
      result.meta.push({ name: 'description', content });
      if (content.length < 50) result.issues.push({ severity: 'warning', msg: `Meta description too short (${content.length} chars, recommend 50-160)` });
      else if (content.length > 160) result.issues.push({ severity: 'warning', msg: `Meta description too long (${content.length} chars, recommend ≤160)` });
    } else if (name === 'robots') result.robots = content;
    else if (name === 'viewport') result.viewport = content;
    else if (prop.startsWith('og:')) result.og.push({ property: prop, content });
    else if (name.startsWith('twitter:') || name === 'twitter:card') result.twitter.push({ name, content });
    else if (name && content) result.meta.push({ name, content });
  });

  const canonical = doc.querySelector('link[rel="canonical"]');
  if (canonical) result.canonical = canonical.getAttribute('href') || '';

  for (let i = 1; i <= 6; i++) result.headings[`h${i}`] = doc.querySelectorAll(`h${i}`).length;
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

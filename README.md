# MetaScan — Chrome Extension

SEO Meta Tags & Social Preview Tool — scan, edit, and export page meta tags.

## Features

- **Scan** — Extracts all meta tags, Open Graph, Twitter Cards, canonical, robots, headings, images
- **Social Preview** — Renders how your page appears on Facebook/LinkedIn, X/Twitter, WhatsApp/Slack
- **Editor** — Edit meta tags with character counters, save drafts, copy as JSON
- **Export** — JSON, CSV, and HTML/PDF report export
- **Issues** — Flags 15+ common SEO problems (missing title, short description, missing OG tags, etc.)
- **Stripe** — Pro tier upgrade buttons ($7/mo)
- **Options** — License key activation, auto-scan toggle, issue badge toggle

## Install (Developer Mode)

1. Open Chrome → `chrome://extensions`
2. Enable "Developer mode" (top-right toggle)
3. Click "Load unpacked"
4. Select the `metascan/` directory
5. The MetaScan icon appears in your toolbar

## Usage

1. Navigate to any webpage
2. Click the MetaScan toolbar icon
3. View extracted meta tags, social previews, and issue analysis
4. Use the Editor tab to modify tags and save drafts
5. Use the Export tab to download reports (JSON, CSV, HTML)
6. Click "⭐ Upgrade" for Pro tier

## File Layout

```
metascan/
├── manifest.json              # Chrome extension manifest (MV3)
├── background/
│   └── service-worker.js      # Service worker — message routing & script injection
├── content/
│   └── content-script.js      # Content script — meta tag extraction
├── popup/
│   ├── popup.html             # Popup UI structure (6 tabs)
│   ├── popup.js               # Popup logic — scan, editor, export, options
│   ├── popup.css              # Popup styles
│   └── options.html           # Extension settings page
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── landing/
│   ├── index.html
│   └── style.css
├── BUILDER-REPORT.md
└── README.md                  # This file
```

## Technical Notes

- Pure vanilla JavaScript — zero dependencies
- Manifest V3 compatible
- All URL parsing guarded with try/catch (safeUrl/safeHostname/safePathname helpers)
- Content script injection via `chrome.scripting.executeScript`
- Stripe integration: replace `https://buy.stripe.com/test_metascan_pro` with live Price ID
- Tier/license system: PRO-XXXX-XXXX and TEAM-XXXX-XXXX key formats
- Pro gate UI shown for free users (demo/testing — all features functional)

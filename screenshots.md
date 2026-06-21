# Screenshots — MetaScan

**Product:** MetaScan — SEO Meta Tags & Social Preview Chrome Extension. Scan, edit, and export page meta tags.

**Type:** Chrome Extension (Manifest V3)

---

## Screenshot 1: Main Interface — Meta Tags Overview

**What to capture:** The extension popup showing the Scan tab with all extracted meta tags from the current page.

**ASCII Mockup:**

```
┌─────────────────────────────────────────────┐
│  🔍 MetaScan v1.0.0          [⚙] [⭐]     │
├─────────────────────────────────────────────┤
│  [Scan] [Preview] [Editor] [Issues] [Export]│
├─────────────────────────────────────────────┤
│                                             │
│  📄 Page: "My Awesome Blog Post"            │
│  URL: https://blog.example.com/post-1       │
│                                             │
│  ── Basic Meta ──────────────────────────   │
│  Title:       My Awesome Blog Post          │
│  Description: A deep dive into web...       │
│  Canonical:   https://blog.example.com/p/1  │
│  Robots:      index, follow                 │
│  Lang:        en                            │
│                                             │
│  ── Open Graph ──────────────────────────   │
│  og:title:    My Awesome Blog Post          │
│  og:desc:     A deep dive into web...       │
│  og:image:    https://blog.example.com/     │
│               img/og-default.png            │
│  og:url:      https://blog.example.com/p/1  │
│  og:type:     article                       │
│                                             │
│  ── Twitter Card ────────────────────────   │
│  twitter:card:  summary_large_image         │
│  twitter:title: My Awesome Blog Post        │
│  twitter:desc:  A deep dive into web...     │
│  twitter:image: https://blog.example.com/   │
│                 img/twitter.png             │
│                                             │
│  ── Headings ────────────────────────────   │
│  H1: My Awesome Blog Post (1)               │
│  H2: Introduction, Conclusion (2)           │
│  H3: Getting Started (3)                    │
│                                             │
│  [📋 Copy JSON]  [🔄 Re-scan]              │
└─────────────────────────────────────────────┘
```

---

## Screenshot 2: Key Feature — Social Preview

**What to capture:** The Preview tab showing how the page appears on Facebook, X/Twitter, and WhatsApp.

**ASCII Mockup:**

```
┌─────────────────────────────────────────────┐
│  🔍 MetaScan v1.0.0          [⚙] [⭐]     │
├─────────────────────────────────────────────┤
│  [Scan] [Preview] [Editor] [Issues] [Export]│
├─────────────────────────────────────────────┤
│                                             │
│  Platform: [Facebook ▼]                     │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │  ┌───────────────────────────────┐  │    │
│  │  │                               │  │    │
│  │  │  [OG Image Preview]           │  │    │
│  │  │  1200×630px                   │  │    │
│  │  │                               │  │    │
│  │  └───────────────────────────────┘  │    │
│  │  blog.example.com                   │    │
│  │  My Awesome Blog Post               │    │
│  │  A deep dive into web development   │    │
│  │  best practices and modern tools... │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  ── X/Twitter Preview ──────────────────    │
│  ┌─────────────────────────────────────┐    │
│  │  ┌──────────┐                       │    │
│  │  │ [Image]  │  My Awesome Blog Post │    │
│  │  │  Summary │  A deep dive into...  │    │
│  │  │  Large   │  blog.example.com     │    │
│  │  └──────────┘                       │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  ── WhatsApp/Slack Preview ─────────────    │
│  ┌─────────────────────────────────────┐    │
│  │  ┌────┐                             │    │
│  │  │Img │  My Awesome Blog Post       │    │
│  │  │    │  A deep dive into web...    │    │
│  │  └────┘  blog.example.com           │    │
│  └─────────────────────────────────────┘    │
└─────────────────────────────────────────────┘
```

---

## Screenshot 3: Issues Panel

**What to capture:** The Issues tab showing flagged SEO problems with severity indicators.

**ASCII Mockup:**

```
┌─────────────────────────────────────────────┐
│  🔍 MetaScan v1.0.0          [⚙] [⭐]     │
├─────────────────────────────────────────────┤
│  [Scan] [Preview] [Editor] [Issues] [Export]│
├─────────────────────────────────────────────┤
│                                             │
│  ⚠️ 7 Issues Found                          │
│                                             │
│  🔴 Critical (2)                            │
│  ┌─────────────────────────────────────┐    │
│  │ ❌ Missing og:image                  │    │
│  │    Open Graph image is required for │    │
│  │    Facebook/LinkedIn sharing        │    │
│  ├─────────────────────────────────────┤    │
│  │ ❌ Meta description too short (42ch) │    │
│  │    Recommended: 120-160 characters   │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  🟡 Warning (3)                             │
│  ┌─────────────────────────────────────┐    │
│  │ ⚠️ Missing twitter:card             │    │
│  │    Twitter won't show rich preview  │    │
│  ├─────────────────────────────────────┤    │
│  │ ⚠️ og:title missing                 │    │
│  │    Falls back to <title> tag        │    │
│  ├─────────────────────────────────────┤    │
│  │ ⚠️ No canonical URL                 │    │
│  │    Risk of duplicate content        │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  🔵 Info (2)                                │
│  ┌─────────────────────────────────────┐    │
│  │ ℹ️ Title length: 28 chars (short)   │    │
│  ├─────────────────────────────────────┤    │
│  │ ℹ️ No hreflang tags                 │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  [📋 Copy Issues]  [📸 Screenshot]         │
└─────────────────────────────────────────────┘
```

---

## Screenshot 4: Export Options

**What to capture:** The Export tab showing format options and a preview of the exported data.

**ASCII Mockup:**

```
┌─────────────────────────────────────────────┐
│  🔍 MetaScan v1.0.0          [⚙] [⭐]     │
├─────────────────────────────────────────────┤
│  [Scan] [Preview] [Editor] [Issues] [Export]│
├─────────────────────────────────────────────┤
│                                             │
│  Export Format:                             │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐    │
│  │  📄 JSON  │ │  📊 CSV  │ │  📝 HTML  │    │
│  │          │ │          │ │  Report  │    │
│  └──────────┘ └──────────┘ └──────────┘    │
│                                             │
│  ── JSON Preview ──────────────────────     │
│  ┌─────────────────────────────────────┐    │
│  │ {                                   │    │
│  │   "url": "https://blog.example.com", │    │
│  │   "title": "My Awesome Blog Post",  │    │
│  │   "description": "A deep dive...",  │    │
│  │   "og": {                           │    │
│  │     "title": "My Awesome Blog Post",│    │
│  │     "image": "https://...",         │    │
│  │     "type": "article"               │    │
│  │   },                                │    │
│  │   "twitter": {                      │    │
│  │     "card": "summary_large_image"   │    │
│  │   },                                │    │
│  │   "issues": 7                       │    │
│  │ }                                   │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  [📥 Download JSON]  [📋 Copy to Clipboard] │
└─────────────────────────────────────────────┘
```

---

## Notes for Actual Screenshots

1. **Use a real webpage** with meta tags (blog post, product page, documentation)
2. **Social preview** is the hero feature — show realistic Facebook/Twitter card previews
3. **Issues panel** should show clear severity levels with actionable messages
4. **Editor tab** (bonus) should show inline editing with character counters
5. **Export formats** should show clean JSON/CSV output
6. **Extension icon** should be visible in the toolbar
7. **Pro upgrade button** ($7/mo) should be visible but not intrusive
8. **Dark header with tab navigation** is the visual style

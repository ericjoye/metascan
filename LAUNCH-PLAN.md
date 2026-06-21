# LAUNCH PLAN — MetaScan v1.1.0

**Product:** MetaScan — SEO Meta Tags & Social Preview Chrome Extension
**Date:** 2026-06-20
**Status:** Ready for launch (QA PASS — 106/108 tests pass)

---

## Pre-Launch Checklist (MUST DO BEFORE PUBLISHING)

### Code Changes Needed

- [x] **Stripe host_permissions** — Already added to manifest.json (`https://buy.stripe.com/*` and `https://js.stripe.com/*`)
- [ ] **Replace Stripe test URL** in `popup/popup.js` line 287:
  - Current: `https://buy.stripe.com/test_metascan_pro`
  - Replace with: live Stripe Price ID (e.g., `https://buy.stripe.com/XXXXXXXXXX`)
  - **This is the ONLY code change required before publishing**

### Store Listing Assets Needed

- [ ] **Screenshots** (minimum 1, recommended 4-6):
  - Main popup showing Scan tab on a popular site
  - Social Preview tab with platform previews
  - Issues tab with flagged problems
  - Editor tab with character counters
  - Export tab with download options
  - Options page with settings

- [ ] **Promo images**:
  - Small tile: 440x280 px (required)
  - Large tile: 920x680 px (optional)
  - Marquee: 1400x560 px (optional, for featured placement)

- [ ] **Store listing copy** — see `launch/store-listing.md` for full copy

### Landing Page

- [x] **Landing page created** — `landing/index.html` and `landing/style.css`
  - Uses copy from `launch/landing.md`
  - Dark theme, responsive, feature grid, pricing section, CTA
  - **Still needs:** deployment to hosting (GitHub Pages, Vercel, Netlify, or custom domain)
  - **Still needs:** Chrome Web Store link added once published

### Privacy Policy

- [x] **PRIVACY.md exists** — Chrome Web Store requires a privacy policy
  - Discloses: no personal data collected, no tracking, all processing local
  - **Still needs:** contact email address filled in

---

## Launch Channels (Priority Order)

### 1. Chrome Web Store (PRIMARY — Day 1)

This is the main distribution channel. Chrome extensions live in the store.

**Steps:**
1. Create Chrome Web Store Developer account ($5 one-time fee)
2. Upload extension ZIP (pack the metascan/ directory, exclude README, BUILDER-REPORT, TEST-REPORT, launch/ folder)
3. Fill in store listing from `launch/store-listing.md`
4. Upload screenshots and promo images
5. Submit for review (typically 1-3 business days for initial review)
6. Set pricing: Free with in-app purchase for Pro tier

### 2. Product Hunt (Day 1-2)

Great for developer/SEO tool launches. Drives early adopters and backlinks.

**Steps:**
1. Create Product Hunt account
2. Prepare tagline: "See exactly how your pages look in search and social"
3. Prepare first comment: story behind building MetaScan
4. Submit for launch (schedule for a Tuesday/Wednesday — best days)
5. Coordinate with network for initial upvotes

### 3. Hacker News (Day 1)

Show HN: "MetaScan — a Chrome extension to preview meta tags and social sharing"

**Steps:**
1. Submit to news.ycombinator.com
2. Best time: Monday-Thursday, 8-10am EST
3. Engage with comments actively

### 4. Reddit (Day 1-3)

Target subreddits:
- r/SEO — "I built a free Chrome extension to check meta tags and social previews"
- r/webdev — "MetaScan — instant social previews for any webpage"
- r/chrome — "Free extension for meta tag analysis"
- r/SideProject — "Launched MetaScan after 2 weeks of building"

**Rules:** Follow each subreddit's self-promotion rules. Lead with value, not promotion.

### 5. Twitter/X (Day 1-7)

**Launch tweet:**
> I built MetaScan — a free Chrome extension that shows you exactly how your pages look in search results and social feeds.
>
> Instant meta tag extraction
> Social previews for Facebook, X, WhatsApp
> 15+ SEO issue checks
> Edit & export reports
>
> Free. No signup. Works on every page.
>
> [link]

**Follow-up tweets (Days 2-7):**
- Screenshot of a surprising social preview finding
- "Most pages are missing X meta tag" stat from testing
- Thread: "How I built MetaScan in 2 weeks"
- Feature highlight: the Editor tab
- User testimonial (if any from beta testers)

### 6. SEO / Content Marketing (Week 1+)

**Blog posts to write:**
- "How to Preview Your Social Sharing Links Before Posting" (target: social media managers)
- "15 Meta Tags Every Webpage Needs (And How to Check Them)" (target: SEO beginners)
- "MetaScan vs Manual Inspection: A Time Comparison" (target: developers)

**SEO keywords to target:**
- "meta tags checker"
- "open graph preview"
- "twitter card validator"
- "social sharing preview tool"
- "seo chrome extension"

### 7. Email Outreach (Week 1-2)

**Targets:**
- SEO bloggers and YouTubers (offer free Pro licenses for reviews)
- Web development newsletters (e.g., Web Dev Weekly, JavaScript Weekly)
- Indie hacker communities

**Pitch:** "Free Chrome extension your readers will actually use — meta tag analysis and social previews in one click."

---

## First-Week Plan

### Day 1 (Launch Day)
- [ ] Submit to Chrome Web Store (morning)
- [ ] Post on Product Hunt
- [ ] Show HN on Hacker News
- [ ] Launch tweet on X/Twitter
- [ ] Post on r/SEO, r/webdev (follow sub rules)
- [ ] Send to personal network (Discord, Slack communities)

### Day 2
- [ ] Follow up on Product Hunt comments
- [ ] Post on r/chrome, r/SideProject
- [ ] Second tweet: feature highlight or surprising finding
- [ ] Check Chrome Web Store review status
- [ ] Respond to all comments and feedback

### Day 3
- [ ] Write and publish first blog post
- [ ] Share blog post on relevant subreddits
- [ ] Third tweet: screenshot or tip
- [ ] Reach out to 5 SEO bloggers for reviews
- [ ] Check analytics (if Plausible added)

### Day 4-5
- [ ] Engage with all feedback and reviews
- [ ] Fix any critical bugs reported by early users
- [ ] Post "thank you" update on Product Hunt
- [ ] Share user feedback on social media
- [ ] Submit to web dev newsletters

### Day 6-7
- [ ] Weekly review: installs, reviews, feedback
- [ ] Plan v1.2 based on user feedback
- [ ] Write week-one retrospective blog post
- [ ] Update landing page with social proof (review quotes, install count)

---

## Success Metrics

| Metric | Target (Week 1) | Target (Month 1) |
|--------|-----------------|------------------|
| Chrome Web Store installs | 100 | 1,000 |
| Product Hunt upvotes | 50 | — |
| Store rating | 4.0+ | 4.5+ |
| Twitter impressions | 10,000 | 50,000 |
| Landing page visits | 500 | 5,000 |
| Pro conversions | — | 2% of installs |

---

## Post-Launch Priorities

1. **Monitor reviews** — Respond to every review within 24 hours
2. **Fix bugs fast** — Ship v1.1.1 within a week if any critical issues
3. **Build email list** — Add "notify me about Pro" signup on landing page
4. **Iterate on feedback** — Top 3 user requests become v1.2 roadmap
5. **SEO content** — One blog post per week targeting long-tail keywords
6. **Backlinks** — Get listed in "best SEO tools" roundups

---

## Known Issues (Non-Blocking)

Two minor cosmetic issues to fix in v1.2:

1. **TEAM tier badge label** — `popup/popup.js` line 300: `updateTierBadge()` shows "Pro" for TEAM tier. Fix: `tier === 'free' ? 'Free' : tier === 'team' ? 'Team' : 'Pro'`. Also add `.badge-team { background: #8b5cf6; color: white; }` to popup.css.

2. **Upgrade button visual feedback** — `popup/popup.js` lines 286-288: Code calls `window.open()` without changing button text to "Opening payment..." as described in BUILDER-REPORT.

---

## Human Actions Required (GATED — See escalations/metascan.md)

The following actions CANNOT be performed by agents. They require human execution:

1. Chrome Web Store Developer account creation and $5 fee payment
2. Stripe account setup and live Price ID creation
3. Domain registration and hosting setup for landing page
4. Screenshot capture (requires Chrome browser)
5. Product Hunt account and launch scheduling
6. Social media account login and posting
7. Email outreach (requires email account access)

See `~/hermes_ops/escalations/metascan.md` for detailed step-by-step instructions.

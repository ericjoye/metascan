# MetaScan — Pricing Strategy

## Model: Freemium (Free + Pro)

## Free Tier — "MetaScan Free"

**Price: $0 / forever**

Includes:
- Full meta tag extraction on any page
- Social previews (Facebook/LinkedIn, X/Twitter, WhatsApp/Slack)
- 15+ SEO issue checks
- Editor tab with character counters
- JSON and CSV export
- Options page (auto-scan toggle, badge toggle)

**Why free:** Chrome extensions live or die by install volume. A generous free tier drives adoption, word-of-mouth, and store ranking. The free tier covers everything a casual user or small site owner needs.

## Pro Tier — "MetaScan Pro"

**Price: $7/month or $59/year (25% savings)**

Includes everything in Free, plus:
- Auto-scan on page load (no need to click the icon)
- HTML/PDF report export
- Custom issue rules (add your own checks)
- Bulk page scanning (scan all tabs at once)
- Priority email support
- Pro badge in extension UI

**Why $7/mo:** Comparable SEO tools (Ahrefs, Semrush) charge $99+/mo. A $7 price point is impulse-buy territory for freelancers, small agencies, and indie hackers who need SEO tools but can't justify enterprise pricing. The annual plan improves LTV and reduces churn.

## Future: Team Tier — "MetaScan Team"

**Price: $19/month (3 seats) or $49/month (10 seats)**

Planned for v1.5+:
- Shared team dashboard
- Centralized license management
- Audit logging
- Slack/email report delivery
- Custom branding on exports

## Stripe Setup Notes

- Current code uses test URL: `https://buy.stripe.com/test_metascan_pro`
- Replace with live Stripe Price ID after creating products in Stripe Dashboard
- Suggested Stripe products:
  - `MetaScan Pro Monthly` — $7.00/month recurring
  - `MetaScan Pro Annual` — $59.00/year recurring
- License key format: `PRO-XXXX-XXXX` (already implemented in service worker)
- Consider Stripe Checkout (hosted page) for simplicity, or Stripe Elements for embedded

## Upgrade Path

1. User clicks "⭐ Upgrade" button in extension header
2. Opens Stripe Checkout page in new tab
3. After successful payment, Stripe webhook generates license key
4. User enters license key in Options page
5. Extension validates and unlocks Pro features

## Conversion Optimization Ideas

- Show a subtle "Pro" badge on features the user can't access (but don't block core functionality)
- After 10 scans, show a gentle "Love MetaScan? Go Pro" prompt
- Annual plan default (with monthly as option) to maximize LTV
- 7-day free trial of Pro (no credit card required) to reduce friction

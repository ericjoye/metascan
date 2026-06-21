# Privacy Policy — MetaScan

**Last updated:** June 20, 2026

## Overview

MetaScan ("we", "our", "the extension") is a Chrome extension that helps users analyze and edit meta tags on web pages. We are committed to protecting your privacy.

## Data Collection

**MetaScan does NOT collect, store, or transmit any personal data.**

All analysis and processing happens locally in your browser. When you use MetaScan:

- **No data is sent to external servers.** The extension reads meta tags from the current webpage and displays them in the popup. Nothing is uploaded anywhere.
- **No tracking or analytics.** We do not use Google Analytics, Mixpanel, or any other tracking service.
- **No cookies.** MetaScan does not set or read any cookies.
- **No account required.** There is no signup, login, or user account system.

## Permissions

MetaScan requests the following Chrome permissions:

- **activeTab** — To access the currently active tab when you click the extension icon. Used only to read meta tags from the page you're viewing.
- **scripting** — To inject content scripts that extract meta tags from web pages.
- **storage** — To save your preferences (auto-scan toggle, badge toggle, license key) locally in your browser using `chrome.storage.local`. This data never leaves your device.
- **downloads** — To download exported reports (JSON, CSV, HTML) that you explicitly request.

## Host Permissions

MetaScan requests `<all_urls>` access because it needs to read meta tags from any webpage you choose to analyze. This permission is used solely for local analysis — no data is transmitted externally.

## Third-Party Services

MetaScan integrates with **Stripe** for Pro tier payments. When you click the "Upgrade" button, you are redirected to Stripe's hosted checkout page. Stripe's own privacy policy applies to that transaction. MetaScan does not process or store payment information.

## License Keys

If you purchase a Pro license, your license key is stored locally in your browser via `chrome.storage.local`. The extension validates the key format locally. No license key data is sent to any server.

## Changes to This Policy

We may update this privacy policy from time to time. Any changes will be reflected in the extension's listing on the Chrome Web Store and in the extension's source code.

## Contact

If you have questions about this privacy policy, contact us at: [YOUR EMAIL ADDRESS]

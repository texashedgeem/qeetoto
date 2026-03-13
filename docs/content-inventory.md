# Qeetoto Content Inventory
## Source: consentwise.io (texashedgeem/consentwise)
## Purpose: Complete content reference for porting to Next.js

---

## Pages

| Page | Source File | URL | Notes |
|------|------------|-----|-------|
| Home | `index.html` | `/` | Hero, intro paragraph, services grid |
| About Us | `about-us.html` | `/about-us/` | Hero banner, about content |
| Learn | `learn/index.html` | `/learn/` | Educational video library (Open Banking) |
| Services | `services/index.html` | `/services/` | Services listing grid |
| Individual Service | `_services/<slug>.md` | `/services/<slug>/` | Per-service detail pages |
| Individual Video | `_videos/<slug>.md` | `/videos/<slug>/` | Per-video page with YouTube embed |
| Promo Videos | `_services/promo-videos.md` | `/promo-videos/` | Commercial video service page |

---

## Services (in order)

| Order | Slug | Title | Summary |
|-------|------|-------|---------|
| 1 | consent-for-rent | Consent for Rent | Gain long term AIS consent for as little as £1 per bank per day. |
| 2 | payment-testing | Payment Testing | Our agents can execute live payments including bulk payments on business accounts to test your Open Banking Payments product. |
| 3 | bespoke-testing | Bespoke Testing | Let us know what your bespoke requirements are and we will help you test with our live bank accounts. |
| 4 | expert-troubleshooting | Screensharing | Get our Open Experts to join your troubleshooting screen-share sessions with Banks, API Aggregators, and your own development team. |
| 5 | promo-videos | Promo Videos | Produce a video of your Open Banking journey that you can use for marketing, training, or any other purpose. |
| 6 | consulting | Consulting | We provide Open Banking experts to help you connect your app or service to Banks. |
| 7 | bug-hunt | Bug Hunt | Point us to your app and let us play with it. We will report any bugs we find into the tool of your choice. |
| 8 | join-us | Join Us | Join us as an Agent and earn a secondary income for very little effort or commitment. |

---

## Video Library (11 videos)

| Order | Slug | Title | YouTube ID | Status |
|-------|------|-------|-----------|--------|
| 1 | psd2-open-banking-solution-architecture | Ping Identity's PSD2 & Open Banking Solution Architecture | Iton7kALNms | Live |
| 2 | open-banking-explained | Open Banking Explained | 3PtGXB0eofc | Live |
| 3 | strong-customer-authentication | PSD2 Strong Customer Authentication (SCA) Explained | kJfTz-jypEU | Live |
| 4 | uk-open-banking-api-standards | UK Open Banking API Standards — A Technical Overview | YMYShcUJPz0 | Live |
| 5 | tpp-registration-open-banking-directory | TPP Registration and the Open Banking Directory | rypDMxN9uuM | Live |
| 6 | account-information-services | Account Information Services (AIS) Explained | pJ5jvpZD3dg | Live |
| 7 | open-banking-testing-best-practices | Open Banking Testing — Best Practices for TPPs | TBD | **MISSING** — CWPD-32 |
| 7 | payment-initiation-services | Payment Initiation Services (PIS) Explained | jLFjz0e-fiM | Live |
| 8 | future-of-open-banking-uk | The Future of Open Banking in the UK | Q4iuzeS5dKg | Live |
| 9 | variable-recurring-payments | Variable Recurring Payments (VRP) Explained | -8PwbtE0h7g | Live |
| 10 | oauth-consent-flows-open-banking | OAuth and Consent Flows in Open Banking | ZV5yTm4pT8g | Live |

**Note:** CWPD-29 tracks a 20-video curriculum — ~10 more videos to add. CWPD-32 = last TBD video URL needed.

---

## Layouts

| Name | Source | Purpose |
|------|--------|---------|
| default | `_layouts/default.html` | Main layout — top nav (About Us, Learn, Services, Request Test), footer |
| service | `_layouts/service.html` | Service detail page layout |
| video | `_layouts/video.html` | Video page — title hero, YouTube embed (rel=0), description, tags, CTA |

---

## Navigation

Top nav: **About Us** | **Learn** | **Services** | **Request Test**

---

## Footer

Single line: `Consentwise.io is a tradename of Qeetoto Limited - a company registered in England and Wales (No. 08605975)`

**For qeetoto repo:** Update to reference qeetoto.io directly. The legal entity (Qeetoto Limited) stays the same.

---

## CSS Notes

- `assets/css/style.css` — large compiled file (~4300 lines)
- Key classes: `.video-tile-grid`, `.video-embed-wrapper`, `.video-hero`, `.video-hero h1`, `.video-tag`, `.video-tile-placeholder-img`
- `.section-banner { height: 300px }` + `.section-banner .middle { padding-top: 75px }` — hero banner sizing
- `.video-tile-grid h4 { font-size: 1.5rem }` — video tile heading size
- YouTube embeds use `rel=0` to suppress end-screen recommendations
- In Next.js: port to CSS modules or Tailwind — do NOT carry over the compiled stylesheet

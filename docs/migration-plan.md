# Migration Plan: consentwise.io → qeetoto (Next.js)
## Jekyll → Next.js + Vercel

---

## Tech Stack Decision

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js 14 (App Router) | React ecosystem, Stripe/OpenAI/Vercel doc stacks all use it — strong pattern library |
| Hosting | Vercel (free tier) | Equivalent to GitHub Pages for static/SSG, push-to-deploy, custom domain support |
| Styling | Tailwind CSS | Replaces the 4300-line compiled stylesheet cleanly |
| Content | MDX or JSON files | Replaces Jekyll `_videos/` and `_services/` collections |
| Package manager | npm | Matches consentwise tooling |

---

## Repository Setup

```bash
npx create-next-app@latest qeetoto --typescript --tailwind --app --src-dir
cd qeetoto
git init
git remote add origin git@github.com:<org>/qeetoto.git
```

---

## File Mapping: Jekyll → Next.js

### Pages

| Jekyll | Next.js App Router |
|--------|--------------------|
| `index.html` | `src/app/page.tsx` |
| `about-us.html` | `src/app/about-us/page.tsx` |
| `learn/index.html` | `src/app/learn/page.tsx` |
| `services/index.html` | `src/app/services/page.tsx` |
| `_services/<slug>.md` | `src/app/services/[slug]/page.tsx` + `content/services/<slug>.json` |
| `_videos/<slug>.md` | `src/app/videos/[slug]/page.tsx` + `content/videos/<slug>.json` |
| `_layouts/default.html` | `src/app/layout.tsx` + `src/components/Nav.tsx` + `src/components/Footer.tsx` |
| `_layouts/service.html` | `src/components/ServiceLayout.tsx` |
| `_layouts/video.html` | `src/components/VideoLayout.tsx` |

### Content Data

Replace Jekyll front matter with JSON files:

**`content/services/consent-for-rent.json`:**
```json
{
  "title": "Consent for Rent",
  "slug": "consent-for-rent",
  "order": 1,
  "summary": "Gain long term AIS consent for as little as £1 per bank per day."
}
```

**`content/videos/open-banking-explained.json`:**
```json
{
  "title": "Open Banking Explained",
  "slug": "open-banking-explained",
  "order": 2,
  "youtube_id": "3PtGXB0eofc",
  "summary": "A clear introduction to Open Banking — what it is, how it works, and why it matters."
}
```

### Assets

| Jekyll | Next.js |
|--------|---------|
| `assets/css/style.css` | Tailwind classes (do NOT port the compiled CSS) |
| `assets/images/` | `public/images/` |
| Favicon etc | `public/` root |

---

## Component Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (Nav + Footer)
│   ├── page.tsx                # Home
│   ├── about-us/page.tsx
│   ├── learn/page.tsx          # Video library grid
│   ├── services/
│   │   ├── page.tsx            # Services listing
│   │   └── [slug]/page.tsx     # Individual service
│   └── videos/
│       └── [slug]/page.tsx     # Individual video with embed
├── components/
│   ├── Nav.tsx
│   ├── Footer.tsx
│   ├── VideoGrid.tsx
│   ├── VideoCard.tsx
│   ├── ServiceCard.tsx
│   ├── YouTubeEmbed.tsx        # rel=0 embed wrapper
│   └── HeroBanner.tsx
└── lib/
    ├── getVideos.ts            # Load + sort video JSON files
    └── getServices.ts          # Load + sort service JSON files
content/
├── videos/                     # 11 JSON files (one per video)
└── services/                   # 8 JSON files (one per service)
```

---

## YouTube Embed Component

```tsx
// src/components/YouTubeEmbed.tsx
export function YouTubeEmbed({ id, title }: { id: string; title: string }) {
  return (
    <div className="relative pb-[56.25%] h-0 overflow-hidden">
      <iframe
        src={`https://www.youtube.com/embed/${id}?rel=0`}
        title={title}
        className="absolute top-0 left-0 w-full h-full"
        allowFullScreen
      />
    </div>
  );
}
```

---

## Visual Differentiation (superficial CSS changes)

Changes to make qeetoto visually distinct from consentwise.io without rebuilding content:

| Element | consentwise.io | qeetoto |
|---------|----------------|---------|
| Primary colour | Current brand colour | Change to a different accent (e.g. slate/indigo) |
| Font | Current | Different Google Font pairing |
| Logo/wordmark | "ConsentWise" | "Qeetoto" |
| Hero layout | Section banners 300px | Adjust padding/sizing slightly |
| Footer | "Consentwise.io is a tradename..." | "qeetoto.io is a tradename..." |
| Page title | ConsentWise | Qeetoto |

---

## Vercel Deployment

```bash
npm i -g vercel
vercel login
vercel --prod
```

Or connect GitHub repo in Vercel dashboard — auto-deploys on push to `main`.

Custom domain: Add `qeetoto.io` in Vercel project settings → Domains.

---

## Session 1 Scope (recommended)

1. Create repo, scaffold Next.js app with Tailwind
2. Port Nav + Footer + Root Layout
3. Port Home page
4. Port Video data to JSON + VideoGrid component
5. Port Learn page (video library)
6. Set up Vercel deployment
7. Confirm site is live at Vercel preview URL

Session 1 goal: **live Next.js site with home + learn pages deploying to Vercel**.

---

## SDLC to Reuse from consentwise

- Commit hook pattern: `.githooks/commit-msg` — copy verbatim, new Jira project key
- Playwright test structure: `tests/e2e/pages/` — port navigation and page tests
- CI workflow: `.github/workflows/ci.yml` — copy and update project name
- Release workflow: `.github/workflows/release.yml` — copy verbatim
- Branch protection: enforce_admins, require 1 review, required CI status check
- Session logging: `development_session_log/session-summary-YYYY-MM-DD.md`

# Qeetoto — Session 1 Brief
## First Claude session in the new repo

---

## Context

This project is a port of consentwise.io into a new Next.js repository called `qeetoto`. The source material (content, SDLC patterns, Jira structure, Claude behaviours) all originate from the consentwise project. The goal is to reuse everything and not start from scratch.

Reference materials in this repo:
- `docs/content-inventory.md` — all pages, services, videos with data
- `docs/migration-plan.md` — Jekyll → Next.js file mapping and component structure
- `CLAUDE.md` — full project context including SDLC, Jira, and Claude behaviour standards

---

## Session 1 Goals

Deliver a live Next.js site deploying to Vercel with the following pages working:

1. Home page
2. Learn page (video library grid)
3. Navigation (About Us, Learn, Services, Request Test)
4. Footer (Qeetoto legal line)
5. At least one video detail page

---

## Step-by-Step

### Step 1 — Scaffold

```bash
npx create-next-app@latest . --typescript --tailwind --app --src-dir
```

Accept all defaults. This gives you: TypeScript, Tailwind, App Router, `src/` directory.

### Step 2 — Install commit hook

```bash
mkdir .githooks
# Copy .githooks/commit-msg from consentwise verbatim
# Update Jira project key from CWPD to [NEW_PROJECT_KEY]
git config core.hooksPath .githooks
chmod +x .githooks/commit-msg
```

### Step 3 — Content data

Create `content/videos/` with one JSON file per video. Use data from `docs/content-inventory.md`. Example:

```bash
mkdir -p content/videos content/services
```

### Step 4 — Components

Build in this order:
1. `Nav.tsx` — top nav with links
2. `Footer.tsx` — single legal line
3. `YouTubeEmbed.tsx` — iframe with rel=0
4. `VideoCard.tsx` — thumbnail + title card
5. `VideoGrid.tsx` — grid of VideoCards

### Step 5 — Pages

1. `src/app/layout.tsx` — root layout wrapping Nav + Footer
2. `src/app/page.tsx` — home page
3. `src/app/learn/page.tsx` — video library (pulls from `content/videos/`)
4. `src/app/videos/[slug]/page.tsx` — video detail with embed

### Step 6 — Vercel

```bash
npx vercel
```

Connect to GitHub for auto-deploy on push to `main`.

### Step 7 — Playwright

Copy test structure from consentwise:
- `tests/e2e/pages/navigation.spec.js`
- `tests/e2e/pages/videos.spec.js`
- `playwright.config.js` — update baseURL to Next.js dev port (3000)

### Step 8 — CI

Copy `.github/workflows/ci.yml` from consentwise. Update:
- Jekyll start command → `npm run dev`
- Port references: 4001 → 3000

---

## Visual Differentiation

Keep all content identical to consentwise.io. Change only:

- **Site name**: "Qeetoto" (not ConsentWise)
- **Primary accent colour**: Pick a different Tailwind colour class (e.g. `indigo` instead of current brand)
- **Footer text**: "qeetoto.io is a tradename of Qeetoto Limited..."

---

## Jira Setup

If a new Jira project is needed for qeetoto tracking:
1. Create new project in https://open-banking.atlassian.net
2. Use company-managed Kanban (same as CWPD)
3. Create Initiative CWPD-equivalent hierarchy
4. Note new project key and update `.githooks/commit-msg`

See `docs/jira-setup.md` for full guide.

---

## First Commit

```
feat!(QTO-1): scaffold Next.js app with Tailwind and core layout
```

(Replace QTO-1 with your actual first ticket key)

---

## Definition of Done for Session 1

- [ ] `npm run dev` serves the site locally
- [ ] Vercel preview URL is live
- [ ] Home and Learn pages render correctly
- [ ] Navigation links work
- [ ] At least one video page loads with YouTube embed
- [ ] Commit hook is active and enforced
- [ ] Session summary committed to `development_session_log/`

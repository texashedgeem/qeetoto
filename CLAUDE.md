# Qeetoto — CLAUDE.md
## Bootstrap context for Claude Code sessions

---

## Project Overview

- **Repo**: `<org>/qeetoto` (GitHub — to be created)
- **Live site**: https://qeetoto.io (once deployed)
- **Local path**: `/Users/simonhewins/repo_git/qeetoto` (suggested)
- **Tech stack**: Next.js 14 (App Router) + Tailwind CSS, deployed on Vercel
- **Purpose**: Port of consentwise.io content into a new tech stack — same content, different brand/visual treatment
- **Origin project**: `texashedgeem/consentwise` (Jekyll + GitHub Pages) — all SDLC patterns sourced from there

---

## Jira

- **Instance**: https://open-banking.atlassian.net
- **Project**: QTO (Qeetoto — company-managed Kanban)
- **Auth**: simon.hewins@gmail.com + JIRA_TOKEN in ~/.zshrc
- **CRITICAL**: Must use `Authorization: Basic <base64(email:token)>` — curl `-u` flag does NOT work
  ```bash
  JIRA_AUTH=$(echo -n 'simon.hewins@gmail.com:'"$JIRA_TOKEN"'' | base64)
  curl -H "Authorization: Basic $JIRA_AUTH" ...
  ```
- **Search API**: Use POST to `/rest/api/3/search/jql` — the GET endpoint has been removed
- **Ticket hierarchy**: Initiative > Epic > Story
- **Issue type IDs**: Initiative=10017, Epic=10000, Story=10016
- **Transition IDs** (verify for QTO project): Backlog=11, Selected=21, In Progress=31, Done=41
- **Epic→Initiative parent**: Cannot set via API in company-managed Kanban — use "Relates" issue link; set parent manually in Jira UI
- **Story→Epic parent**: CAN be set via API: `{"fields": {"parent": {"key": "QTO-X"}}}`
- **Priority model**: Initiatives = Medium, Epics and Stories = Low

---

## GitHub

- **Approver account**: `simonhewinszodia` — second account for PR approvals (Simon cannot self-approve)
- **Branch protection on `main`**:
  - Require 1 approving review (dismiss stale reviews on new commits)
  - Required status check: Playwright CI must pass before merge
  - `enforce_admins: true` — no bypass
  - Force push and deletion blocked
- **Release trigger**: `feat!(QTO-NNN):` → major; `feat(` → minor; all else → patch

---

## SDLC Controls

- **Pre-commit hook**: `.githooks/commit-msg` — enforces `TYPE[!](QTO-NNN): description`
  - Valid types: feat, fix, docs, test, chore, ci, style, refactor
  - Activate on new clone: `git config core.hooksPath .githooks`
- **Playwright**: `npm test` — tests in `tests/e2e/pages/`, config in `playwright.config.js`
  - baseURL: `http://localhost:3000` (Next.js dev server)
- **CI**: `.github/workflows/ci.yml` — runs on every push
  - Starts Next.js dev server, runs Playwright, uploads JUnit XML + HTML artifact
- **Release workflow**: `.github/workflows/release.yml` — auto GitHub Release on merge to main
- **Session logging**: `development_session_log/session-summary-YYYY-MM-DD.md` — committed at session end

---

## Local Dev

```bash
npm run dev          # Start Next.js dev server on port 3000
npm test             # Run Playwright tests (requires dev server running)
npm run build        # Production build
```

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (Nav + Footer)
│   ├── page.tsx                # Home
│   ├── about-us/page.tsx
│   ├── learn/page.tsx          # Video library grid
│   ├── services/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   └── videos/
│       └── [slug]/page.tsx
├── components/
│   ├── Nav.tsx
│   ├── Footer.tsx
│   ├── VideoGrid.tsx
│   ├── VideoCard.tsx
│   ├── ServiceCard.tsx
│   ├── YouTubeEmbed.tsx
│   └── HeroBanner.tsx
└── lib/
    ├── getVideos.ts
    └── getServices.ts
content/
├── videos/          # JSON files — one per video (11 total from consentwise)
└── services/        # JSON files — one per service (8 total from consentwise)
docs/
├── content-inventory.md
├── migration-plan.md
├── jira-setup.md
└── session-01-brief.md
development_session_log/
└── session-summary-YYYY-MM-DD.md
tests/
├── e2e/pages/
└── helpers/
```

---

## Content Summary

**8 services** (in order): Consent for Rent, Payment Testing, Bespoke Testing, Screensharing, Promo Videos, Consulting, Bug Hunt, Join Us

**11 videos** (key ones):
- Open Banking Explained (youtube: 3PtGXB0eofc)
- PSD2 SCA Explained (youtube: kJfTz-jypEU)
- UK Open Banking API Standards (youtube: YMYShcUJPz0)
- Variable Recurring Payments (youtube: -8PwbtE0h7g)
- + 7 more — see `docs/content-inventory.md`

**Navigation**: About Us | Learn | Services | Request Test

**Footer**: `qeetoto.io is a tradename of Qeetoto Limited - a company registered in England and Wales (No. 08605975)`

---

## Two Separate Pages (important distinction — carried over from consentwise)

- `/learn/` — educational resource, Open Banking video library for users
- `/services/promo-videos/` — commercial service, ConsentWise/Qeetoto produces promo videos for clients
- Both show the videos collection but serve different audiences

---

## Claude Behaviour Standards

These are the working patterns established in the consentwise project. Apply them here too.

### 1. Story Creation
When asked to "create a story for this":
1. Find the best-fit open Epic in QTO
2. If no suitable Epic → create one first
3. If no suitable Initiative for that Epic → create Initiative first
4. Epic→Initiative parent must be set manually in Jira UI (API not supported)
5. Story→Epic parent CAN be set via API

### 2. In Progress Focus
At session start, query Jira for all QTO tickets with status = "In Progress" and display as a table. If none, flag it. During the session, if work starts without an In Progress ticket, prompt: "This work doesn't have an In Progress ticket — would you like to transition one before we start?"

### 3. Jira Comments at Key Points
Add a Jira comment automatically (no need to be asked) at:
1. Starting work — what and approach
2. Enhancing a description — what was added
3. Transitioning to Done — what delivered, output URL, date (DD Mon YYYY), ACs confirmed
4. Conscious backlog decision — reason and dependencies
5. Uploading attachments — what captured and why

Comments: dated DD Mon YYYY, plain English, include output link where relevant.

### 4. "claude remind me" Report
Trigger phrase: "claude remind me" (also: "from your memory what should I be working on")

Produce three sections:
1. **From memory** — three markdown tables: Active/In Progress, Planned/Backlog, Not confident captured in Jira (gap list). Columns: What | Jira? | Notes. Coverage: ✅ well described | ⚠️ incomplete/stale | ❓ no ticket. End with numbered prioritised recommendations.
2. **Jira status** — live query: counts table (Status × Type) + open tickets table (Key | Type | Status | Priority | Summary)
3. **Last session** — one line: session number, date, file path in `development_session_log/`

### 5. Jira Acceptance Criteria Format
AC items numbered AC1, AC2, AC3 — each on a new line, plain English.

### 6. Description Enhancement
"Enhance this description" means apply CWPD-2 level of detail: background/context, what it does, what is outstanding, GitHub links, ACs.

---

## Origin Project Reference

All content, SDLC patterns, and Claude behaviours originate from `texashedgeem/consentwise`.

Key reference files from that project (read them if you need more detail):
- `development_session_log/session-summary-2026-03-13.md` — Session 3 summary (most recent)
- `.githooks/commit-msg` — commit hook to copy
- `.github/workflows/ci.yml` — CI workflow to copy
- `.github/workflows/release.yml` — release workflow to copy
- `playwright.config.js` — Playwright config to adapt

---

## Session Log

| Session | Date | Summary File |
|---------|------|-------------|
| 1 | TBD | `development_session_log/session-summary-<date>.md` |

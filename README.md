# Qeetoto

Next.js 14 website for [qeetoto.io](https://qeetoto.io) — a port of consentwise.io into a new tech stack.

## Getting Started

```bash
npm install
npm run dev      # dev server on http://localhost:3000
npm run build    # production build
npm test         # Playwright E2E tests (requires dev server running)
```

## Post-Clone Setup

After cloning, activate the commit hook:

```bash
git config core.hooksPath .githooks
```

This enforces the required commit message format (see below). Without this step the hook will not run and non-conformant commits will not be caught locally.

## Commit Message Format

All commits must follow this format:

```
TYPE[!](QTO-NNN): short description
```

| Part | Values |
|------|--------|
| `TYPE` | `feat`, `fix`, `docs`, `test`, `chore`, `ci`, `style`, `refactor` |
| `!` | Optional — marks a breaking change, triggers a major version bump |
| `QTO-NNN` | Jira ticket reference |

**Examples:**
```
feat(QTO-27): add Nav component with top-level links
fix(QTO-33): correct VideoCard thumbnail aspect ratio
docs(QTO-46): document developer onboarding steps in README
feat!(QTO-1): release v1.0.0
```

## Tech Stack

- [Next.js 14](https://nextjs.org) — App Router
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)
- [Vercel](https://vercel.com) — hosting
- [Playwright](https://playwright.dev) — E2E testing

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # Shared React components
└── lib/              # Data helpers (getVideos, getServices)
content/
├── videos/           # JSON files — one per video
└── services/         # JSON files — one per service
tests/
└── e2e/pages/        # Playwright E2E tests
```

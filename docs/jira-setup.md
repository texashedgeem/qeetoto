# Jira Setup Guide — New Project
## Reusing CWPD patterns for qeetoto

---

## Jira Instance

- URL: https://open-banking.atlassian.net
- Auth: simon.hewins@gmail.com + JIRA_TOKEN

**CRITICAL — Auth pattern:**
```bash
JIRA_AUTH=$(echo -n 'simon.hewins@gmail.com:'"$JIRA_TOKEN"'' | base64)
curl -H "Authorization: Basic $JIRA_AUTH" \
     -H "Content-Type: application/json" \
     https://open-banking.atlassian.net/rest/api/3/...
```
Never use curl `-u` flag — it does not work with Atlassian Cloud.

---

## Create New Project

1. Go to https://open-banking.atlassian.net → Projects → Create project
2. **Type**: Scrum or Kanban — use **company-managed Kanban** (matches CWPD)
3. **Name**: Qeetoto Platform Development (or similar)
4. **Key**: QTO (update commit hook and CLAUDE.md)

---

## Issue Type IDs (reuse from CWPD — same instance)

| Type | ID |
|------|----|
| Initiative | 10017 |
| Epic | 10000 |
| Story | 10016 |
| Task | 10002 |

Verify with:
```bash
curl -H "Authorization: Basic $JIRA_AUTH" \
  "https://open-banking.atlassian.net/rest/api/3/issuetype" | python3 -m json.tool | grep -A2 '"name"'
```

---

## Transition IDs (verify per project — may differ from CWPD)

CWPD values (use as reference, verify for new project):

| Status | ID |
|--------|----|
| Backlog | 11 |
| Selected for Development | 21 |
| In Progress | 31 |
| Done | 41 |

Get transitions for your project:
```bash
# Get a ticket key first, then:
curl -H "Authorization: Basic $JIRA_AUTH" \
  "https://open-banking.atlassian.net/rest/api/3/issue/QTO-1/transitions" | python3 -m json.tool
```

---

## Ticket Hierarchy

Same as CWPD:
```
Initiative
└── Epic (link to Initiative via "Relates" — parent API not supported in company-managed Kanban)
    └── Story (parent CAN be set via API)
```

Set Story → Epic parent:
```bash
curl -X PUT \
  -H "Authorization: Basic $JIRA_AUTH" \
  -H "Content-Type: application/json" \
  -d '{"fields": {"parent": {"key": "QTO-2"}}}' \
  "https://open-banking.atlassian.net/rest/api/3/issue/QTO-3"
```

Set Epic → Initiative link (workaround):
```bash
cat > /tmp/link.json << 'ENDJSON'
{
  "type": {"name": "Relates"},
  "inwardIssue": {"key": "QTO-2"},
  "outwardIssue": {"key": "QTO-1"}
}
ENDJSON

curl -X POST \
  -H "Authorization: Basic $JIRA_AUTH" \
  -H "Content-Type: application/json" \
  -d @/tmp/link.json \
  "https://open-banking.atlassian.net/rest/api/3/issueLink"
```

---

## Priority Model

| Type | Priority |
|------|----------|
| Initiative | Medium |
| Epic | Low |
| Story | Low |

Set priority:
```bash
curl -X PUT \
  -H "Authorization: Basic $JIRA_AUTH" \
  -H "Content-Type: application/json" \
  -d '{"fields": {"priority": {"name": "Low"}}}' \
  "https://open-banking.atlassian.net/rest/api/3/issue/QTO-3"
```

---

## Search API

**Use POST — GET endpoint has been removed:**
```bash
curl -X POST \
  -H "Authorization: Basic $JIRA_AUTH" \
  -H "Content-Type: application/json" \
  -d '{"jql": "project = QTO ORDER BY created DESC", "maxResults": 100, "fields": ["summary","status","issuetype","priority"]}' \
  "https://open-banking.atlassian.net/rest/api/3/search/jql"
```

---

## Recommended Initial Tickets

Create these in Session 1:

| Type | Summary |
|------|---------|
| Initiative | Platform Foundation — Next.js scaffold and deployment |
| Epic | Site structure and navigation |
| Story | Scaffold Next.js app with Tailwind |
| Story | Port navigation and footer components |
| Story | Port home page |
| Story | Port video library (Learn page) |
| Story | Set up Vercel deployment |
| Initiative | SDLC controls and automation |
| Epic | CI/CD pipeline |
| Story | Set up Playwright tests |
| Story | Set up GitHub Actions CI workflow |
| Story | Configure branch protection |

---

## Commit Hook Update

After creating the project, update `.githooks/commit-msg`:

Change the project key regex from `CWPD` to `QTO`:
```bash
# Find the line with project key validation and update it
```

---

## Jira Acceptance Criteria Format

From `feedback_jira_acceptance_criteria.md` (consentwise):
- AC items numbered AC1, AC2, AC3
- Each on a new line
- Written in plain English
- Use Jira ADF format for rich descriptions

## Ticket Comment Standards

From `feedback_ticket_comments.md` (consentwise):
Add a comment at:
1. Starting work — what and approach
2. Description enhanced — what was added
3. Transitioning to Done — what delivered, output URL, date (DD Mon YYYY), ACs confirmed
4. Conscious backlog decision — reason and dependencies
5. Uploading attachments — what captured and why

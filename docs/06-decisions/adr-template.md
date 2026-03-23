---
sidebar_position: 4
---

# ADR Template

Owner: Frontend Platform Team
Reviewers: Theme Team, QA
Last Updated: 2026-03-14
Last Reviewed: 2026-03-14
Status: Approved

Copy this template when creating a new Architecture Decision Record. Save as `adr-NNN-short-title.md` in `docs/06-decisions/`.

---

```markdown
# ADR-NNN: Short Title

Date: YYYY-MM-DD
Status: Proposed | Accepted | Rejected | Superseded by ADR-NNN

## Context

What is the problem, constraint, or opportunity that prompted this decision?
Include relevant background: existing code structure, team constraints, performance requirements, etc.

## Decision

What did we decide to do?
Be specific — name the files, patterns, or approaches chosen.

## Consequences

### Positive

- List the benefits of this decision.

### Negative / Trade-offs

- List the drawbacks, limitations, or risks.

### Neutral

- Any side effects that are neither clearly good nor bad.

## Alternatives considered

| Alternative | Why rejected |
|---|---|
| Alternative A | Reason |
| Alternative B | Reason |
```

---

## ADR lifecycle

| Status | Meaning |
|---|---|
| `Proposed` | Under discussion, not yet agreed |
| `Accepted` | Team agreed and implemented |
| `Rejected` | Considered and decided against |
| `Superseded by ADR-NNN` | A later ADR replaces this one |
| `Deprecated` | No longer relevant but kept for history |

## Numbering convention

Use the next available number in sequence. Check the [ADR index](index.md) for the current highest number.

Format: `adr-NNN` where `NNN` is zero-padded to 3 digits (e.g., `adr-003`, `adr-010`).

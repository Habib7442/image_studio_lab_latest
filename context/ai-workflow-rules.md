# AI Workflow Rules — imagestudiolab.com

## Overall Approach
- **Spec-Driven**: Do not implement without a specific unit spec or clear goal.
- **Incremental**: Build one verifiable unit at a time. Do not make speculative changes

## Scoping Rules
- Work on one folder/boundary at a time (e.g., don't touch CSS and Logic in the same prompt).
- If a requirement is missing or ambiguous, **stop and ask** rather than guessing.

## Split Policy
- If a unit takes more than 100 lines of new code, consider if it should be split into smaller sub-units.
- Separate UI structure from data wiring.

## Maintenance
- **Documentation Sync**: Update `context/progress-tracker.md` after every meaningful change.
- **PRD Alignment**: Every feature must map back to a goal in `project-overview.md`.

## Verification Checklist
Before finishing a unit, verify:
1.  **Mobile View**: Does it break on small screens?
2.  **Linting**: Are there TypeScript or ESLint errors?
3.  **Invariants**: Does this violate any rule in `architecture.md`?
4.  **Tokens**: Does it use raw hex values instead of Tailwind theme variables?

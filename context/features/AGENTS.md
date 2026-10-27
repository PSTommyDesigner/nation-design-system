# features/

Project-level context: the rules of one project (HRM, Nation News Center, Nation House, AMS, a news website) that the shared rules don't cover,
such as business rules, flows and words. One folder per project, `features/<project>/AGENTS.md`, copied from the template.
They are recorded as that project's prototype pages in `prototype/<project>/` are approved, following `../workflows/prototype/SKILL.md`.
No project folder exists yet.

- [_template/AGENTS.md](_template/AGENTS.md): template for a new feature folder

## Rules
- MUST use components and patterns from the design system. Never build a feature-only component without asking
- Feature rules may add to the shared rules but MUST NOT contradict them
- IF a feature rule is unclear or two sources disagree THEN write `NEEDS CLARIFICATION` in the feature file and ask

# Claude Code session — customer ticket implement (BTCM-7)

You are implementing a **customer project** ticket via BTCMS (headless).

## Overrides (read first)

- **btcms-dev Gate Zero does NOT apply.** Do not require a linked requirement or
  acceptance criteria. Do not draft ACs and wait for confirmation.
- The ticket title + description + instruction below **are** the definition of done.
- Ignore any parent-directory `CLAUDE.md`, `.claude/skills/`, or `AGENTS.md` from
  the BTCMS platform monorepo — those rules are for BTCMS engineers, not this job.
- Do not work on other tickets, BRD documents, or RM pipelines.
- Your shell cwd is already a **persistent git clone** under ``~/btcms-work/repos/...``.
  Do **not** `git clone` again — the branch for this ticket is already checked out.
  Do **not** delete this folder; future tickets reuse it.

## No Q&A / no brainstorming (mandatory)

- Do **not** load `superpowers:brainstorming` or any clarifying-question skill.
- Do **not** use AskUserQuestion / multiple-choice prompts / "waiting for input".
- Thin tickets are fine: pick sensible defaults and implement.
- Defaults when unspecified: PostgreSQL for Drizzle/ORM/DB; TypeScript if the repo
  is TS; match existing package manager and app layout.
- Ticket id is the numeric `ticket_id` from context — never parse `FLOW-9` → `9`.

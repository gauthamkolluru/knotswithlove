# Agent instructions — Knots With Love

## Monorepo engineering standards (`11-projects`)

This project lives under the **`11-projects`** monorepo. Before substantive code or documentation changes, **locate the monorepo root** by walking up parent directories until you find **`ENGINEERING_GUIDELINES_VERBATIM.md`**, then:

1. Read and follow **`ENGINEERING_GUIDELINES_VERBATIM.md`** (canonical standards for humans and all agents).
2. Apply **`.cursor/rules/*.mdc`** from that root (treat as binding project standards; YAML frontmatter may be skipped outside Cursor).
3. Optional review workflow: **`.cursor/skills/grill-me/SKILL.md`** at that root.

If `ENGINEERING_GUIDELINES_VERBATIM.md` cannot be found (standalone checkout), ignore this section.

When adding **another** new project under `11-projects`, add **`CLAUDE.md`** and **`AGENTS.md`** at its root and include this same section.

---

## Project-specific context

- **Claude / stack overview:** **`CLAUDE.md`**
- **Specialized agent definitions (security, performance, architecture, payments):** **`agents.md`**
- **Code lookup:** **`CODEBASE_INDEX.md`**
- **Deferred work (rate limiting, checkout):** **`docs/FUTURE_WORK.md`**

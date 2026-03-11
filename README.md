# interview_prep

Monorepo for interview prep projects and supporting practice work.

Projects stay self-contained: each project owns its own tooling,
dependencies, and commands.

## Structure

```txt
docs/
  README.md
  typescript/
projects/
  codebin/
```

## Current projects

- `projects/codebin` - pastebin backend practice project

## Shared study material

- `docs/typescript` - TypeScript topics and data structure practice notes

## Conventions

- Put each new runnable project in its own folder under `projects/`
- Keep project-specific tooling inside that project only
- Run install, dev, test, lint, and build commands from the project directory
- Keep shared interview notes and reusable prep material in `docs/`
- Add root-level files only when they document the monorepo itself

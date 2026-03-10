# interview_prep

Monorepo for interview prep projects and supporting practice work.

Projects stay self-contained: each project owns its own tooling,
dependencies, and commands.

## Structure

```txt
projects/
  codebin/
```

## Current projects

- `projects/codebin` - pastebin backend practice project

## Conventions

- Put each new project in its own folder under `projects/`
- Keep project-specific tooling inside that project only
- Run install, dev, test, lint, and build commands from the project directory
- Add root-level files only when they document the monorepo itself

Run commands from inside each project directory.

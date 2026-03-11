---
name: configs-conventions
description: Use when adding or updating runtime configuration schemas and shared/server config modules in src/configs.
---

# Configs Conventions

## Scope

Applies to `src/configs/**`.

## Structure Rules

```text
src/configs/
  schema/   # schema + config types only
  shared/   # non-secret runtime config (client+server safe)
  server/   # secret runtime config (server-only)
```

## Hard Rules

1. `schema/` defines schemas/types only and does not read `process.env`.
2. `shared/` reads non-secret env values and validates via `schema`.
3. `server/` reads secret env values and must include `import 'server-only'`.
4. `shared` modules must not depend on `server` modules.
5. `schema/index.ts` is the unified schema export entry.

## Workflow

1. Add schema in `schema/<name>.ts`.
2. Export schema from `schema/index.ts`.
3. Add runtime parser in `shared/<name>.ts` or `server/<name>.ts`.
4. Use explicit imports from `@/configs/shared/*` or `@/configs/server/*`.

## Review Checklist

- New config has schema in `schema/`.
- `schema/index.ts` is updated.
- Secret config uses `server-only`.
- Import boundaries remain explicit and safe.

## References

- `src/configs/README.md`

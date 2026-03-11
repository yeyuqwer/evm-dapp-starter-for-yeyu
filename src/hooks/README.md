# Hooks Guide

This directory stores application hooks.

Goals:
- Keep all API-calling hooks in `src/hooks/api`.
- Mirror `src/api` structure for fast lookup and maintenance.
- Use React Query as the only API-calling mechanism in client components.

## Directory Layout

```text
src/hooks/
  api/
    <domain>/
      mutation/            # useMutation hooks
      query/               # useQuery hooks
      types/               # Hook-level types
      index.ts             # Domain barrel export
```

## Responsibilities

### `api/`
- Corresponds to `src/api`.
- Wraps API functions from `src/api` with React Query hooks.

### Non-API hooks
- Other normal hooks should be grouped by function and business needs, then stored under `src/hooks`.
- Current base architecture does not include concrete examples for non-API hook folders yet.

### `api/<domain>/query/`
- `useQuery` hooks for read behavior.
- Calls functions from `src/api/<domain>/query` (or domain barrel exports).

### `api/<domain>/mutation/`
- `useMutation` hooks for write behavior.
- Calls functions from `src/api/<domain>/mutation`.
- Handles query invalidation/update when needed.

### `api/<domain>/types/`
- Hook-only types (for example, UI-friendly params).
- Can derive from API types when useful.

### `index.ts`
- Re-export hooks per folder and per domain.

## Mapping Rule: `src/hooks/api` <-> `src/api`

Keep similar structure between hooks and API modules.

```text
src/api/token/query/get-balance.ts
src/hooks/api/token/query/use-balance.ts
```

This mapping ensures API function and hook wrapper can be found immediately.

## Client Usage Rule

In client page components, direct server requests are not allowed.

Required flow:
1. Component calls hook from `src/hooks`.
2. Hook calls API function from `src/api`.
3. API function executes request with wrapped ky functions.

Not allowed:
- Calling `fetch`, `ky`, or other network methods directly in client components.
- Calling route handlers directly from components without hooks.

## Hook Authoring Rules

1. Query hooks use `useQuery` and stable `queryKey`.
2. Mutation hooks use `useMutation` and invalidate or update related queries when needed.
3. Hook names use `use*` convention.
4. Keep business request logic in `src/api`; hooks should focus on query lifecycle orchestration.
5. Export through `index.ts` at folder and domain levels.

## How To Add A New API Hook

1. Ensure API function exists in `src/api/<domain>/query` or `mutation`.
2. Create corresponding hook in `src/hooks/api/<domain>/query` or `mutation`.
3. Add hook exports to local `index.ts`, then domain `index.ts`.
4. Define hook-only helper types in `src/hooks/api/<domain>/types` if needed.
5. Use the hook in client components instead of calling API functions directly.

Example:

```ts
import { useQuery } from '@tanstack/react-query'
import { getServerTime } from '@/api/time'

export function useServerTime() {
  return useQuery({
    queryKey: ['server-time'],
    queryFn: async () => {
      return await getServerTime()
    },
  })
}
```

## Design Principles

1. Hooks are the client-facing API layer.
2. API modules remain transport-focused; hooks remain state/query-focused.
3. Structure parity with `src/api` is mandatory.
4. Query key design should be deterministic and domain-scoped.
5. Re-export strategy should keep imports short and stable.

## Checklist For PRs

- New API function has a corresponding hook when client usage is needed.
- Hook path mirrors API path and domain.
- Query hooks use `useQuery`; mutation hooks use `useMutation`.
- Related `index.ts` barrel exports are updated.
- Client components call hooks instead of direct network requests.
- Non-API hooks are organized by clear functional or business categories.

import { QueryCache, QueryClient } from '@tanstack/react-query'
import { stringify } from 'viem'
import { errorStore } from '../common/errors/error-store'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: false,
      queryKeyHashFn: stringify,
    },
  },
  queryCache: new QueryCache({
    onError: error => {
      errorStore.getState().setLastError(error instanceof Error ? error : new Error(String(error)))
    },
  }),
})

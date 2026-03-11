import type { SkipToken } from '@tanstack/react-query'
import { skipToken, useQuery } from '@tanstack/react-query'
import { type GetSymbolParams, getSymbol } from '@/api/token'

export function useSymbol(params: GetSymbolParams | SkipToken) {
  return useQuery({
    queryKey: ['symbol', params],
    queryFn:
      params !== skipToken
        ? async () => {
            return await getSymbol(params)
          }
        : skipToken,
    staleTime: Infinity,
  })
}

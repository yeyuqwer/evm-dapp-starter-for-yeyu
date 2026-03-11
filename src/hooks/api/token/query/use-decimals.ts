import type { SkipToken } from '@tanstack/react-query'
import { skipToken, useQuery } from '@tanstack/react-query'
import { type GetDecimalsParams, getDecimals } from '@/api/token'

export function useDecimals(params: GetDecimalsParams | SkipToken) {
  return useQuery({
    queryKey: ['decimals', params],
    queryFn:
      params !== skipToken
        ? async () => {
            return await getDecimals(params)
          }
        : skipToken,
    staleTime: Infinity,
  })
}

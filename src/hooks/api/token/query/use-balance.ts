import type { SkipToken } from '@tanstack/react-query'
import type { UseBalanceParams } from '../types'
import { skipToken, useQuery } from '@tanstack/react-query'
import { getBalance } from '@/api/token'
import { useDecimals } from './use-decimals'

export function useBalance(params: UseBalanceParams | SkipToken) {
  const { data: decimals } = useDecimals(
    params !== skipToken ? { chainId: params.chainId, address: params.address } : skipToken,
  )

  const apiParams = params !== skipToken && decimals != null ? { ...params, decimals } : skipToken

  return useQuery({
    queryKey: ['balance', apiParams],
    queryFn:
      apiParams !== skipToken
        ? async () => {
            return await getBalance(apiParams)
          }
        : skipToken,
  })
}

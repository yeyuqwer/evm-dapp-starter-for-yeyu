import { useMutation, useQueryClient } from '@tanstack/react-query'
import { waitForTransactionReceipt } from '@wagmi/core'
import { type TransferTokenParams, transferToken } from '@/api/token'
import { wagmiConfig } from '@/lib/common/web3/wagmi'

export function useTokenTransfer() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (params: TransferTokenParams) => {
      const hash = await transferToken(params)
      await waitForTransactionReceipt(wagmiConfig, { chainId: params.chainId, hash })
      queryClient.invalidateQueries({
        queryKey: ['balance', { chainId: params.chainId, account: params.account }],
      })
    },
  })
}

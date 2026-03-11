import type { GetDecimalsParams } from '../types'
import { readContract } from '@wagmi/core'
import { erc20Abi } from 'viem'
import { chains } from '@/configs/shared'
import { wagmiConfig } from '@/lib/common/web3/wagmi'

export async function getDecimals(params: GetDecimalsParams): Promise<number> {
  if (params.address == null) {
    return chains[params.chainId].nativeCurrency.decimals
  }
  const decimals = await readContract(wagmiConfig, {
    chainId: params.chainId,
    address: params.address,
    abi: erc20Abi,
    functionName: 'decimals',
  })
  return decimals
}

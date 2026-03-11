import type { Address } from 'viem'
import type { ChainId } from '@/configs/shared/chains'

export type GetDecimalsParams = {
  chainId: ChainId
  address: Address | null
}

export type GetSymbolParams = {
  chainId: ChainId
  address: Address | null
}

export type GetBalanceParams = {
  chainId: ChainId
  address: Address | null
  account: Address
  decimals: number
}

export type TransferTokenParams = {
  chainId: ChainId
  address: Address | null
  account: Address
  decimals: number
  to: Address
  amount: string
}

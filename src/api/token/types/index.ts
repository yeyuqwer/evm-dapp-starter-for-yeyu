import type { Address } from 'viem'
import type { SharedChainId } from '@/configs/shared'

export type GetDecimalsParams = {
  chainId: SharedChainId
  address: Address | null
}

export type GetSymbolParams = {
  chainId: SharedChainId
  address: Address | null
}

export type GetBalanceParams = {
  chainId: SharedChainId
  address: Address | null
  account: Address
  decimals: number
}

export type TransferTokenParams = {
  chainId: SharedChainId
  address: Address | null
  account: Address
  decimals: number
  to: Address
  amount: string
}

import type { GetConnectionReturnType } from '@wagmi/core'
import { useStore } from 'zustand'
import { createStore } from 'zustand/vanilla'
import { type ChainId, supportedChainIds } from '@/configs/shared/chains'

type EvmState = {
  chainId: ChainId
  connectorChainId: number | undefined
  connectorAccount: GetConnectionReturnType['address']
}

type EvmActions = {
  setChainId: (chainId: number) => void
  setConnectionResult: (connectionResult: GetConnectionReturnType) => void
}

type EvmStoreState = EvmState & EvmActions

const defaultChainId = supportedChainIds[0]

const toSupportedChainId = (chainId: number): ChainId =>
  supportedChainIds.includes(chainId as ChainId) ? (chainId as ChainId) : defaultChainId

export const evmStore = createStore<EvmStoreState>()(set => ({
  chainId: defaultChainId,
  connectorChainId: undefined,
  connectorAccount: undefined,
  setChainId: chainId => set({ chainId: toSupportedChainId(chainId) }),
  setConnectionResult: connectionResult =>
    set({
      connectorChainId: connectionResult.chainId,
      connectorAccount: connectionResult.address,
    }),
}))

export function useEvmStore<T>(selector: (state: EvmStoreState) => T): T {
  return useStore(evmStore, selector)
}

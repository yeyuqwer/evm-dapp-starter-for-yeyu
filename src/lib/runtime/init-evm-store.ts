import { getChainId, getConnection, watchChainId, watchConnection } from '@wagmi/core'
import { evmStore } from '@/lib/common/web3/evm-store'
import { wagmiConfig } from '@/lib/common/web3/wagmi'

let watcherRefCount = 0
let stopWatchingConnection: (() => void) | undefined
let stopWatchingChainId: (() => void) | undefined

export function initializeEvmStore(): () => void {
  if (typeof window === 'undefined') {
    return () => undefined
  }

  watcherRefCount += 1
  if (watcherRefCount === 1) {
    const updateConnection = () => {
      evmStore.getState().setConnectionResult(getConnection(wagmiConfig))
    }
    const updateChainId = () => {
      evmStore.getState().setChainId(getChainId(wagmiConfig))
    }

    updateConnection()
    updateChainId()

    stopWatchingConnection = watchConnection(wagmiConfig, {
      onChange: connection => {
        evmStore.getState().setConnectionResult(connection)
      },
    })
    stopWatchingChainId = watchChainId(wagmiConfig, { onChange: updateChainId })
  }

  return () => {
    watcherRefCount = Math.max(0, watcherRefCount - 1)
    if (watcherRefCount === 0) {
      stopWatchingConnection?.()
      stopWatchingConnection = undefined
      stopWatchingChainId?.()
      stopWatchingChainId = undefined
    }
  }
}

import type { Chain } from 'viem'
import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { createConfig, BaseError as WagmiBaseError } from '@wagmi/core'
import {
  createClient,
  http,
  BaseError as ViemBaseError,
  UserRejectedRequestError as ViemUserRejectedRequestError,
} from 'viem'
import { sharedConfig } from '@/configs/shared'
import { UnknownEvmError, UserRejectedRequestError } from '../errors/evm'

export const wagmiConfig = createConfig({
  chains: sharedConfig.supportedChainIds.map(chainId => sharedConfig.chains[chainId]) as [
    Chain,
    ...Chain[],
  ],
  client: ({ chain }) => {
    return createClient({ chain, transport: http() })
  },
  connectors:
    typeof window !== 'undefined'
      ? getDefaultWallets({
          appName: sharedConfig.appName,
          projectId: sharedConfig.walletConnectProjectId,
        }).connectors
      : undefined,
})

export function convertMaybeEvmError(error: Error): Error {
  if (error instanceof WagmiBaseError) {
    return new UnknownEvmError(error.shortMessage, { cause: error })
  }
  if (error instanceof ViemBaseError) {
    if (error.walk(error => error instanceof ViemUserRejectedRequestError) != null) {
      return new UserRejectedRequestError(undefined, { cause: error })
    }
    return new UnknownEvmError(error.shortMessage, { cause: error })
  }
  return error
}

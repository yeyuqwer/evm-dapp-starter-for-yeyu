'use client'

import type { FC, ReactNode } from 'react'
import { RainbowKitProvider as Provider } from '@rainbow-me/rainbowkit'
import { getAddress } from 'viem'
import { useEvmStore } from '@/lib/common/web3/evm-store'
import { AccountIcon } from '../shared/account-icon'

export const RainbowKitProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const chainId = useEvmStore(state => state.chainId)

  return (
    <Provider
      avatar={({ address }) => (
        <AccountIcon className="size-[var(--size)]" account={getAddress(address)} />
      )}
      locale="en"
      initialChain={chainId}
    >
      {children}
    </Provider>
  )
}

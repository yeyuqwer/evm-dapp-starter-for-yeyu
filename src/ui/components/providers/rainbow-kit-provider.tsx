'use client'

import type { FC, ReactNode } from 'react'
import { RainbowKitProvider as Provider } from '@rainbow-me/rainbowkit'
import { useAtomValue } from 'jotai'
import { getAddress } from 'viem'
import { chainIdAtom } from '@/lib/states/evm'
import { AccountIcon } from '../shared/account-icon'

export const RainbowKitProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const chainId = useAtomValue(chainIdAtom)

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

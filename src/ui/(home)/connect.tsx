'use client'

import type { ComponentProps, FC } from 'react'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { disconnect } from '@wagmi/core'
import { useEvmStore } from '@/lib/common/web3/evm-store'
import { wagmiConfig } from '@/lib/common/web3/wagmi'
import { formatLongText } from '@/lib/utils/formatter/formatters'
import { cn } from '@/lib/utils/shadcn'
import { Button } from '@/ui/shadcn/button'
import { AccountIcon } from '../components/shared/account-icon'

export const Connect: FC<ComponentProps<'div'>> = ({ className, ...props }) => {
  const account = useEvmStore(state => state.connectorAccount)

  const { openConnectModal } = useConnectModal()

  return (
    <div className={cn('group relative inline-flex', className)} {...props}>
      <Button
        className={cn('flex items-center', account != null && 'group-hover:opacity-0')}
        variant="outline"
        onClick={openConnectModal}
      >
        {account != null ? (
          <>
            <AccountIcon account={account} />
            <div className="ml-2">{formatLongText(account, { headTailLength: 4 })}</div>
          </>
        ) : (
          'Connect wallet'
        )}
      </Button>
      {account != null && (
        <Button
          className="absolute inset-0 flex h-auto items-center opacity-0 group-hover:opacity-100"
          variant="destructive"
          onClick={() => disconnect(wagmiConfig)}
        >
          Disconnect
        </Button>
      )}
    </div>
  )
}

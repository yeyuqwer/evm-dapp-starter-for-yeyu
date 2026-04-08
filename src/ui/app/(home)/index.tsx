import type { ComponentProps, FC } from 'react'
import Link from 'next/link'
import { sharedConfig } from '@/configs/shared'
import { ServerConfig } from '@/ui/app/(home)/server-config'

export const HomePage: FC<ComponentProps<'div'>> = () => {
  return (
    <div className="container">
      <h1>Home</h1>
      <div className="mt-3 space-y-1">
        <div>Environment: {sharedConfig.env.environment}</div>
        <div>App Name: {sharedConfig.appConfig.appName}</div>
        <div>WalletConnect Project ID: {sharedConfig.appConfig.walletConnectProjectId}</div>
      </div>
      <ServerConfig className="mt-4" />
      <div className="mt-3 flex flex-col space-y-2">
        <Link className="text-primary" href="/examples/transfer">
          Example: Transfer
        </Link>
        <Link className="text-primary" href="/examples/server-time">
          Example: Server Time
        </Link>
      </div>
    </div>
  )
}

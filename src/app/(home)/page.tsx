import Link from 'next/link'
import { appConfig } from '@/configs/shared/app'
import { env } from '@/configs/shared/env'
import { ServerConfig } from '@/ui/(home)/server-config'

export default function Page() {
  return (
    <div className="container">
      <h1>Home</h1>
      <div className="mt-3 space-y-1">
        <div>Environment: {env.environment}</div>
        <div>App Name: {appConfig.appName}</div>
        <div>WalletConnect Project ID: {appConfig.walletConnectProjectId}</div>
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

import { appConfigSchema } from '../schema'

export const appConfig = appConfigSchema.parse({
  appName: process.env.NEXT_PUBLIC_APP_NAME,
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
})

export const appName = appConfig.appName
export const walletConnectProjectId = appConfig.walletConnectProjectId

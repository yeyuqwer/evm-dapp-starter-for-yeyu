import { z } from 'zod'

const appConfigSchema = z.object({
  appName: z.string().trim().min(1),
  walletConnectProjectId: z
    .string()
    .trim()
    .regex(/^[0-9a-f]{32}$/i),
})

export const appConfig = appConfigSchema.parse({
  appName: process.env.NEXT_PUBLIC_APP_NAME,
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
})

export const appName = appConfig.appName
export const walletConnectProjectId = appConfig.walletConnectProjectId

export type AppConfig = z.infer<typeof appConfigSchema>

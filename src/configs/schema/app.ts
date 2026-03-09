import { z } from 'zod'

export const appConfigSchema = z.object({
  appName: z.string().trim().min(1),
  walletConnectProjectId: z
    .string()
    .trim()
    .regex(/^[0-9a-f]{32}$/i),
})

export type AppConfig = z.infer<typeof appConfigSchema>

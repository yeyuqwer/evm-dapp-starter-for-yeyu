import 'server-only'
import { z } from 'zod'

const jwtSecretSchema = z.object({
  JwtSecret: z.string().trim().min(1),
})

export const jwtSecretConfig = jwtSecretSchema.parse({
  JwtSecret: process.env.JwtSecret,
})

export const jwtSecret = jwtSecretConfig.JwtSecret

export type JwtSecretConfig = z.infer<typeof jwtSecretSchema>

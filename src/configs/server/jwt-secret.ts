import 'server-only'
import { jwtSecretSchema } from '../schema'

export const jwtSecretConfig = jwtSecretSchema.parse({
  JwtSecret: process.env.JwtSecret,
})

export const jwtSecret = jwtSecretConfig.JwtSecret

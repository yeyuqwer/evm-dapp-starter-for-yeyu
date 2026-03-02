import { jwtSecretConfig } from '@/configs/jwt-secret'
import { withResponse } from '@/lib/http/next'

export const GET = withResponse(() => {
  return jwtSecretConfig
})

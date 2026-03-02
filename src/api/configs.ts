import { apiRequest } from '@/lib/http/ky'

export type GetServerConfigResult = {
  JwtSecret: string
}

export async function getServerConfig(): Promise<GetServerConfigResult> {
  return await apiRequest<GetServerConfigResult>({
    url: 'configs/server',
  })
}

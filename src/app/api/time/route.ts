import type { ServerRuntime } from 'next'
import { withResponse } from '@/lib/http/next'

export const runtime: ServerRuntime = 'edge'

export const GET = withResponse(() => {
  return Date.now()
})

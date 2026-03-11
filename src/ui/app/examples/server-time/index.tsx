'use client'

import type { ComponentProps, FC } from 'react'
import { useServerTime } from '@/hooks/api/time'
import { formatTime } from '@/lib/utils/formatter/formatters'

export const ServerTimePage: FC<ComponentProps<'div'>> = () => {
  const { data: serverTime } = useServerTime()

  return <div>Server time: {formatTime(serverTime)}</div>
}

'use client'

import type { ComponentProps, FC } from 'react'
import { useServerTime } from '@/hooks/time'
import { formatTime } from '@/lib/utils/formatter/formatters'

export const ServerTime: FC<ComponentProps<'div'>> = props => {
  const { data: serverTime } = useServerTime()

  return <div {...props}>Server time: {formatTime(serverTime)}</div>
}

'use client'

import type { ComponentProps, FC } from 'react'
import { useState } from 'react'
import { type GetServerConfigResult, getServerConfig } from '@/api/configs'
import { cn } from '@/lib/utils/shadcn'
import { Button } from '@/ui/shadcn/button'

export const ServerConfig: FC<ComponentProps<'div'>> = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [serverConfig, setServerConfig] = useState<GetServerConfigResult | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onGetServerConfig = async () => {
    try {
      setIsLoading(true)
      setErrorMessage(null)
      const result = await getServerConfig()
      setServerConfig(result)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to load server config')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('space-y-2', className)} {...props}>
      <div className="font-medium">Server Config</div>
      <Button type="button" variant="outline" onClick={onGetServerConfig} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Get Server Config'}
      </Button>
      {serverConfig != null && <div>JwtSecret: {serverConfig.JwtSecret}</div>}
      {errorMessage != null && <div className="text-red-600">Error: {errorMessage}</div>}
    </div>
  )
}

'use client'

import type { FC, ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { useEffect } from 'react'
import { WagmiProvider } from 'wagmi'
import { wagmiConfig } from '@/lib/common/web3/wagmi'
import { queryClient } from '@/lib/http/react-query'
import { initializeEvmStore } from '@/lib/runtime/init-evm-store'
import { Toaster } from '@/ui/shadcn/sonner'
import { ErrorHandler } from './error-handler'
import { RainbowKitProvider } from './rainbow-kit-provider'

export const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  useEffect(() => initializeEvmStore(), [])

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <WagmiProvider config={wagmiConfig}>
        <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
          <RainbowKitProvider>
            <Toaster />
            <ErrorHandler />
            {children}
          </RainbowKitProvider>
        </NextThemesProvider>
      </WagmiProvider>
    </QueryClientProvider>
  )
}

import type { Chain } from 'viem'
import { arbitrum, arbitrumSepolia, mainnet, sepolia } from 'viem/chains'
import { type Environment, env } from './env'

export enum ChainId {
  Mainnet = 1,
  Arbitrum = 42161,
  Sepolia = 11155111,
  ArbitrumSepolia = 421614,
}

const supportedChainIdsByEnvironment: Record<Environment, [ChainId, ChainId]> = {
  production: [ChainId.Mainnet, ChainId.Arbitrum],
  development: [ChainId.Sepolia, ChainId.ArbitrumSepolia],
}

export const supportedChainIds = supportedChainIdsByEnvironment[env.environment]

export const chains: Record<ChainId, Chain> = {
  [ChainId.Mainnet]: mainnet,
  [ChainId.Arbitrum]: arbitrum,
  [ChainId.Sepolia]: sepolia,
  [ChainId.ArbitrumSepolia]: arbitrumSepolia,
}

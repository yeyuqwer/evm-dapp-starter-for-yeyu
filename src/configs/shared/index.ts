import * as app from './app'
import * as chains from './chains'
import * as env from './env'

export const sharedConfig = {
  ...app,
  ...chains,
  ...env,
}

export type SharedChainId = (typeof sharedConfig.supportedChainIds)[number]

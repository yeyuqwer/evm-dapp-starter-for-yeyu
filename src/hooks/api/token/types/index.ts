import type { GetBalanceParams } from '@/api/token'

export type UseBalanceParams = Omit<GetBalanceParams, 'decimals'>

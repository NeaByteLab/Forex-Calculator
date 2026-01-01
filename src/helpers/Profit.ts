import type * as Types from '@app/Types.ts'
import { instrumentConfigs } from '@app/Constants.ts'

/**
 * Calculate trade profit results.
 * @description Computes realized profit and pips from prices.
 * @param params - Entry exit prices and lots
 * @returns Detailed trade results data
 */
export function calculateProfit(params: Types.ProfitParams): Types.ProfitResult {
  const { pairName, sidePosition, lotSize, entryPrice, exitPrice } = params
  if (entryPrice <= 0 || exitPrice <= 0) {
    throw new Error('Prices must be greater than 0')
  }
  const config = instrumentConfigs[pairName] || {
    type: 'FOREX',
    contractSize: 100000,
    pipSize: 0.0001
  }
  const baseCurrency = pairName.substring(0, 3)
  const isBuy = sidePosition === 'BUY'
  const priceDiff = isBuy ? exitPrice - entryPrice : entryPrice - exitPrice
  let profitUSD = priceDiff * lotSize * config.contractSize
  if (baseCurrency === 'USD') {
    profitUSD = (priceDiff / exitPrice) * lotSize * config.contractSize
  }
  const pips = priceDiff / config.pipSize
  return {
    isProfit: profitUSD >= 0,
    pips: Number(pips.toFixed(1)),
    profitUSD: Number(profitUSD.toFixed(2)),
    sidePosition,
    symbol: pairName,
    type: config.type
  }
}

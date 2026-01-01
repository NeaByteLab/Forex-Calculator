import type * as Types from '@app/Types.ts'
import { instrumentConfigs } from '@app/Constants.ts'

/**
 * Calculate optimal trade lot size.
 * @description Computes position size based on risk and distance.
 * @param params - Margin leverage and risk inputs
 * @returns Detailed lot and risk management data
 */
export function calculateLotSize(params: Types.LotSizeParams): Types.LotSizeResult {
  const { pairName, openPrice, stopPrice, leverage, riskUSD } = params
  if (openPrice <= 0) {
    throw new Error('Open price must be greater than 0')
  }
  const config = instrumentConfigs[pairName] || {
    type: 'FOREX',
    contractSize: 100000,
    pipSize: 0.0001
  }
  const stopDistance = Math.abs(openPrice - stopPrice)
  if (stopDistance === 0) {
    throw new Error('SL cannot be 0')
  }
  if (riskUSD <= 0) {
    throw new Error('Risk must be greater than 0')
  }
  const baseCurrency = pairName.substring(0, 3)
  let pipValuePerLotInUSD = config.contractSize * config.pipSize
  if (baseCurrency === 'USD') {
    pipValuePerLotInUSD = (config.contractSize * config.pipSize) / openPrice
  }
  const stopPoints = stopDistance / config.pipSize
  const rawLot = riskUSD / (stopPoints * pipValuePerLotInUSD)
  const units = rawLot * config.contractSize
  let marginRequired = (openPrice * units) / leverage
  if (baseCurrency === 'USD') {
    marginRequired = units / leverage
  }
  const pipValue = rawLot * pipValuePerLotInUSD
  return {
    info: {
      symbol: pairName,
      type: config.type,
      timestamp: new Date().toISOString()
    },
    position: {
      lot: Number(rawLot.toFixed(6)),
      units: Number(units.toFixed(2)),
      pipValue: Number(pipValue.toFixed(2))
    },
    risk: {
      amount: riskUSD,
      stopDistance: Number(stopDistance.toFixed(5)),
      stopPoints: Number(stopPoints.toFixed(1))
    },
    margin: {
      required: Number(marginRequired.toFixed(2)),
      leverage: `1:${leverage}`
    }
  }
}

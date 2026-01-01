import type * as Types from '@app/Types.ts'

/**
 * Calculate account drawdown levels.
 * @description Simulates sequential losses to calculate account risk.
 * @param params - Initial balance and streak
 * @returns Array of drawdown result levels
 */
export function calculateDrawdown(params: Types.DrawdownParams): Types.DrawdownResult[] {
  const { balance, riskPerTrade, maxStreak } = params
  if (balance <= 0) {
    throw new Error('Balance must be greater than 0')
  }
  const results: Types.DrawdownResult[] = []
  let currentBalance = balance
  for (let i = 1; i <= maxStreak; i++) {
    const loss = currentBalance * (riskPerTrade / 100)
    const endBalance = currentBalance - loss
    const totalLossPct = ((balance - endBalance) / balance) * 100
    results.push({
      streak: i,
      totalLossPercent: Number(totalLossPct.toFixed(2)),
      remainingBalance: Number(endBalance.toFixed(2)),
      lossUSD: Number(loss.toFixed(2))
    })
    currentBalance = endBalance
  }
  return results
}

/**
 * Calculate trading strategy expectancy.
 * @description Measures the statistical edge of a strategy.
 * @param params - Win rate and performance
 * @returns Expectancy and profit potential metrics
 */
export function calculateExpectancy(params: Types.ExpectancyParams): Types.ExpectancyResult {
  const { winRate, avgWinUSD, avgLossUSD } = params
  if (winRate < 0 || winRate > 100) {
    throw new Error('Win rate must be between 0 and 100')
  }
  const winProb = winRate / 100
  const lossProb = (100 - winRate) / 100
  const expectancy = winProb * avgWinUSD - lossProb * avgLossUSD
  return {
    expectancy: Number(expectancy.toFixed(2)),
    potentialProfit: Number((expectancy * 100).toFixed(2)),
    status: expectancy > 0 ? 'POSITIVE' : 'NEGATIVE'
  }
}

/**
 * Simulate compounding account growth.
 * @description Projects balance growth through interest reinvestment.
 * @param params - Terms for compounding periods
 * @returns Array of compounding growth intervals
 */
export function simulateCompounding(params: Types.CompoundParams): Types.CompoundResult[] {
  const { startBalance, profitPerTrade, totalTrades } = params
  if (startBalance <= 0) {
    throw new Error('Start balance must be greater than 0')
  }
  const results: Types.CompoundResult[] = []
  let currentBalance = startBalance
  for (let i = 1; i <= totalTrades; i++) {
    const profit = currentBalance * (profitPerTrade / 100)
    const endBalance = currentBalance + profit
    results.push({
      period: i,
      startBalance: Number(currentBalance.toFixed(2)),
      profit: Number(profit.toFixed(2)),
      endBalance: Number(endBalance.toFixed(2))
    })
    currentBalance = endBalance
  }
  return results
}

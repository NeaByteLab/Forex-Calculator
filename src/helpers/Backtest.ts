import type * as Types from '@app/Types.ts'

/**
 * Calculate strategy backtest results.
 * @description Simulates trading performance over period using parameters.
 * @param params - Performance and risk variables
 * @returns Complete backtest analytical data
 */
export function calculateBacktest(params: Types.BacktestParams): Types.BacktestFullResult {
  const { initBalance, riskAmount, tradePerDay, totalDays, winRate, rewardRatio } = params
  if (riskAmount <= 0) {
    throw new Error('Risk amount must be greater than 0')
  }
  if (totalDays < 0 || tradePerDay < 0) {
    throw new Error('Duration and trades per day cannot be negative')
  }
  const logs: Types.TradeLog[] = []
  let currentBalance = initBalance
  let totalWins = 0
  const totalTrades = tradePerDay * totalDays
  for (let day = 1; day <= totalDays; day++) {
    for (let trade = 1; trade <= tradePerDay; trade++) {
      const isWin = Math.random() < winRate / 100
      const multiplier = isWin ? rewardRatio : -1
      const pnl = riskAmount * multiplier
      currentBalance = Number((currentBalance + pnl).toFixed(2))
      if (isWin) {
        totalWins++
      }
      logs.push({
        trade: logs.length + 1,
        day: day,
        result: isWin ? `WIN (+${rewardRatio}R)` : 'LOSS (-1R)',
        profitLoss: Number(pnl.toFixed(2)),
        balance: currentBalance
      })
    }
  }
  const netProfit = Number((currentBalance - initBalance).toFixed(2))
  const actualWinRate = totalTrades > 0 ? (totalWins / totalTrades) * 100 : 0
  const summary = {
    initBalance: Number(initBalance.toFixed(2)),
    finalBalance: currentBalance,
    netProfit,
    totalTrades: totalTrades,
    totalWins: totalWins,
    actualWinRate: Number(actualWinRate.toFixed(2)),
    startSurvivor: Math.floor(initBalance / riskAmount),
    finalSurvivor: Math.floor(currentBalance / riskAmount),
    isProfitable: netProfit >= 0
  }
  return {
    logs,
    summary
  }
}

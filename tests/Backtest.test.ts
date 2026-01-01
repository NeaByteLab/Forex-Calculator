import { assertEquals } from '@std/assert'
import { calculateBacktest } from '@app/index.ts'

Deno.test('Backtest - Basic Simulation', () => {
  const result = calculateBacktest({
    initBalance: 1000,
    riskAmount: 10,
    tradePerDay: 1,
    totalDays: 5,
    winRate: 100,
    rewardRatio: 2
  })
  assertEquals(result.summary.totalTrades, 5)
  assertEquals(result.summary.totalWins, 5)
  assertEquals(result.summary.netProfit, 100)
  assertEquals(result.summary.finalBalance, 1100)
  assertEquals(result.logs.length, 5)
})

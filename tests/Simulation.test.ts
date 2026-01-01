import { assertEquals } from '@std/assert'
import { calculateDrawdown, calculateExpectancy, simulateCompounding } from '@app/index.ts'

Deno.test('Simulation - Drawdown', () => {
  const results = calculateDrawdown({
    balance: 1000,
    riskPerTrade: 1,
    maxStreak: 2
  })
  assertEquals(results.length, 2)
  assertEquals(results[0]?.streak, 1)
  assertEquals(results[0]?.lossUSD, 10)
  assertEquals(results[1]?.streak, 2)
  assertEquals(results[1]?.lossUSD, 9.9)
})

Deno.test('Simulation - Expectancy', () => {
  const result = calculateExpectancy({
    winRate: 50,
    avgWinUSD: 100,
    avgLossUSD: 50
  })
  assertEquals(result.expectancy, 25)
  assertEquals(result.status, 'POSITIVE')
})

Deno.test('Simulation - Compounding', () => {
  const results = simulateCompounding({
    startBalance: 1000,
    profitPerTrade: 10,
    totalTrades: 2
  })
  assertEquals(results.length, 2)
  assertEquals(results[0]?.endBalance, 1100)
  assertEquals(results[1]?.endBalance, 1210)
})

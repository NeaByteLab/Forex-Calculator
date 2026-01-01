import { assert, assertEquals } from '@std/assert'
import { calculateProfit } from '@app/index.ts'

Deno.test('Profit - XAUUSD BUY', () => {
  const result = calculateProfit({
    pairName: 'XAUUSD',
    sidePosition: 'BUY',
    lotSize: 0.1,
    entryPrice: 2000,
    exitPrice: 2010
  })
  assertEquals(result.profitUSD, 100)
  assert(result.isProfit)
})

Deno.test('Profit - EURUSD SELL', () => {
  const result = calculateProfit({
    pairName: 'EURUSD',
    sidePosition: 'SELL',
    lotSize: 1.0,
    entryPrice: 1.1,
    exitPrice: 1.101
  })
  assertEquals(result.profitUSD, -100)
  assert(!result.isProfit)
})

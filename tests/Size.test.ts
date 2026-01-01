import { assertEquals } from '@std/assert'
import { calculateLotSize } from '@app/index.ts'

Deno.test('Lot Size - XAUUSD (Metal)', () => {
  const result = calculateLotSize({
    pairName: 'XAUUSD',
    openPrice: 2000,
    stopPrice: 1990,
    leverage: 100,
    riskUSD: 100
  })
  assertEquals(result.position.lot, 0.1)
  assertEquals(result.risk.amount, 100)
  assertEquals(result.info.symbol, 'XAUUSD')
})

Deno.test('Lot Size - EURUSD (Forex)', () => {
  const result = calculateLotSize({
    pairName: 'EURUSD',
    openPrice: 1.1,
    stopPrice: 1.099,
    leverage: 100,
    riskUSD: 100
  })
  assertEquals(result.position.lot, 1.0)
})

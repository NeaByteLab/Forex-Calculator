import { assertEquals, assertThrows } from '@std/assert'
import { calculatePivotPoints } from '@app/index.ts'

Deno.test('Pivot Point - Classic Method', () => {
  const result = calculatePivotPoints({
    high: 1.1,
    low: 1.0,
    close: 1.05,
    method: 'CLASSIC'
  })
  assertEquals(result.p, 1.05)
  assertEquals(result.r1, 1.1)
  assertEquals(result.s1, 1.0)
  assertEquals(result.r2, 1.15)
  assertEquals(result.s2, 0.95)
  assertEquals(result.r3, 1.2)
  assertEquals(result.s3, 0.9)
})

Deno.test('Pivot Point - Fibonacci Method', () => {
  const result = calculatePivotPoints({
    high: 1.1,
    low: 1.0,
    close: 1.05,
    method: 'FIBONACCI'
  })
  assertEquals(result.p, 1.05)
  assertEquals(result.r1, 1.0882)
  assertEquals(result.s1, 1.0118)
})

Deno.test('Pivot Point - Error Handling', () => {
  assertThrows(
    () => calculatePivotPoints({ high: 0, low: 1, close: 1, method: 'CLASSIC' }),
    Error,
    'Prices must be greater than 0'
  )
  assertThrows(
    () => calculatePivotPoints({ high: 1, low: 1.1, close: 1, method: 'CLASSIC' }),
    Error,
    'High price cannot be lower than low price'
  )
})

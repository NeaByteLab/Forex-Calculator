import type * as Types from '@app/Types.ts'

/**
 * Calculate financial pivot point levels.
 * @description Computes support and resistance levels using various methodologies.
 * @param params - Input price data and method
 * @returns Calculated pivot and level data
 */
export function calculatePivotPoints(params: Types.PivotParams): Types.PivotResult {
  const { high, low, close, method, open = close } = params
  if (high <= 0 || low <= 0 || close <= 0) {
    throw new Error('Prices must be greater than 0')
  }
  if (high < low) {
    throw new Error('High price cannot be lower than low price')
  }
  let p = 0
  let r1 = 0
  let r2: number | undefined
  let r3: number | undefined
  let r4: number | undefined
  let s1 = 0
  let s2: number | undefined
  let s3: number | undefined
  let s4: number | undefined
  const diff = high - low
  switch (method) {
    case 'FIBONACCI': {
      p = (high + low + close) / 3
      r1 = p + diff * 0.382
      r2 = p + diff * 0.618
      r3 = p + diff * 1.0
      s1 = p - diff * 0.382
      s2 = p - diff * 0.618
      s3 = p - diff * 1.0
      break
    }
    case 'CAMARILLA': {
      p = (high + low + close) / 3
      r1 = close + diff * (1.1 / 12)
      r2 = close + diff * (1.1 / 6)
      r3 = close + diff * (1.1 / 4)
      r4 = close + diff * (1.1 / 2)
      s1 = close - diff * (1.1 / 12)
      s2 = close - diff * (1.1 / 6)
      s3 = close - diff * (1.1 / 4)
      s4 = close - diff * (1.1 / 2)
      break
    }
    case 'WOODIES': {
      p = (high + low + 2 * open) / 4
      r1 = 2 * p - low
      r2 = p + diff
      r3 = high + 2 * (p - low)
      s1 = 2 * p - high
      s2 = p - diff
      s3 = low - 2 * (high - p)
      break
    }
    case 'DEMARKS': {
      let x = 0
      if (close < open) {
        x = high + 2 * low + close
      } else if (close > open) {
        x = 2 * high + low + close
      } else {
        x = high + low + 2 * close
      }
      p = x / 4
      r1 = x / 2 - low
      s1 = x / 2 - high
      break
    }
    case 'CLASSIC':
    default: {
      p = (high + low + close) / 3
      r1 = 2 * p - low
      r2 = p + diff
      r3 = high + 2 * (p - low)
      s1 = 2 * p - high
      s2 = p - diff
      s3 = low - 2 * (high - p)
      break
    }
  }
  const format = (val: number): number => Number(val.toFixed(5))
  const result: Types.PivotResult = {
    method,
    p: Number(p.toFixed(5)),
    r1: Number(r1.toFixed(5)),
    s1: Number(s1.toFixed(5))
  }
  if (r2 !== undefined) {
    result.r2 = format(r2)
  }
  if (r3 !== undefined) {
    result.r3 = format(r3)
  }
  if (r4 !== undefined) {
    result.r4 = format(r4)
  }
  if (s2 !== undefined) {
    result.s2 = format(s2)
  }
  if (s3 !== undefined) {
    result.s3 = format(s3)
  }
  if (s4 !== undefined) {
    result.s4 = format(s4)
  }
  return result
}

# Forex Calculator [![Module type: CJS+ESM](https://img.shields.io/badge/module%20type-cjs%2Besm-brightgreen)](https://github.com/NeaByteLab/Forex-Calculator) [![npm version](https://img.shields.io/npm/v/@neabyte/forex-calculator.svg)](https://www.npmjs.org/package/@neabyte/forex-calculator) [![JSR](https://jsr.io/badges/@neabyte/forex-calculator)](https://jsr.io/@neabyte/forex-calculator)

Simple and reliable Forex Calculator tools for trading analysis.

## Installation

Choose your preferred package manager:

```bash
# npm package
npm install @neabyte/forex-calculator

# Deno module
deno add jsr:@neabyte/forex-calculator
```

## Usage

### Position Sizing

Calculate optimal lot size based on account risk and stop loss distance.

```typescript
import { calculateLotSize } from '@neabyte/forex-calculator'

const result = calculateLotSize({
  pairName: 'XAUUSD',
  openPrice: 2000,
  stopPrice: 1990,
  leverage: 100,
  riskUSD: 100
})
console.log(result)
/*
{
  info: { symbol: 'XAUUSD', timestamp: '...', type: 'METAL' },
  margin: { leverage: '1:100', required: 200 },
  position: { lot: 0.1, pipValue: 1, units: 10 },
  risk: { amount: 100, stopDistance: 10, stopPoints: 100 }
}
*/
```

### Profit & Loss

Calculate the exact profit or loss in USD and pips for any position.

```typescript
import { calculateProfit } from '@neabyte/forex-calculator'

const result = calculateProfit({
  pairName: 'EURUSD',
  sidePosition: 'BUY',
  lotSize: 1.0,
  entryPrice: 1.1,
  exitPrice: 1.105
})
console.log(result)
/*
{
  isProfit: true,
  pips: 50,
  profitUSD: 500,
  sidePosition: 'BUY',
  symbol: 'EURUSD',
  type: 'FOREX'
}
*/
```

### Pivot Points

Support for multiple methodologies to find support and resistance.

```typescript
import { calculatePivotPoints } from '@neabyte/forex-calculator'

const result = calculatePivotPoints({
  high: 1.1,
  low: 1.09,
  close: 1.095,
  method: 'FIBONACCI'
})
console.log(result)
/*
{
  method: 'FIBONACCI',
  p: 1.095,
  r1: 1.09882,
  r2: 1.10118,
  r3: 1.105,
  s1: 1.09118,
  s2: 1.08882,
  s3: 1.085
}
*/
```

### Strategy Simulations

Project account growth or analyze risk with built-in simulators.

```typescript
import { simulateCompounding, calculateExpectancy } from '@neabyte/forex-calculator'

// Project compounding growth
const compound = simulateCompounding({
  startBalance: 1000,
  profitPerTrade: 10,
  totalTrades: 2
})
console.log(compound)
/*
[
  { period: 1, startBalance: 1000, endBalance: 1100, profit: 100 },
  { period: 2, startBalance: 1100, endBalance: 1210, profit: 110 }
]
*/

// Calculate mathematical edge
const edge = calculateExpectancy({
  winRate: 50,
  avgWinUSD: 100,
  avgLossUSD: 50
})
console.log(edge) // { expectancy: 25, potentialProfit: 1250, status: 'POSITIVE' }
```

### Backtesting

Simulate trading a strategy over a specific period of time.

```typescript
import { calculateBacktest } from '@neabyte/forex-calculator'

const result = calculateBacktest({
  initBalance: 1000,
  riskAmount: 10,
  tradePerDay: 1,
  totalDays: 5,
  winRate: 60,
  rewardRatio: 2
})
console.log(result.summary)
/*
{
  actualWinRate: 60,
  finalBalance: 1040,
  initBalance: 1000,
  isProfitable: true,
  netProfit: 40,
  totalTrades: 5,
  totalWins: 3,
  ...
}
*/
```

## API Reference

### Core Calculators

- **`calculateLotSize(params)`**: Returns `LotSizeResult`. Calculates margin, lot size, and risk metrics.
- **`calculateProfit(params)`**: Returns `ProfitResult`. Calculates PnL and pip distance.
- **`calculatePivotPoints(params)`**: Returns `PivotResult`. Supports `CLASSIC`, `FIBONACCI`, `CAMARILLA`, `WOODIES`, `DEMARKS`.

### Strategy Simulations

- **`simulateCompounding(params)`**: Project account growth over multiple trades.
- **`calculateDrawdown(params)`**: Analyze potential balance decay during losing streaks.
- **`calculateExpectancy(params)`**: Determine strategy edge (Statistical Expectancy).

### Backtesting

- **`calculateBacktest(params)`**: Comprehensive strategy simulation over a time period.

## Supported Instruments

The library supports a wide range of symbols across different asset classes.

### Forex

| Symbol                                                                                         | Contract Size | Pip Size |
| :--------------------------------------------------------------------------------------------- | :------------ | :------- |
| AUDJPY, CADJPY, CHFJPY, EURJPY, GBPJPY, NZDJPY, USDJPY                                         | 100,000       | 0.01     |
| AUDNZD, AUDUSD, EURAUD, EURGBP, EURNZD, EURUSD, GBPCAD, GBPNZD, GBPUSD, NZDUSD, USDCAD, USDCHF | 100,000       | 0.0001   |

### Metals

| Symbol | Type   | Contract Size | Pip Size |
| :----- | :----- | :------------ | :------- |
| XAUUSD | Gold   | 100           | 0.1      |
| XAGUSD | Silver | 5000          | 0.01     |

### Indices & Commodities

| Symbol                                     | Contract Size | Pip Size |
| :----------------------------------------- | :------------ | :------- |
| US30, NAS100, SPX500, GER40, JPN225, UK100 | 1             | 1.0      |
| USOIL, UKOIL                               | 100           | 0.01     |
| XNGUSD                                     | 10,000        | 0.001    |

### Crypto

| Symbol         | Contract Size | Pip Size |
| :------------- | :------------ | :------- |
| BTCUSD, ETHUSD | 1             | 1.0      |
| SOLUSD         | 1             | 0.01     |

## Error Handling

The library validates inputs and throws clear error messages:

```typescript
try {
  calculatePivotPoints({ high: 0, low: 100, close: 105, method: 'CLASSIC' })
} catch (e) {
  console.error(e.message) // "Prices must be greater than 0"
}
```

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.

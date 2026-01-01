/**
 * Backtest full result data.
 * @description Contains logs and summary of the simulation.
 */
export interface BacktestFullResult {
  /** Array of trade history logs */
  logs: TradeLog[]
  /** Summary of simulation metrics */
  summary: BacktestSummary
}

/**
 * Parameters for strategy backtest.
 * @description Defines variables for simulating trading performance.
 */
export interface BacktestParams {
  /** Initial account balance amount */
  initBalance: number
  /** Expected reward to risk ratio */
  rewardRatio: number
  /** Total risk amount per trade */
  riskAmount: number
  /** Total simulation duration in days */
  totalDays: number
  /** Number of trades per day */
  tradePerDay: number
  /** Strategy win probability percentage */
  winRate: number
}

/**
 * Summary of backtest results.
 * @description Metrics representing the outcome of simulation.
 */
export interface BacktestSummary {
  /** Actual calculated win rate percentage */
  actualWinRate: number
  /** Ending balance after all trades */
  finalBalance: number
  /** Final count of active traders */
  finalSurvivor: number
  /** Starting account balance amount */
  initBalance: number
  /** Indicates if strategy was profitable */
  isProfitable: boolean
  /** Total net profit or loss */
  netProfit: number
  /** Starting count of active traders */
  startSurvivor: number
  /** Total number of executed trades */
  totalTrades: number
  /** Total count of winning trades */
  totalWins: number
}

/**
 * Parameters for compounding calculation.
 * @description Variables used to calculate interest compounding.
 */
export interface CompoundParams {
  /** Profit amount earned per trade */
  profitPerTrade: number
  /** Initial starting balance amount */
  startBalance: number
  /** Total number of compounding periods */
  totalTrades: number
}

/**
 * Result of compounding calculation.
 * @description Outcome including final balance and profit.
 */
export interface CompoundResult {
  /** Final balance after compounding periods */
  endBalance: number
  /** Total duration of compounding period */
  period: number
  /** Total profit earned during period */
  profit: number
  /** Initial starting balance amount */
  startBalance: number
}

/**
 * Parameters for drawdown simulation.
 * @description Input for calculating potential account losses.
 */
export interface DrawdownParams {
  /** Current account balance amount */
  balance: number
  /** Maximum consecutive losing trades */
  maxStreak: number
  /** Percentage risk per individual trade */
  riskPerTrade: number
}

/**
 * Result of drawdown simulation.
 * @description Calculated metrics for potential account drawdown.
 */
export interface DrawdownResult {
  /** Total lost amount in USD */
  lossUSD: number
  /** Balance remaining after losing streak */
  remainingBalance: number
  /** Current consecutive losing streak count */
  streak: number
  /** Total percentage of balance lost */
  totalLossPercent: number
}

/**
 * Parameters for expectancy calculation.
 * @description Data used to determine strategy edge.
 */
export interface ExpectancyParams {
  /** Average amount lost per trade */
  avgLossUSD: number
  /** Average amount won per trade */
  avgWinUSD: number
  /** Historical win rate percentage */
  winRate: number
}

/**
 * Result of expectancy calculation.
 * @description Metrics for long term profit potential.
 */
export interface ExpectancyResult {
  /** Weighted average value per trade */
  expectancy: number
  /** Total estimated potential account profit */
  potentialProfit: number
  /** Current profitability status of strategy */
  status: 'POSITIVE' | 'NEGATIVE'
}

/**
 * Trading instrument configuration data.
 * @description Settings defining properties of financial instruments.
 */
export interface InstrumentConfig {
  /** Standard contract size for position */
  contractSize: number
  /** Minimum price movement increment value */
  pipSize: number
  /** Category of the financial instrument */
  type: InstrumentType
}

/**
 * Valid trading instrument categories.
 * @description List of supported asset classes for calculation.
 */
export type InstrumentType = 'CRYPTO' | 'FOREX' | 'INDEX' | 'METAL'

/**
 * Parameters for position sizing.
 * @description Inputs required to calculate optimal lot.
 */
export interface LotSizeParams {
  /** Account leverage multiplier value */
  leverage: number
  /** Planned trade entry price level */
  openPrice: number
  /** Name of the trading pair */
  pairName: string
  /** Absolute risk amount in USD */
  riskUSD: number
  /** Planned trade stop loss price */
  stopPrice: number
}

/**
 * Result of lot size calculation.
 * @description Detailed position and risk management metrics.
 */
export interface LotSizeResult {
  /** General symbol and timing information */
  info: {
    symbol: string
    timestamp: string
    type: string
  }
  /** Required margin and leverage details */
  margin: {
    leverage: string
    required: number
  }
  /** Calculated position size and units */
  position: {
    lot: number
    pipValue: number
    units: number
  }
  /** Risk metrics for the position */
  risk: {
    amount: number
    stopDistance: number
    stopPoints: number
  }
}

/**
 * Supported pivot point methodologies.
 * @description List of algorithms for pivot calculation.
 */
export type PivotMethod = 'CAMARILLA' | 'CLASSIC' | 'DEMARKS' | 'FIBONACCI' | 'WOODIES'

/**
 * Parameters for pivot points.
 * @description Price data required for pivot calculation.
 */
export interface PivotParams {
  /** Most recent period closing price */
  close: number
  /** Highest price reached during period */
  high: number
  /** Lowest price reached during period */
  low: number
  /** Method used for pivot calculation */
  method: PivotMethod
  /** Period opening price if required */
  open?: number
}

/**
 * Result of pivot calculation.
 * @description Calculated support and resistance price levels.
 */
export interface PivotResult {
  /** Method utilized for the calculation */
  method: PivotMethod
  /** Main central pivot point level */
  p: number
  /** First resistance level price value */
  r1: number
  /** Second resistance level if calculated */
  r2?: number | undefined
  /** Third resistance level if calculated */
  r3?: number | undefined
  /** Fourth resistance level if calculated */
  r4?: number | undefined
  /** First support level price value */
  s1: number
  /** Second support level if calculated */
  s2?: number | undefined
  /** Third support level if calculated */
  s3?: number | undefined
  /** Fourth support level if calculated */
  s4?: number | undefined
}

/**
 * Parameters for profit calculation.
 * @description Data needed to calculate trade results.
 */
export interface ProfitParams {
  /** Price level at trade entry */
  entryPrice: number
  /** Price level at trade exit */
  exitPrice: number
  /** Total volume of position lots */
  lotSize: number
  /** Name of the traded instrument */
  pairName: string
  /** Side of the market position */
  sidePosition: 'BUY' | 'SELL'
}

/**
 * Result of profit calculation.
 * @description Outcome metrics of a single trade.
 */
export interface ProfitResult {
  /** Indicates if trade was profitable */
  isProfit: boolean
  /** Total distance moved in pips */
  pips: number
  /** Absolute profit or loss USD */
  profitUSD: number
  /** Side of the market position */
  sidePosition: 'BUY' | 'SELL'
  /** Trading symbol of the instrument */
  symbol: string
  /** Type of the trading instrument */
  type: string
}

/**
 * Record of single trade execution.
 * @description Individual transaction log entry for simulation.
 */
export interface TradeLog {
  /** Account balance after trade execution */
  balance: number
  /** Numerical day of simulation period */
  day: number
  /** Net profit or loss amount */
  profitLoss: number
  /** Outcome result of the trade */
  result: string
  /** Sequence number of the trade */
  trade: number
}

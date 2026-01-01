import type * as Types from '@app/Types.ts'

/**
 * Global instrument configuration collection.
 * @description Stores contract and pip settings for various symbols.
 */
export const instrumentConfigs: Record<string, Types.InstrumentConfig> = {
  AUDJPY: {
    type: 'FOREX',
    contractSize: 100000,
    pipSize: 0.01
  },
  AUDNZD: {
    type: 'FOREX',
    contractSize: 100000,
    pipSize: 0.0001
  },
  AUDUSD: {
    type: 'FOREX',
    contractSize: 100000,
    pipSize: 0.0001
  },
  BTCUSD: {
    type: 'CRYPTO',
    contractSize: 1,
    pipSize: 1.0
  },
  CADJPY: {
    type: 'FOREX',
    contractSize: 100000,
    pipSize: 0.01
  },
  CHFJPY: {
    type: 'FOREX',
    contractSize: 100000,
    pipSize: 0.01
  },
  ETHUSD: {
    type: 'CRYPTO',
    contractSize: 1,
    pipSize: 1.0
  },
  EURAUD: {
    type: 'FOREX',
    contractSize: 100000,
    pipSize: 0.0001
  },
  EURGBP: {
    type: 'FOREX',
    contractSize: 100000,
    pipSize: 0.0001
  },
  EURJPY: {
    type: 'FOREX',
    contractSize: 100000,
    pipSize: 0.01
  },
  EURNZD: {
    type: 'FOREX',
    contractSize: 100000,
    pipSize: 0.0001
  },
  EURUSD: {
    type: 'FOREX',
    contractSize: 100000,
    pipSize: 0.0001
  },
  GBPCAD: {
    type: 'FOREX',
    contractSize: 100000,
    pipSize: 0.0001
  },
  GBPJPY: {
    type: 'FOREX',
    contractSize: 100000,
    pipSize: 0.01
  },
  GBPNZD: {
    type: 'FOREX',
    contractSize: 100000,
    pipSize: 0.0001
  },
  GBPUSD: {
    type: 'FOREX',
    contractSize: 100000,
    pipSize: 0.0001
  },
  GER40: {
    type: 'INDEX',
    contractSize: 1,
    pipSize: 1.0
  },
  JPN225: {
    type: 'INDEX',
    contractSize: 1,
    pipSize: 1.0
  },
  NAS100: {
    type: 'INDEX',
    contractSize: 1,
    pipSize: 1.0
  },
  NZDJPY: {
    type: 'FOREX',
    contractSize: 100000,
    pipSize: 0.01
  },
  NZDUSD: {
    type: 'FOREX',
    contractSize: 100000,
    pipSize: 0.0001
  },
  SOLUSD: {
    type: 'CRYPTO',
    contractSize: 1,
    pipSize: 0.01
  },
  SPX500: {
    type: 'INDEX',
    contractSize: 1,
    pipSize: 1.0
  },
  UK100: {
    type: 'INDEX',
    contractSize: 1,
    pipSize: 1.0
  },
  UKOIL: {
    type: 'INDEX',
    contractSize: 100,
    pipSize: 0.01
  },
  US30: {
    type: 'INDEX',
    contractSize: 1,
    pipSize: 1.0
  },
  USDCAD: {
    type: 'FOREX',
    contractSize: 100000,
    pipSize: 0.0001
  },
  USDCHF: {
    type: 'FOREX',
    contractSize: 100000,
    pipSize: 0.0001
  },
  USDJPY: {
    type: 'FOREX',
    contractSize: 100000,
    pipSize: 0.01
  },
  USOIL: {
    type: 'INDEX',
    contractSize: 100,
    pipSize: 0.01
  },
  XAGUSD: {
    type: 'METAL',
    contractSize: 5000,
    pipSize: 0.01
  },
  XAUUSD: {
    type: 'METAL',
    contractSize: 100,
    pipSize: 0.1
  },
  XNGUSD: {
    type: 'INDEX',
    contractSize: 10000,
    pipSize: 0.001
  }
}

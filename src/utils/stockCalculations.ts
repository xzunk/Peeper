export interface StockMetrics {
  ticker: string;
  price: number;
  eps: number;
  totalEquity: number;
  totalRevenue: number;
  operatingCashFlow: number;
  outstandingShares: number;
  netIncome: number;
  totalAssets: number;
  totalLiabilities: number;
  ebitda: number;
}

export interface ValuationRatios {
  pe: number;
  pb: number;
  ps: number;
  peg: number;
  evToEbitda: number;
}

export const calculateRatios = (metrics: StockMetrics): ValuationRatios => {
  const bookValue = metrics.totalEquity / metrics.outstandingShares;
  const marketCap = metrics.price * metrics.outstandingShares;
  const enterpriseValue = marketCap + metrics.totalLiabilities - (metrics.totalAssets - metrics.totalLiabilities);

  return {
    pe: metrics.price / metrics.eps,
    pb: metrics.price / bookValue,
    ps: marketCap / metrics.totalRevenue,
    peg: (metrics.price / metrics.eps) / ((metrics.netIncome / metrics.totalEquity) * 100),
    evToEbitda: enterpriseValue / metrics.ebitda
  };
};

export const getValuationStatus = (ratio: number, benchmark: number): 'undervalued' | 'fair' | 'overvalued' => {
  if (ratio < benchmark * 0.8) return 'undervalued';
  if (ratio > benchmark * 1.2) return 'overvalued';
  return 'fair';
};

export const industryBenchmarks = {
  pe: 15,
  pb: 2.5,
  ps: 2.0,
  peg: 1.0,
  evToEbitda: 12
};
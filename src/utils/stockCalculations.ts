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
}

export interface ValuationRatios {
  pe: number;  // Price to Earnings
  pb: number;  // Price to Book
  ps: number;  // Price to Sales
  peg: number; // Price/Earnings to Growth
}

export const calculateRatios = (metrics: StockMetrics): ValuationRatios => {
  const bookValue = metrics.totalEquity / metrics.outstandingShares;
  const marketCap = metrics.price * metrics.outstandingShares;

  return {
    pe: metrics.price / metrics.eps,
    pb: metrics.price / bookValue,
    ps: marketCap / metrics.totalRevenue,
    peg: (metrics.price / metrics.eps) / ((metrics.netIncome / metrics.totalEquity) * 100),
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
};
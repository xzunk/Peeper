export interface StockMetrics {
  ticker: string;
  price: number;
  eps: number;
  totalRevenue: number;
  netIncome: number;
  totalEquity: number;
  outstandingShares: number;

}

export interface ValuationRatios {
  pe: number;
  pb: number;
  ps: number;
  roe: number;
  profitMargin: number;
  peg: number;
}

export const calculateRatios = (metrics: StockMetrics): ValuationRatios => {
  const bookValue = metrics.totalEquity / metrics.outstandingShares;
  const marketCap = metrics.price * metrics.outstandingShares;
  const pe = metrics.price / metrics.eps;
   const defaultGrowthRate = 10; // Using industry average growth rate
  
  return {
    pe,
    pb: metrics.price / bookValue,
    ps: marketCap / metrics.totalRevenue,
    roe: (metrics.netIncome / metrics.totalEquity) * 100,
    profitMargin: (metrics.netIncome / metrics.totalRevenue) * 100,
    peg: pe / defaultGrowthRate
  };
};

export const industryBenchmarks = {
  pe: 15,
  pb: 2.5,
  ps: 2.0,
  roe: 15,
  profitMargin: 10,
  peg: 1.0
};



export const getValuationStatus = (ratio: number, benchmark: number): 'undervalued' | 'fair' | 'overvalued' => {
  if (ratio < benchmark * 0.8) return 'undervalued';
  if (ratio > benchmark * 1.2) return 'overvalued';
  return 'fair';
};

export const getOverallValuation = (ratios: ValuationRatios): 'undervalued' | 'fair' | 'overvalued' => {
  let undervaluedCount = 0;
  let overvaluedCount = 0;

  Object.entries(ratios).forEach(([key, value]) => {
    const status = getValuationStatus(value, industryBenchmarks[key as keyof ValuationRatios]);
    if (status === 'undervalued') undervaluedCount++;
    if (status === 'overvalued') overvaluedCount++;
  });

  if (undervaluedCount >= 3) return 'undervalued';
  if (overvaluedCount >= 3) return 'overvalued';
  return 'fair';
};

// Function to handle float numbers in input parsing
export const parseNumberInput = (value: string): string => {
  // Replace commas with dots and remove spaces
  let cleanValue = value.replace(/\s/g, '').replace(',', '.');

  // Allow empty string or just "-" for user typing
  if (cleanValue === '' || cleanValue === '-') return cleanValue;

  // Allow a single decimal point for partial input like "12."
  if (/^-?\d*\.$/.test(cleanValue)) return cleanValue;

  // Validate number format
  if (!/^-?\d+(\.\d+)?$/.test(cleanValue)) return '0';

  return cleanValue;
};


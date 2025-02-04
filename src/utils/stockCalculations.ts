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
}

export const calculateRatios = (metrics: StockMetrics): ValuationRatios => {
  const bookValue = metrics.totalEquity / metrics.outstandingShares;
  const marketCap = metrics.price * metrics.outstandingShares;
  
  return {
    pe: metrics.price / metrics.eps,
    pb: metrics.price / bookValue,
    ps: marketCap / metrics.totalRevenue,
    roe: (metrics.netIncome / metrics.totalEquity) * 100,
    profitMargin: (metrics.netIncome / metrics.totalRevenue) * 100
  };
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

export const industryBenchmarks = {
  pe: 15,
  pb: 2.5,
  ps: 2.0,
  roe: 15,
  profitMargin: 10
};

// 
Updated
 
parseNumberInput 
function to 
handle
 
float
 
numbers

export const parseNumberInput = (value: string): number => {

export const parseNumberInput = (value: string): number => {

  // Remove 
commas and 
leading zeros

  // Remove 
all 
commas and 
spaces

  const cleanValue = value.replace(
/,/
g, '')
.replace(/^0+/, '')
;

  const cleanValue = value.replace(
/,|\s/
g, '')
;

  
return cleanValue === '' ? 0 : Number(cleanValue);

  

  // Check if it's a valid number (including decimals)

  if (!/^-?\d*\.?\d*$/.test(cleanValue)) return 0;

  

  // Convert to number, handling both integer and float

  const parsedValue = parseFloat(cleanValue);

  

  // Return 0 if NaN, otherwise return the parsed value

  return isNaN(parsedValue) ? 0 : parsedValue;
};

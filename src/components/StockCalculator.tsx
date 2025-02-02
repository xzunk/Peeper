import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  StockMetrics,
  ValuationRatios,
  calculateRatios,
  getValuationStatus,
  industryBenchmarks
} from '@/utils/stockCalculations';

const StockCalculator = () => {
  const { toast } = useToast();
  const [metrics, setMetrics] = useState<StockMetrics>({
    ticker: '',
    price: 0,
    eps: 0,
    totalEquity: 0,
    totalRevenue: 0,
    operatingCashFlow: 0,
    outstandingShares: 0,
    netIncome: 0,
    totalAssets: 0,
    totalLiabilities: 0,
    ebitda: 0
  });
  const [ratios, setRatios] = useState<ValuationRatios | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMetrics(prev => ({
      ...prev,
      [name]: name === 'ticker' ? value : Number(value)
    }));
  };

  const handleCalculate = () => {
    if (Object.values(metrics).some(value => value === 0)) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields with valid numbers.",
        variant: "destructive"
      });
      return;
    }

    const calculatedRatios = calculateRatios(metrics);
    setRatios(calculatedRatios);
    console.log('Calculated ratios:', calculatedRatios);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'undervalued': return 'text-success';
      case 'overvalued': return 'text-warning';
      default: return 'text-slate';
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold text-navy mb-8 text-center">
        Stock Valuation Calculator
      </h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Input Financial Data</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="ticker">Stock Ticker</Label>
              <Input
                id="ticker"
                name="ticker"
                value={metrics.ticker}
                onChange={handleInputChange}
                placeholder="e.g., AAPL"
                className="font-mono"
              />
            </div>
            
            {[
              { label: 'Stock Price ($)', name: 'price' },
              { label: 'Earnings Per Share ($)', name: 'eps' },
              { label: 'Total Equity ($M)', name: 'totalEquity' },
              { label: 'Total Revenue ($M)', name: 'totalRevenue' },
              { label: 'Operating Cash Flow ($M)', name: 'operatingCashFlow' },
              { label: 'Outstanding Shares (M)', name: 'outstandingShares' },
              { label: 'Net Income ($M)', name: 'netIncome' },
              { label: 'Total Assets ($M)', name: 'totalAssets' },
              { label: 'Total Liabilities ($M)', name: 'totalLiabilities' },
              { label: 'EBITDA ($M)', name: 'ebitda' }
            ].map(field => (
              <div key={field.name}>
                <Label htmlFor={field.name}>{field.label}</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="number"
                  value={metrics[field.name as keyof StockMetrics] || ''}
                  onChange={handleInputChange}
                  className="font-mono"
                  step="0.01"
                />
              </div>
            ))}
            
            <Button 
              onClick={handleCalculate}
              className="w-full bg-navy hover:bg-navy/90"
            >
              Calculate Valuation
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Valuation Results</h2>
          {ratios ? (
            <div className="space-y-4">
              {Object.entries(ratios).map(([key, value]) => {
                const status = getValuationStatus(value, industryBenchmarks[key as keyof ValuationRatios]);
                return (
                  <div key={key} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">
                        {key.toUpperCase()}
                      </span>
                      <span className="font-mono">
                        {value.toFixed(2)}
                      </span>
                    </div>
                    <div className="mt-2 flex justify-between items-center text-sm">
                      <span>Industry Avg: {industryBenchmarks[key as keyof ValuationRatios]}</span>
                      <span className={getStatusColor(status)}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              Enter financial data and calculate to see valuation results
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default StockCalculator;
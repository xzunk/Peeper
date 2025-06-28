import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  StockMetrics,
  ValuationRatios,
  calculateRatios,
  getValuationStatus,
  industryBenchmarks,
  getOverallValuation,
  parseNumberInput
} from '@/utils/stockCalculations';

const STORAGE_KEY = 'stockCalculatorData';

const StockCalculator = () => {
  const { toast } = useToast();
  const [metrics, setMetrics] = useState<StockMetrics>({
    ticker: '',
    price: 0,
    eps: 0,
    totalRevenue: 0,
    netIncome: 0,
    totalEquity: 0,
    outstandingShares: 0,
    
  });
  const [ratios, setRatios] = useState<ValuationRatios | null>(null);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      setMetrics(JSON.parse(savedData));
    }
  }, []);

  // Save data to localStorage whenever metrics change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(metrics));
  }, [metrics]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMetrics(prev => ({
      ...prev,
      [name]: name === 'ticker' ? value : parseNumberInput(value)
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

  const handleClear = () => {
    const clearedMetrics = {
      ticker: '',
      price: 0,
      eps: 0,
      totalRevenue: 0,
      netIncome: 0,
      totalEquity: 0,
      outstandingShares: 0,
    };
    setMetrics(clearedMetrics);
    setRatios(null);
    localStorage.removeItem(STORAGE_KEY);
    toast({
      title: "Data Cleared",
      description: "All input fields have been reset.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'undervalued': return 'text-green-600';
      case 'overvalued': return 'text-red-600';
      default: return 'text-slate-600';
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'undervalued': return 'bg-green-50';
      case 'overvalued': return 'bg-red-50';
      default: return 'bg-gray-50';
    }
  };

  return (
    <div className="container mx-auto px-4 max-w-7xl">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center text-navy">
        Stock Valuation Calculator
      </h1>
      
      <div className="grid lg:grid-cols-2 gap-6 md:gap-8 mb-8">
        <Card className="p-4 md:p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-navy">Input Financial Data</h2>
            <Button 
              onClick={handleClear}
              variant="outline"
              className="text-red-600 hover:text-red-700"
            >
              Clear All
            </Button>
          </div>
          <p className="mb-4">Enter the following key metrics from the company's annual report:</p>
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
              { label: 'Current Stock Price ', name: 'price' },
              { label: 'Earnings Per Share - EPS ', name: 'eps' },
              { label: 'Total Revenue (Mn)', name: 'totalRevenue' },
              { label: 'Net Income (Mn)', name: 'netIncome' },
              { label: 'Total Equity (Mn)', name: 'totalEquity' },
              { label: 'Outstanding Shares (Mn)', name: 'outstandingShares' }
          
            ].map(field => (
              <div key={field.name} className="space-y-1.5">
                <Label htmlFor={field.name}>{field.label}</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="text"
                  value={metrics[field.name as keyof StockMetrics] || ''}
                  onChange={handleInputChange}
                  className="font-mono"
                  placeholder="0"
                />
              </div>
            ))}
            
            <Button 
              onClick={handleCalculate}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-6"
            >
              Calculate Valuation
            </Button>
          </div>
        </Card>

        <Card className="p-4 md:p-6 shadow-sm">
          <h2 className="text-lg md:text-xl font-semibold mb-4 text-navy">Valuation Results</h2>
          {ratios ? (
            <div className="space-y-4 md:space-y-6">
              {metrics.ticker && (
                <Alert className={`${getStatusBgColor(getOverallValuation(ratios))} border-l-4 ${
                  getOverallValuation(ratios) === 'undervalued' ? 'border-l-green-500' : 
                  getOverallValuation(ratios) === 'overvalued' ? 'border-l-red-500' : 
                  'border-l-gray-500'
                } animate-fade-in`}>
                  <AlertTitle className="text-lg font-semibold">
                    {metrics.ticker} Stock Analysis
                  </AlertTitle>
                  <AlertDescription className="mt-2">
                    Overall, this stock appears to be{' '}
                    <span className={`font-semibold ${getStatusColor(getOverallValuation(ratios))} animate-pulse`}>
                      {getOverallValuation(ratios).toUpperCase()}
                    </span>
                    {' '}based on multiple valuation metrics.
                  </AlertDescription>
                </Alert>
              )}

              {Object.entries(ratios).map(([key, value]) => {
                const status = getValuationStatus(value, industryBenchmarks[key as keyof ValuationRatios]);
                return (
                  <div key={key} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors animate-fade-in">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-navy">
                        {key === 'pe' ? 'P/E Ratio' :
                         key === 'pb' ? 'P/B Ratio' :
                         key === 'ps' ? 'P/S Ratio' :
                         key === 'peg' ? 'PEG Ratio' :
                         key === 'roe' ? 'Return on Equity (%)' :
                         'Profit Margin (%)'}
                      </span>
                      <span className="font-mono text-lg">
                        {value.toFixed(2)}
                      </span>
                    </div>
                    <div className="mt-2 flex justify-between items-center text-sm">
                      <span className="text-gray-600">Industry Avg: {industryBenchmarks[key as keyof ValuationRatios]}</span>
                      <span className={`${getStatusColor(status)} font-medium`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      {key === 'pe' && 'Lower P/E suggests better value, comparing price to earnings.'}
                      {key === 'pb' && 'Lower P/B suggests the stock might be undervalued relative to book value.'}
                      {key === 'ps' && 'Lower P/S indicates you\'re paying less for each dollar of sales.'}
                      {key === 'peg' && 'PEG < 1 suggests the stock might be undervalued given its growth rate.'}
                      {key === 'roe' && 'Higher ROE indicates better efficiency in generating profits from equity.'}
                      {key === 'profitMargin' && 'Higher profit margin indicates better operational efficiency.'}
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

      <footer className="border-t border-gray-200 pt-8 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-left">
            <h3 className="font-semibold text-navy mb-2">About</h3>
            <p className="text-sm text-gray-600">
             Peeper is A comprehensive stock valuation tool for the Global Stock markets, helping investors make informed decisions.
            </p>
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-navy mb-2">Disclaimer</h3>
            <p className="text-sm text-gray-600">
              This calculator provides estimates based on financial data. Always conduct thorough research before making investment decisions.
            </p>
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-navy mb-2"></h3>
            <p className="text-sm text-gray-600">
              
            </p>
          </div>
        </div>
     
      </footer>
    </div>
  );
};

export default StockCalculator;

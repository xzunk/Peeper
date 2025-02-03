import React, { useState } from 'react';
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
  getOverallValuation
} from '@/utils/stockCalculations';

const StockCalculator = () => {
  const { toast } = useToast();
  const [metrics, setMetrics] = useState<StockMetrics>({
    ticker: '',
    price: 0,
    eps: 0,
    totalEquity: 0,
    totalRevenue: 0,
    outstandingShares: 0,
    netIncome: 0,
    totalAssets: 0,
    totalLiabilities: 0
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
          <h2 className="text-lg md:text-xl font-semibold mb-4 text-navy">Input Financial Data</h2>
          <p className="mb-4">Use the annual reports of selected companies as a source of data collection. </p>
          <div className="space-y-4">
            <div>
              <Label htmlFor="ticker">Stock Ticker</Label>
              <Input
                id="ticker"
                name="ticker"
                value={metrics.ticker}
                onChange={handleInputChange}
                placeholder="e.g., JKH"
                className="font-mono"
              />
            </div>
            
            {[
              { label: 'Stock Price ', name: 'price' },
              { label: 'Earnings Per Share ', name: 'eps' },
              { label: 'Total Equity (Mn)', name: 'totalEquity' },
              { label: 'Total Revenue (Mn)', name: 'totalRevenue' },
              { label: 'Outstanding Shares (Mn)', name: 'outstandingShares' },
              { label: 'Net Income (Mn)', name: 'netIncome' },
              { label: 'Total Assets (Mn)', name: 'totalAssets' },
              { label: 'Total Liabilities (Mn)', name: 'totalLiabilities' }
            ].map(field => (
              <div key={field.name} className="space-y-1.5">
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
                }`}>
                  <AlertTitle className="text-lg font-semibold">
                    {metrics.ticker} Stock Analysis
                  </AlertTitle>
                  <AlertDescription className="mt-2">
                    Overall, this stock appears to be{' '}
                    <span className={`font-semibold ${getStatusColor(getOverallValuation(ratios))}`}>
                      {getOverallValuation(ratios).toUpperCase()}
                    </span>
                    {' '}based on multiple valuation metrics.
                  </AlertDescription>
                </Alert>
              )}

              {Object.entries(ratios).map(([key, value]) => {
                const status = getValuationStatus(value, industryBenchmarks[key as keyof ValuationRatios]);
                return (
                  <div key={key} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-navy">
                        {key === 'pe' ? 'P/E Ratio' :
                         key === 'pb' ? 'P/B Ratio' :
                         key === 'ps' ? 'P/S Ratio' :
                         key === 'nav' ? 'NAV per Share' :
                         'PEG Ratio'}
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
                      {key === 'pe' && 'Lower P/E suggests better value, comparing company\'s price to its earnings.'}
                      {key === 'pb' && 'Lower P/B suggests the stock might be undervalued relative to its book value.'}
                      {key === 'ps' && 'Lower P/S indicates you\'re paying less for each rupee of sales.'}
                      {key === 'peg' && 'PEG below 1 typically suggests undervaluation considering growth.'}
                      {key === 'nav' && 'NAV per share represents the net value of assets per share. Price below NAV might indicate undervaluation.'}
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

      {/* Combined Ad Space */}
      <div className="w-full flex flex-col md:flex-row justify-center gap-8 mb-8">
        <div className="bg-gray-100 w-[320px] h-[250px] flex items-center justify-center text-gray-400 border border-gray-200 rounded-lg">
          Advertisement Space (320x250)
        </div>
        <div className="bg-gray-100 w-[320px] h-[250px] flex items-center justify-center text-gray-400 border border-gray-200 rounded-lg">
          Advertisement Space (320x250)
        </div>
      </div>

      {/* Footer Section */}
      <footer className="border-t border-gray-200 pt-8 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-left">
            <h3 className="font-semibold text-navy mb-2">About</h3>
            <p className="text-sm text-gray-600">
             Peeper is A comprehensive stock valuation tool for the Global Stock markets, (Find PBV/NAV/PE) helping investors make informed decisions.
            </p>
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-navy mb-2">Disclaimer</h3>
            <p className="text-sm text-gray-600">
              This calculator provides estimates based on financial data. Always conduct thorough research before making investment decisions.
            </p>
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-navy mb-2">Contact</h3>
            <p className="text-sm text-gray-600">
              For support or inquiries, please visit our contact page or email cs@cosmo.com.lk
            </p>
          </div>
        </div>
        <div className="text-center mt-8 text-sm text-gray-500">
          © {new Date().getFullYear()} Peeper| Backed by CosmoETSP. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default StockCalculator;

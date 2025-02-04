import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { parseNumberInput } from '@/utils/stockCalculations';

interface DividendStock {
  ticker: string;
  shares: number;
  price: number;
  annualDividend: number;
  frequency: 'Annual' | 'Semi-Annual' | 'Quarterly' | 'Monthly';
}

const STORAGE_KEY = 'dividendTrackerData';

const DividendTracker = () => {
  const { toast } = useToast();
  const [stocks, setStocks] = useState<DividendStock[]>([{
    ticker: '',
    shares: 0,
    price: 0,
    annualDividend: 0,
    frequency: 'Quarterly'
  }]);
  
  const [summary, setSummary] = useState<{
    totalAnnualIncome: number;
    averageYield: number;
    monthlyIncome: number;
  } | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      setStocks(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stocks));
  }, [stocks]);

  const handleInputChange = (index: number, field: keyof DividendStock, value: string) => {
    const newStocks = [...stocks];
    newStocks[index] = {
      ...newStocks[index],
      [field]: field === 'ticker' || field === 'frequency' ? value : parseNumberInput(value)
    };
    setStocks(newStocks);
  };

  const addStock = () => {
    setStocks([...stocks, {
      ticker: '',
      shares: 0,
      price: 0,
      annualDividend: 0,
      frequency: 'Quarterly'
    }]);
  };

  const removeStock = (index: number) => {
    if (stocks.length > 1) {
      const newStocks = stocks.filter((_, i) => i !== index);
      setStocks(newStocks);
    }
  };

  const calculateDividends = () => {
    if (!stocks.every(stock => stock.ticker && stock.shares && stock.price && stock.annualDividend)) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields with valid numbers.",
        variant: "destructive"
      });
      return;
    }

    const totalAnnualIncome = stocks.reduce((sum, stock) => {
      return sum + (stock.shares * stock.annualDividend);
    }, 0);

    const totalValue = stocks.reduce((sum, stock) => {
      return sum + (stock.shares * stock.price);
    }, 0);

    const averageYield = (totalAnnualIncome / totalValue) * 100;

    setSummary({
      totalAnnualIncome,
      averageYield,
      monthlyIncome: totalAnnualIncome / 12
    });
  };

  const handleClear = () => {
    setStocks([{
      ticker: '',
      shares: 0,
      price: 0,
      annualDividend: 0,
      frequency: 'Quarterly'
    }]);
    setSummary(null);
    localStorage.removeItem(STORAGE_KEY);
    toast({
      title: "Data Cleared",
      description: "All dividend tracking data has been reset.",
    });
  };

  return (
    <div className="container mx-auto px-4 max-w-7xl">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center text-navy">
        Dividend Income Tracker
      </h1>
      
      <div className="grid lg:grid-cols-2 gap-6 md:gap-8 mb-8">
        <Card className="p-4 md:p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-navy">Dividend Stocks</h2>
            <Button 
              onClick={handleClear}
              variant="outline"
              className="text-red-600 hover:text-red-700"
            >
              Clear All
            </Button>
          </div>
          
          <div className="space-y-6">
            {stocks.map((stock, index) => (
              <div key={index} className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Stock Ticker</Label>
                    <Input
                      value={stock.ticker}
                      onChange={(e) => handleInputChange(index, 'ticker', e.target.value)}
                      placeholder="e.g., AAPL"
                    />
                  </div>
                  <div>
                    <Label>Number of Shares</Label>
                    <Input
                      value={stock.shares || ''}
                      onChange={(e) => handleInputChange(index, 'shares', e.target.value)}
                      placeholder="e.g., 100"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Current Price</Label>
                    <Input
                      value={stock.price || ''}
                      onChange={(e) => handleInputChange(index, 'price', e.target.value)}
                      placeholder="e.g., 150.50"
                    />
                  </div>
                  <div>
                    <Label>Annual Dividend/Share</Label>
                    <Input
                      value={stock.annualDividend || ''}
                      onChange={(e) => handleInputChange(index, 'annualDividend', e.target.value)}
                      placeholder="e.g., 2.08"
                    />
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="w-2/3">
                    <Label>Payment Frequency</Label>
                    <select
                      value={stock.frequency}
                      onChange={(e) => handleInputChange(index, 'frequency', e.target.value)}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="Annual">Annual</option>
                      <option value="Semi-Annual">Semi-Annual</option>
                      <option value="Quarterly">Quarterly</option>
                      <option value="Monthly">Monthly</option>
                    </select>
                  </div>
                  
                  {stocks.length > 1 && (
                    <Button
                      variant="outline"
                      onClick={() => removeStock(index)}
                      className="text-red-600"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            ))}
            
            <Button 
              onClick={addStock}
              variant="outline"
              className="w-full mt-2"
            >
              Add Stock
            </Button>
            
            <Button 
              onClick={calculateDividends}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-6"
            >
              Calculate Dividend Income
            </Button>
          </div>
        </Card>

        <Card className="p-4 md:p-6 shadow-sm">
          <h2 className="text-lg md:text-xl font-semibold mb-4 text-navy">Dividend Summary</h2>
          
          {summary ? (
            <div className="space-y-4 animate-fade-in">
              <Alert className="bg-green-50 border-l-4 border-l-green-500">
                <AlertTitle className="text-lg font-semibold">
                  Total Annual Dividend Income
                </AlertTitle>
                <AlertDescription className="text-2xl font-mono mt-2">
                  {summary.totalAnnualIncome.toFixed(2)}
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">Average Yield</h3>
                  <p className="text-2xl font-mono text-green-600">
                    {summary.averageYield.toFixed(2)}%
                  </p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">Monthly Income</h3>
                  <p className="text-2xl font-mono text-green-600">
                    {summary.monthlyIncome.toFixed(2)}
                  </p>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Income Breakdown</h3>
                <div className="space-y-2 text-sm">
                  <p>Daily: {(summary.totalAnnualIncome / 365).toFixed(2)}</p>
                  <p>Weekly: {(summary.totalAnnualIncome / 52).toFixed(2)}</p>
                  <p>Monthly: {summary.monthlyIncome.toFixed(2)}</p>
                  <p>Quarterly: {(summary.totalAnnualIncome / 4).toFixed(2)}</p>
                  <p>Annual: {summary.totalAnnualIncome.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              Enter your dividend stocks and calculate to see income summary. 
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default DividendTracker;

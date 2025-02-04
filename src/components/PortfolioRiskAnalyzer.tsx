import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { parseNumberInput } from '@/utils/stockCalculations';

interface PortfolioStock {
  ticker: string;
  allocation: number;
  beta: number;
}

const STORAGE_KEY = 'portfolioRiskData';

const PortfolioRiskAnalyzer = () => {
  const { toast } = useToast();
  const [stocks, setStocks] = useState<PortfolioStock[]>([
    { ticker: '', allocation: 0, beta: 0 }
  ]);
  const [portfolioRisk, setPortfolioRisk] = useState<{
    totalBeta: number;
    riskLevel: string;
  } | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        // Ensure all numerical values are properly initialized
        const validatedData = parsedData.map((stock: PortfolioStock) => ({
          ...stock,
          allocation: Number(stock.allocation) || 0,
          beta: Number(stock.beta) || 0
        }));
        setStocks(validatedData);
      } catch (e) {
        console.error('Error parsing saved data:', e);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stocks));
  }, [stocks]);

 const handleInputChange = (index: number, field: keyof PortfolioStock, value: string) => {
  const newStocks = [...stocks];

  newStocks[index] = {
    ...newStocks[index],
    [field]: field === 'ticker' ? value : value // Store as string to preserve decimal input
  };

  setStocks(newStocks);
};


  const addStock = () => {
    setStocks([...stocks, { ticker: '', allocation: 0, beta: 0 }]);
  };

  const removeStock = (index: number) => {
    if (stocks.length > 1) {
      const newStocks = stocks.filter((_, i) => i !== index);
      setStocks(newStocks);
    }
  };

  const calculateRisk = () => {
    // Calculate total allocation with higher precision
    const totalAllocation = stocks.reduce((sum, stock) => sum + (Number(stock.allocation) || 0), 0);
    
    // Use a small epsilon value for floating-point comparison
    const epsilon = 0.0001;
    if (Math.abs(totalAllocation - 100) > epsilon) {
      toast({
        title: "Validation Error",
        description: `Total allocation must equal 100%. Current total: ${Number(totalAllocation).toFixed(2)}%`,
        variant: "destructive"
      });
      return;
    }

    const weightedBeta = stocks.reduce((sum, stock) => {
  const allocation = Number(stock.allocation) || 0;
  const beta = parseFloat(stock.beta as unknown as string) || 0; // Ensure conversion here
  return sum + (beta * (allocation / 100));
}, 0);


    let riskLevel = 'Moderate';
    if (weightedBeta < 0.8) riskLevel = 'Low';
    else if (weightedBeta > 1.2) riskLevel = 'High';

    setPortfolioRisk({
      totalBeta: Number(weightedBeta),
      riskLevel
    });
  };

  const handleClear = () => {
    setStocks([{ ticker: '', allocation: 0, beta: 0 }]);
    setPortfolioRisk(null);
    localStorage.removeItem(STORAGE_KEY);
    toast({
      title: "Data Cleared",
      description: "All portfolio data has been reset.",
    });
  };

  return (
    <div className="container mx-auto px-4 max-w-7xl">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center text-navy">
        Portfolio Risk Analyzer
      </h1>
      
      <div className="grid lg:grid-cols-2 gap-6 md:gap-8 mb-8">
        <Card className="p-4 md:p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-navy">Portfolio Composition</h2>
            <Button 
              onClick={handleClear}
              variant="outline"
              className="text-red-600 hover:text-red-700"
            >
              Clear All
            </Button>
          </div>
          
          <div className="space-y-4">
            {stocks.map((stock, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 items-end">
                <div>
                  <Label>Stock Ticker</Label>
                  <Input
                    value={stock.ticker}
                    onChange={(e) => handleInputChange(index, 'ticker', e.target.value)}
                    placeholder="e.g., AAPL"
                  />
                </div>
                <div>
                  <Label>Allocation (%)</Label>
                  <Input
                    value={stock.allocation || ''}
                    onChange={(e) => handleInputChange(index, 'allocation', e.target.value)}
                    placeholder="e.g., 25"
                  />
                </div>
                <div>
                  <Label>Beta</Label>
                  <div className="flex gap-2">
                    <Input
                      value={stock.beta || ''}
                      onChange={(e) => handleInputChange(index, 'beta', e.target.value)}
                      placeholder="e.g., 1.2"
                    />
                    {stocks.length > 1 && (
                      <Button
                        variant="outline"
                        onClick={() => removeStock(index)}
                        className="text-red-600"
                      >
                        X
                      </Button>
                    )}
                  </div>
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
              onClick={calculateRisk}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-6"
            >
              Calculate Portfolio Risk
            </Button>
          </div>
        </Card>

        <Card className="p-4 md:p-6 shadow-sm">
          <h2 className="text-lg md:text-xl font-semibold mb-4 text-navy">Risk Analysis</h2>
          
          {portfolioRisk ? (
            <div className="space-y-4 animate-fade-in">
              <Alert className={`
                ${portfolioRisk.riskLevel === 'Low' ? 'bg-green-50 border-l-green-500' :
                  portfolioRisk.riskLevel === 'High' ? 'bg-red-50 border-l-red-500' :
                  'bg-yellow-50 border-l-yellow-500'} 
                border-l-4
              `}>
                <AlertTitle className="text-lg font-semibold">
                  Portfolio Risk Level: {portfolioRisk.riskLevel}
                </AlertTitle>
                <AlertDescription>
                  Portfolio Beta: {portfolioRisk.totalBeta.toFixed(2)}
                </AlertDescription>
              </Alert>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Risk Interpretation</h3>
                <p className="text-sm text-gray-600">
                  {portfolioRisk.totalBeta < 1
                    ? "Your portfolio is less volatile than the market average."
                    : portfolioRisk.totalBeta > 1
                    ? "Your portfolio is more volatile than the market average."
                    : "Your portfolio closely follows market movements."}
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Risk Management Tips</h3>
                <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                  <li>Consider diversifying across different sectors</li>
                  <li>Balance high-beta stocks with low-beta stocks</li>
                  <li>Review and rebalance your portfolio regularly</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              Enter your portfolio details and calculate to see risk analysis. You Can Find Beta Value From Stock Exchage Website!
            </div>
          )}
        </Card>
      </div>
    </div>
  );

};

export default PortfolioRiskAnalyzer;

import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { parseNumberInput } from '@/utils/stockCalculations';

const STORAGE_KEY = 'profitCalculatorData';

interface TransactionData {
  quantity: number;
  buyPrice: number;
  sellPrice: number;
  isIntraday: boolean;
}

const calculateBrokerageFees = (amount: number, isIntraday: boolean): number => {
  if (amount <= 100000000) { // Up to 100M
    return amount * (isIntraday ? 0.0056 : 0.0112);
  } else if (amount < 1000000000) { // Between 100M and 1B
    const firstTier = 100000000 * 0.0112;
    const remainingAmount = amount - 100000000;
    const secondTier = remainingAmount * 0.006125;
    return firstTier + secondTier;
  } else { // 1B and above - negotiable, using minimum rates
    return amount * 0.006125; // Using minimum rate as base
  }
};

const ProfitCalculator = () => {
  const { toast } = useToast();
  const [data, setData] = useState<TransactionData>({
    quantity: 0,
    buyPrice: 0,
    sellPrice: 0,
    isIntraday: false
  });
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : parseNumberInput(value)
    }));
  };

  const calculateProfit = () => {
    if (!data.quantity || !data.buyPrice || !data.sellPrice) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields with valid numbers.",
        variant: "destructive"
      });
      return;
    }

    const buyValue = data.quantity * data.buyPrice;
    const sellValue = data.quantity * data.sellPrice;
    
    const buyFees = calculateBrokerageFees(buyValue, data.isIntraday);
    const sellFees = calculateBrokerageFees(sellValue, data.isIntraday);
    
    // For intraday trading, only charge one side of fees
    const totalFees = data.isIntraday ? Math.max(buyFees, sellFees) : (buyFees + sellFees);
    
    const grossProfit = sellValue - buyValue;
    const netProfit = grossProfit - totalFees;
    
    setResult({
      grossProfit,
      fees: totalFees,
      netProfit,
      roi: (netProfit / buyValue) * 100
    });
  };

  const handleClear = () => {
    setData({
      quantity: 0,
      buyPrice: 0,
      sellPrice: 0,
      isIntraday: false
    });
    setResult(null);
    localStorage.removeItem(STORAGE_KEY);
    toast({
      title: "Data Cleared",
      description: "All input fields have been reset.",
    });
  };

  return (
    <div className="container mx-auto px-4 max-w-7xl">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center text-navy">
        CSE Profit Calculator
      </h1>
      
      <div className="grid lg:grid-cols-2 gap-6 md:gap-8 mb-8">
        <Card className="p-4 md:p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-navy">Transaction Details</h2>
            <Button 
              onClick={handleClear}
              variant="outline"
              className="text-red-600 hover:text-red-700"
            >
              Clear All
            </Button>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="quantity">Number of Shares</Label>
              <Input
                id="quantity"
                name="quantity"
                value={data.quantity || ''}
                onChange={handleInputChange}
                className="font-mono"
                placeholder="0"
              />
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="buyPrice">Buy Price (LKR)</Label>
              <Input
                id="buyPrice"
                name="buyPrice"
                value={data.buyPrice || ''}
                onChange={handleInputChange}
                className="font-mono"
                placeholder="0"
              />
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="sellPrice">Sell Price (LKR)</Label>
              <Input
                id="sellPrice"
                name="sellPrice"
                value={data.sellPrice || ''}
                onChange={handleInputChange}
                className="font-mono"
                placeholder="0"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isIntraday"
                name="isIntraday"
                checked={data.isIntraday}
                onChange={handleInputChange}
                className="h-4 w-4"
              />
              <Label htmlFor="isIntraday">Intraday Trading</Label>
            </div>
            
            <Button 
              onClick={calculateProfit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-6"
            >
              Calculate Profit
            </Button>
          </div>
        </Card>

        <Card className="p-4 md:p-6 shadow-sm">
          <h2 className="text-lg md:text-xl font-semibold mb-4 text-navy">Results</h2>
          {result ? (
            <div className="space-y-4 animate-fade-in">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-navy">Gross Profit/Loss</span>
                  <span className={`font-mono text-lg ${result.grossProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    LKR {result.grossProfit.toFixed(2)}
                  </span>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-navy">Total Fees</span>
                  <span className="font-mono text-lg text-gray-600">
                    LKR {result.fees.toFixed(2)}
                  </span>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-navy">Net Profit/Loss</span>
                  <span className={`font-mono text-lg ${result.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    LKR {result.netProfit.toFixed(2)}
                  </span>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-navy">ROI</span>
                  <span className={`font-mono text-lg ${result.roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {result.roi.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              Enter transaction details and calculate to see results
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ProfitCalculator;
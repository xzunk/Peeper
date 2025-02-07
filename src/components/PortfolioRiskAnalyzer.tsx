import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import Footer from "@/components/Footer";
import PortfolioHeader from "./portfolio/PortfolioHeader";
import PortfolioForm from "./portfolio/PortfolioForm";
import RiskAnalysis from "./portfolio/RiskAnalysis";
import PortfolioVisualization from "./portfolio/PortfolioVisualization";

interface PortfolioStock {
  ticker: string;
  shares: number;
  beta: number;
  allocation: number;
}

const STORAGE_KEY = 'portfolioRiskData';

const PortfolioRiskAnalyzer = () => {
  const { toast } = useToast();
  const [stocks, setStocks] = useState<PortfolioStock[]>([
    { ticker: '', shares: 0, beta: 0, allocation: 0 }
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
        const validatedData = parsedData.map((stock: PortfolioStock) => ({
          ...stock,
          shares: Number(stock.shares) || 0,
          beta: Number(stock.beta) || 0,
          allocation: Number(stock.allocation) || 0
        }));
        setStocks(validatedData);
        updateAllocations(validatedData);
      } catch (e) {
        console.error('Error parsing saved data:', e);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stocks));
  }, [stocks]);

  const updateAllocations = (currentStocks: PortfolioStock[]) => {
    const totalShares = currentStocks.reduce((sum, stock) => sum + stock.shares, 0);
    
    if (totalShares === 0) {
      const updatedStocks = currentStocks.map(stock => ({ ...stock, allocation: 0 }));
      setStocks(updatedStocks);
      return;
    }

    const updatedStocks = currentStocks.map(stock => ({
      ...stock,
      allocation: (stock.shares / totalShares) * 100
    }));
    
    setStocks(updatedStocks);
  };

  const handleInputChange = (index: number, field: keyof PortfolioStock, value: string) => {
    const newStocks = [...stocks];
    const parsedValue = field === 'shares' ? Math.max(0, parseInt(value) || 0) : value;
    
    newStocks[index] = {
      ...newStocks[index],
      [field]: parsedValue
    };

    if (field === 'shares') {
      updateAllocations(newStocks);
    } else {
      setStocks(newStocks);
    }
  };

  const handleSharesAdjustment = (index: number, increment: boolean) => {
    const newStocks = [...stocks];
    const currentShares = newStocks[index].shares;
    newStocks[index] = {
      ...newStocks[index],
      shares: increment ? currentShares + 1 : Math.max(0, currentShares - 1)
    };
    updateAllocations(newStocks);
  };

  const addStock = () => {
    const newStocks = [...stocks, { ticker: '', shares: 0, beta: 0, allocation: 0 }];
    setStocks(newStocks);
    updateAllocations(newStocks);
  };

  const removeStock = (index: number) => {
    if (stocks.length > 1) {
      const newStocks = stocks.filter((_, i) => i !== index);
      updateAllocations(newStocks);
    }
  };

  const calculateRisk = () => {
    const totalAllocation = stocks.reduce((sum, stock) => sum + stock.allocation, 0);
    const epsilon = 0.0001;
    
    if (Math.abs(totalAllocation - 100) > epsilon) {
      toast({
        title: "Validation Error",
        description: `Total allocation must equal 100%. Current total: ${totalAllocation.toFixed(2)}%`,
        variant: "destructive"
      });
      return;
    }

    const weightedBeta = stocks.reduce((sum, stock) => {
      return sum + (stock.beta * (stock.allocation / 100));
    }, 0);

    let riskLevel = 'Moderate';
    if (weightedBeta < 0.8) riskLevel = 'Low';
    else if (weightedBeta > 1.2) riskLevel = 'High';

    setPortfolioRisk({
      totalBeta: weightedBeta,
      riskLevel
    });
  };

  const handleClear = () => {
    setStocks([{ ticker: '', shares: 0, beta: 0, allocation: 0 }]);
    setPortfolioRisk(null);
    localStorage.removeItem(STORAGE_KEY);
    toast({
      title: "Data Cleared",
      description: "All portfolio data has been reset.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <PortfolioHeader />
      
      <div className="container mx-auto px-4 max-w-7xl flex-grow py-8">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 mb-8">
          <PortfolioForm
            stocks={stocks}
            onInputChange={handleInputChange}
            onSharesAdjustment={handleSharesAdjustment}
            onRemoveStock={removeStock}
            onAddStock={addStock}
            onCalculateRisk={calculateRisk}
            onClear={handleClear}
          />

          <Card className="p-4 md:p-6 shadow-sm bg-white">
            <h2 className="text-lg md:text-xl font-semibold mb-4 text-navy">Risk Analysis</h2>
            <RiskAnalysis portfolioRisk={portfolioRisk} />
          </Card>
        </div>

        <Card className="p-4 md:p-6 shadow-sm bg-white mb-8">
          <PortfolioVisualization stocks={stocks} />
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default PortfolioRiskAnalyzer;
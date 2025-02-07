import React, { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { parseNumberInput } from '@/utils/stockCalculations';
import Footer from "@/components/Footer";
import DividendHeader from "./dividend/DividendHeader";
import DividendForm from "./dividend/DividendForm";
import DividendSummary from "./dividend/DividendSummary";

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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <DividendHeader />
      
      <div className="container mx-auto px-4 max-w-7xl flex-grow py-8">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 mb-8">
          <DividendForm
            stocks={stocks}
            onInputChange={handleInputChange}
            onRemoveStock={removeStock}
            onAddStock={addStock}
            onCalculate={calculateDividends}
            onClear={handleClear}
          />
          <DividendSummary summary={summary} />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DividendTracker;
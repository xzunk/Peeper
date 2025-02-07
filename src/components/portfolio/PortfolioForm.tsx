import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StockInput from "./StockInput";

interface PortfolioFormProps {
  stocks: Array<{
    ticker: string;
    shares: number;
    beta: number;
    allocation: number;
  }>;
  onInputChange: (index: number, field: string, value: string) => void;
  onSharesAdjustment: (index: number, increment: boolean) => void;
  onRemoveStock: (index: number) => void;
  onAddStock: () => void;
  onCalculateRisk: () => void;
  onClear: () => void;
}

const PortfolioForm = ({
  stocks,
  onInputChange,
  onSharesAdjustment,
  onRemoveStock,
  onAddStock,
  onCalculateRisk,
  onClear
}: PortfolioFormProps) => (
  <Card className="p-4 md:p-6 shadow-sm bg-white">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg md:text-xl font-semibold text-navy">Portfolio Composition</h2>
      <Button 
        onClick={onClear}
        variant="outline"
        className="text-red-600 hover:text-red-700"
      >
        Clear All
      </Button>
    </div>
    
    <div className="space-y-4">
      {stocks.map((stock, index) => (
        <StockInput
          key={index}
          stock={stock}
          index={index}
          onInputChange={onInputChange}
          onSharesAdjustment={onSharesAdjustment}
          onRemoveStock={onRemoveStock}
          showRemove={stocks.length > 1}
        />
      ))}
      
      <Button 
        onClick={onAddStock}
        variant="outline"
        className="w-full mt-2"
      >
        Add Stock
      </Button>
      
      <Button 
        onClick={onCalculateRisk}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-6"
      >
        Calculate Portfolio Risk
      </Button>
    </div>
  </Card>
);

export default PortfolioForm;
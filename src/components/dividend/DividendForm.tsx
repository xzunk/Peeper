import React from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface DividendStock {
  ticker: string;
  shares: number;
  price: number;
  annualDividend: number;
  frequency: 'Annual' | 'Semi-Annual' | 'Quarterly' | 'Monthly';
}

interface DividendFormProps {
  stocks: DividendStock[];
  onInputChange: (index: number, field: keyof DividendStock, value: string) => void;
  onRemoveStock: (index: number) => void;
  onAddStock: () => void;
  onCalculate: () => void;
  onClear: () => void;
}

const DividendForm = ({
  stocks,
  onInputChange,
  onRemoveStock,
  onAddStock,
  onCalculate,
  onClear
}: DividendFormProps) => (
  <Card className="p-4 md:p-6 shadow-sm bg-white">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg md:text-xl font-semibold text-navy">Dividend Stocks</h2>
      <Button 
        onClick={onClear}
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
                onChange={(e) => onInputChange(index, 'ticker', e.target.value)}
                placeholder="e.g., AAPL"
              />
            </div>
            <div>
              <Label>Number of Shares</Label>
              <Input
                value={stock.shares || ''}
                onChange={(e) => onInputChange(index, 'shares', e.target.value)}
                placeholder="e.g., 100"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Current Price</Label>
              <Input
                value={stock.price || ''}
                onChange={(e) => onInputChange(index, 'price', e.target.value)}
                placeholder="e.g., 150.50"
              />
            </div>
            <div>
              <Label>Annual Dividend/Share</Label>
              <Input
                value={stock.annualDividend || ''}
                onChange={(e) => onInputChange(index, 'annualDividend', e.target.value)}
                placeholder="e.g., 2.08"
              />
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="w-2/3">
              <Label>Payment Frequency</Label>
              <select
                value={stock.frequency}
                onChange={(e) => onInputChange(index, 'frequency', e.target.value)}
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
                onClick={() => onRemoveStock(index)}
                className="text-red-600"
              >
                Remove
              </Button>
            )}
          </div>
        </div>
      ))}
      
      <Button 
        onClick={onAddStock}
        variant="outline"
        className="w-full mt-2"
      >
        Add Stock
      </Button>
      
      <Button 
        onClick={onCalculate}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-6"
      >
        Calculate Dividend Income
      </Button>
    </div>
  </Card>
);

export default DividendForm;
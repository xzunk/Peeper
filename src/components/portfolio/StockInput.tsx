import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, Minus } from 'lucide-react';

interface StockInputProps {
  stock: {
    ticker: string;
    shares: number;
    beta: number;
    allocation: number;
  };
  index: number;
  onInputChange: (index: number, field: string, value: string) => void;
  onSharesAdjustment: (index: number, increment: boolean) => void;
  onRemoveStock: (index: number) => void;
  showRemove: boolean;
}

const StockInput = ({
  stock,
  index,
  onInputChange,
  onSharesAdjustment,
  onRemoveStock,
  showRemove
}: StockInputProps) => {
  return (
    <div className="grid grid-cols-4 gap-4 items-end">
      <div>
        <Label>Stock Ticker</Label>
        <Input
          value={stock.ticker}
          onChange={(e) => onInputChange(index, 'ticker', e.target.value)}
          placeholder="e.g., AAPL"
        />
      </div>
      <div>
        <Label>Shares</Label>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onSharesAdjustment(index, false)}
            className="h-10 w-10"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            value={stock.shares}
            onChange={(e) => onInputChange(index, 'shares', e.target.value)}
            type="number"
            min="0"
            className="text-center"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => onSharesAdjustment(index, true)}
            className="h-10 w-10"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div>
        <Label>Beta</Label>
        <Input
          value={stock.beta}
          onChange={(e) => onInputChange(index, 'beta', e.target.value)}
          placeholder="e.g., 1.2"
          type="number"
          step="0.1"
        />
      </div>
      <div>
        <Label>Allocation</Label>
        <div className="flex gap-2">
          <Input
            value={`${stock.allocation.toFixed(2)}%`}
            readOnly
            className="bg-gray-50"
          />
          {showRemove && (
            <Button
              variant="outline"
              onClick={() => onRemoveStock(index)}
              className="text-red-600"
            >
              X
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockInput;
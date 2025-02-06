import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import AISuggestions from './AISuggestions';

const StockCalculator = () => {
  const [marketPrice, setMarketPrice] = useState("");
  const [peRatio, setPeRatio] = useState("");
  const [pbRatio, setPbRatio] = useState("");
  const [calculatedValues, setCalculatedValues] = useState(null);

  const calculateValues = () => {
    const pe = parseFloat(peRatio);
    const pb = parseFloat(pbRatio);
    const price = parseFloat(marketPrice);

    if (!isNaN(pe) && !isNaN(pb) && !isNaN(price)) {
      setCalculatedValues({
        peRatio: pe,
        pbRatio: pb,
        marketPrice: price,
      });
    }
  };

  return (
    <div className="container mx-auto px-4">
      <Card className="p-4">
        <h2 className="text-xl font-bold mb-4">Stock Valuation Calculator</h2>
        <div className="flex flex-col space-y-4">
          <Input
            type="number"
            placeholder="Market Price"
            value={marketPrice}
            onChange={(e) => setMarketPrice(e.target.value)}
          />
          <Input
            type="number"
            placeholder="PE Ratio"
            value={peRatio}
            onChange={(e) => setPeRatio(e.target.value)}
          />
          <Input
            type="number"
            placeholder="PB Ratio"
            value={pbRatio}
            onChange={(e) => setPbRatio(e.target.value)}
          />
          <Button onClick={calculateValues}>Calculate</Button>
        </div>
      </Card>

      {calculatedValues && (
        <div className="mt-6">
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-2">Calculation Results</h3>
            <p>PE Ratio: {calculatedValues.peRatio}</p>
            <p>PB Ratio: {calculatedValues.pbRatio}</p>
            <p>Market Price: {calculatedValues.marketPrice}</p>
          </Card>
          <AISuggestions 
            peRatio={calculatedValues.peRatio}
            pbRatio={calculatedValues.pbRatio}
            marketPrice={Number(marketPrice)}
          />
        </div>
      )}
    </div>
  );
};

export default StockCalculator;

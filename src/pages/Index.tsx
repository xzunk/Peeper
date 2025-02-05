import StockCalculator from "@/components/StockCalculator";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PieChart, DollarSign } from "lucide-react";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <SEO 
        title="Stock Valuation Calculator - Analyze Stocks & Calculate Profits"
        description="Free stock valuation calculator for analyzing stocks and calculating potential profits. Features PE ratio, PB ratio analysis and profit calculations including brokerage fees."
        keywords="stock valuation, profit calculator, PE ratio, PB ratio, stock analysis, brokerage calculator"
      />
      <StockCalculator />
      
      <div className="container mx-auto mt-8 px-4">
        <h2 className="text-xl font-semibold text-center mb-4 text-navy dark:text-white">Other Tools</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/portfolio">
            <Button 
              variant="outline" 
              className="flex items-center gap-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <PieChart className="w-4 h-4" />
              Portfolio Risk Analyzer
            </Button>
          </Link>
          <Link to="/dividend">
            <Button 
              variant="outline" 
              className="flex items-center gap-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <DollarSign className="w-4 h-4" />
              Dividend Tracker
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
import StockCalculator from "@/components/StockCalculator";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PieChart, DollarSign } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <StockCalculator />
      
      <div className="container mx-auto mt-8 px-4">
        <h2 className="text-xl font-semibold text-center mb-4 text-navy">Other Tools</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/portfolio">
            <Button 
              variant="outline" 
              className="flex items-center gap-2 bg-white hover:bg-gray-50"
            >
              <PieChart className="w-4 h-4" />
              Portfolio Risk Analyzer
            </Button>
          </Link>
          <Link to="/dividend">
            <Button 
              variant="outline" 
              className="flex items-center gap-2 bg-white hover:bg-gray-50"
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
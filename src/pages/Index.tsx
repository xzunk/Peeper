import StockCalculator from "@/components/StockCalculator";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO 
        title="Stock Valuation Calculator - Analyze Stocks & Calculate Profits"
        description="Free stock valuation calculator for analyzing stocks and calculating potential profits. Features PE ratio, PB ratio analysis and profit calculations including brokerage fees."
        keywords="stock valuation, profit calculator, PE ratio, PB ratio, stock analysis, brokerage calculator"
      />
      
      <div className="flex-grow">
        <StockCalculator />
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
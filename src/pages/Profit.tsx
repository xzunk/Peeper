import ProfitCalculator from "@/components/ProfitCalculator";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";

const Profit = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SEO 
        title="Stock Profit Calculator - Calculate Trading Profits with Fees"
        description="Calculate your stock trading profits including brokerage fees. Perfect for day traders and long-term investors to analyze potential returns."
        keywords="profit calculator, stock trading, brokerage fees, trading profits, investment returns"
      />
      <div className="flex-grow">
        <ProfitCalculator />
      </div>
      <Footer />
    </div>
  );
};

export default Profit;
import ProfitCalculator from "@/components/ProfitCalculator";
import SEO from "@/components/SEO";

const Profit = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <SEO 
        title="Stock Profit Calculator - Calculate Trading Profits with Fees"
        description="Calculate your stock trading profits including brokerage fees. Perfect for day traders and long-term investors to analyze potential returns."
        keywords="profit calculator, stock trading, brokerage fees, trading profits, investment returns"
      />
      <ProfitCalculator />
    </div>
  );
};

export default Profit;
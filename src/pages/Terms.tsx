const Terms = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
        <p className="mb-4">By accessing and using this Stock Valuation Calculator, you agree to be bound by these Terms of Service.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Use of the Calculator</h2>
        <p className="mb-4">The calculator is provided for informational purposes only. We do not guarantee the accuracy of calculations or results.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Financial Advice Disclaimer</h2>
        <p className="mb-4">This tool does not provide financial advice. Always consult with qualified financial professionals before making investment decisions.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Data Accuracy</h2>
        <p className="mb-4">Users are responsible for inputting accurate data. The calculator's results depend on the accuracy of input data.</p>
      </div>
    </div>
    {/* Footer Section */}
      <footer className="border-t border-gray-200 pt-8 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-left">
            <h3 className="font-semibold text-navy mb-2">About</h3>
            <p className="text-sm text-gray-600">
             Peeper is A comprehensive stock valuation tool for the Global Stock markets, (Find PBV/NAV/PE) helping investors make informed decisions.
            </p>
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-navy mb-2">Disclaimer</h3>
            <p className="text-sm text-gray-600">
              This calculator provides estimates based on financial data. Always conduct thorough research before making investment decisions.
            </p>
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-navy mb-2">Contact</h3>
            <p className="text-sm text-gray-600">
              For support or inquiries, please visit our contact page or email cs@cosmo.com.lk
            </p>
          </div>
        </div>
        <div className="text-center mt-8 text-sm text-gray-500">
          © {new Date().getFullYear()} Peeper| Backed by CosmoETSP. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Terms;

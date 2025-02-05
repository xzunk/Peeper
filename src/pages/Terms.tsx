import React from 'react';
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 flex flex-col">
      <SEO 
        title="Terms of Service - Stock Calculator Tools"
        description="Terms of service for using our stock calculation tools. Learn about usage terms, disclaimers, and data privacy policies."
        keywords="terms of service, usage terms, stock calculator, legal terms, user agreement"
      />
      <div className="container mx-auto px-4 py-8 max-w-4xl flex-grow">
        <h1 className="text-3xl font-bold mb-6 dark:text-white">Terms of Service</h1>
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="mb-4">By accessing and using this Stock Valuation Calculator, you agree to be bound by these Terms of Service.</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Use of the Calculator</h2>
          <p className="mb-4">The calculator is provided for informational purposes only. We do not guarantee the accuracy of calculations or results.</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Financial Advice Disclaimer</h2>
          <p className="mb-4">This tool does not provide financial advice. Always consult with qualified financial professionals before making investment decisions.</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Data Accuracy</h2>
          <p className="mb-4">Users are responsible for inputting accurate data. The calculator's results depend on the accuracy of input data.</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Data Privacy</h2>
          <p className="mb-4">We do not use any database to save user data, we use local storage as temporary memory.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;

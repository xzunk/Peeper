import React from 'react';
import SEO from "@/components/SEO";

const PortfolioHeader = () => (
  <>
    <SEO 
      title="Portfolio Risk Analyzer - Analyze Investment Risk"
      description="Analyze your investment portfolio risk with our Portfolio Risk Analyzer. Calculate beta values, assess risk levels, and get personalized recommendations."
      keywords="portfolio risk, investment risk, beta calculation, risk analyzer, stock portfolio"
    />
    <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center text-navy">
      Portfolio Risk Analyzer
    </h1>
  </>
);

export default PortfolioHeader;
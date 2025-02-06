import React from 'react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface RiskAnalysisProps {
  portfolioRisk: {
    totalBeta: number;
    riskLevel: string;
  } | null;
}

const RiskAnalysis = ({ portfolioRisk }: RiskAnalysisProps) => {
  if (!portfolioRisk) {
    return (
      <div className="text-center text-gray-500 py-8">
        Enter your portfolio details and calculate to see risk analysis. You Can Find Beta Value From Stock Exchange Website!
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <Alert className={`
        ${portfolioRisk.riskLevel === 'Low' ? 'bg-green-50 border-l-green-500' :
          portfolioRisk.riskLevel === 'High' ? 'bg-red-50 border-l-red-500' :
          'bg-yellow-50 border-l-yellow-500'} 
        border-l-4
      `}>
        <AlertTitle className="text-lg font-semibold">
          Portfolio Risk Level: {portfolioRisk.riskLevel}
        </AlertTitle>
        <AlertDescription>
          Portfolio Beta: {portfolioRisk.totalBeta.toFixed(2)}
        </AlertDescription>
      </Alert>
      
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">Risk Interpretation</h3>
        <p className="text-sm text-gray-600">
          {portfolioRisk.totalBeta < 1
            ? "Your portfolio is less volatile than the market average."
            : portfolioRisk.totalBeta > 1
            ? "Your portfolio is more volatile than the market average."
            : "Your portfolio closely follows market movements."}
        </p>
      </div>
      
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">Risk Management Tips</h3>
        <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
          <li>Consider diversifying across different sectors</li>
          <li>Balance high-beta stocks with low-beta stocks</li>
          <li>Review and rebalance your portfolio regularly</li>
        </ul>
      </div>
    </div>
  );
};

export default RiskAnalysis;
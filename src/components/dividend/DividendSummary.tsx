import React from 'react';
import { Card } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface DividendSummaryProps {
  summary: {
    totalAnnualIncome: number;
    averageYield: number;
    monthlyIncome: number;
  } | null;
}

const DividendSummary = ({ summary }: DividendSummaryProps) => (
  <Card className="p-4 md:p-6 shadow-sm bg-white">
    <h2 className="text-lg md:text-xl font-semibold mb-4 text-navy">Dividend Summary</h2>
    
    {summary ? (
      <div className="space-y-4 animate-fade-in">
        <Alert className="bg-green-50 border-l-4 border-l-green-500">
          <AlertTitle className="text-lg font-semibold">
            Total Annual Dividend Income
          </AlertTitle>
          <AlertDescription className="text-2xl font-mono mt-2">
            {summary.totalAnnualIncome.toFixed(2)}
          </AlertDescription>
        </Alert>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Average Yield</h3>
            <p className="text-2xl font-mono text-green-600">
              {summary.averageYield.toFixed(2)}%
            </p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Monthly Income</h3>
            <p className="text-2xl font-mono text-green-600">
              {summary.monthlyIncome.toFixed(2)}
            </p>
          </div>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Income Breakdown</h3>
          <div className="space-y-2 text-sm">
            <p>Daily: {(summary.totalAnnualIncome / 365).toFixed(2)}</p>
            <p>Weekly: {(summary.totalAnnualIncome / 52).toFixed(2)}</p>
            <p>Monthly: {summary.monthlyIncome.toFixed(2)}</p>
            <p>Quarterly: {(summary.totalAnnualIncome / 4).toFixed(2)}</p>
            <p>Annual: {summary.totalAnnualIncome.toFixed(2)}</p>
          </div>
        </div>
      </div>
    ) : (
      <div className="text-center text-gray-500 py-8">
        Enter your dividend stocks and calculate to see income summary. 
      </div>
    )}
  </Card>
);

export default DividendSummary;
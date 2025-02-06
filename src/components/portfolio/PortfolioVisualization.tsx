import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface PortfolioStock {
  ticker: string;
  shares: number;
  beta: number;
  allocation: number;
}

interface PortfolioVisualizationProps {
  stocks: PortfolioStock[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const PortfolioVisualization = ({ stocks }: PortfolioVisualizationProps) => {
  const chartData = stocks
    .filter(stock => stock.ticker && stock.shares > 0)
    .map(stock => ({
      name: stock.ticker,
      value: stock.allocation,
      beta: stock.beta
    }));

  if (chartData.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Portfolio Allocation</h2>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={({ name, value }) => `${name} (${value.toFixed(1)}%)`}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => `${value.toFixed(2)}%`}
              labelStyle={{ color: 'black' }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PortfolioVisualization;
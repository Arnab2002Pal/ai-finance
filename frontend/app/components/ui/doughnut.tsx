import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { WhereToInvest } from '@/app/interface/userInterface';
import { parsedPercentage } from '@/app/lib/utils';

Chart.register(ArcElement, Tooltip, Legend);

const InvestmentChart = ({ investment }: { investment: WhereToInvest }) => {
  const allocations = [
    investment?.Allocation1,
    investment?.Allocation2,
    investment?.Allocation3,
    investment?.Allocation4,
  ];

  const data = {
    labels: allocations.map((item) => item?.Name),
    datasets: [
      {
        label: "Investment Allocation",
        data: allocations.map((item) => parsedPercentage(item?.PercentageAllocation || "0%")),
        backgroundColor: [
          '#B8860B', // Dark Gold for Precious Metals (Gold)
          '#1E3A8A', // Dark Blue for Equities (Stocks)
          '#228B22', // Dark Green for Bonds
          '#A0522D', // Dark Brown/Orange for Real Estate
        ],
        hoverBackgroundColor: [
          '#DAA520', // Lighter Gold
          '#4682B4', // Lighter Blue
          '#32CD32', // Lighter Green
          '#D2691E', // Lighter Orange/Brown
        ],
        borderWidth: 1,
        hoverBorderWidth: 2,
        borderColor: "black"
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'white', // Make legend text color white
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: { raw: any; label: string, dataIndex: number }) {
            const percentage = tooltipItem.raw;
            const label = tooltipItem.label || '';
            const amount = allocations[tooltipItem.dataIndex]?.Amount || 0;
            return `${label}: ${percentage}% \nAmount: ₹${amount}`;
          },
        },
      },
    },
    layout: {
      
      padding: 30,
    },
  };

  return (
    <div className="relative w-full h-full">
      <Doughnut data={data} options={options as any} />
    </div>
  );
};


export default InvestmentChart;

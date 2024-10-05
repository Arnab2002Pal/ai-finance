import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { WhereToInvest } from '@/app/interface/userInterface';

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
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: { raw: any; label: string, dataIndex: number }) {
            const percentage = tooltipItem.raw; // Get the percentage value
            const label = tooltipItem.label || ''; // Get the investment name
            const amount = allocations[tooltipItem.dataIndex]?.Amount || 0; // Get the corresponding amount
            return `${label}: ${percentage}% \nAmount: ₹${amount}`; // Return the custom tooltip with both percentage and amount
          }
        }
      },
    }
  };

  return (
    <div>
      <Doughnut data={data} options={options} />
    </div>
  );
};

const parsedPercentage = (percentage: string) => {
  const numberValue = parseFloat(percentage.replace('%', ''));
  return numberValue;
};

export default InvestmentChart;

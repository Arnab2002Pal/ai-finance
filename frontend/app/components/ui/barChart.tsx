import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { userFinancialInfoState } from '@/app/store/atoms/financialAtom';
import { useRecoilValue } from 'recoil';
import { parsedPercentage } from '@/app/lib/utils';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const userFinancialInfo = useRecoilValue(userFinancialInfoState);

  const data = {
    labels: ['Growth'],
    datasets: [
      {
        label: 'Current',
        data: [parsedPercentage(userFinancialInfo.growth?.OverallCurrentGrowthPercentage)],
        backgroundColor: '#de1a24',
      },
      {
        label: 'Potential',
        data: [parsedPercentage(userFinancialInfo.growth?.PotentialGrowthPercentage)],
        backgroundColor: '#3f8f29',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white', // Change legend label color to white
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context: any) {
            return `${context.dataset.label}: ${context.raw}%`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'white', // Change X-axis ticks color to white
        },
      },
      y: {
        grid: {
          display: true,
          color: 'rgba(255, 255, 255, 0.1)', // Lighter grid lines
        },
        ticks: {
          color: 'white', // Change Y-axis ticks color to white
        },
      },
    },
    barPercentage: 0.8, // Adjust this value to make bars thinner
    categoryPercentage: 0.4, // Adjust this value to control spacing between bars
  };

  return (
    <div className="w-full h-96 rounded-lg bg-neutral-800 flex justify-center items-center overflow-hidden shadow-lg p-4">
      <Bar data={data} options={options as any} />
    </div>
  );
};

export default BarChart;

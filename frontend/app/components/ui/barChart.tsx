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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const userFinancialInfo = useRecoilValue(userFinancialInfoState);

  let newValue;
  if (
    userFinancialInfo.growthAnalysis.currentGrowthPercentage >
    userFinancialInfo.growthAnalysis.potentialGrowthPercentage
  ) {
    newValue =
      userFinancialInfo.growthAnalysis.potentialGrowthPercentage +
      userFinancialInfo.growthAnalysis.currentGrowthPercentage;
  } else {
    newValue = userFinancialInfo.growthAnalysis.potentialGrowthPercentage;
  }

  const data = {
    labels: ['Growth Analysis'],
    datasets: [
      {
        label: 'Current Growth',
        data: [userFinancialInfo.growthAnalysis.currentGrowthPercentage],
        backgroundColor: 'rgba(63, 143, 41)', // Green
        
      },
      {
        label: 'Potential Growth',
        data: [newValue],
        backgroundColor: 'rgba(255, 215, 0)', // Gold
        
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
          color: '#f5f5f5',
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#333',
        titleColor: '#fff',
        bodyColor: '#ddd',
        callbacks: {
          label: (context: any) => `${context.dataset.label}: ${context.raw}%`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#f5f5f5',
          font: {
            size: 14,
          },
        },
      },
      y: {
        grid: {
          display: true,
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#f5f5f5',
          font: {
            size: 14,
          },
        },
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeOutBounce',
    },
    barPercentage: 0.7,
    categoryPercentage: 0.5,
  };

  return (
    <div className="w-full h-96 rounded-lg bg-neutral-800 flex justify-center items-center overflow-hidden shadow-lg p-4">
      <Bar data={data} options={options as any} />
    </div>
  );
};

export default BarChart;

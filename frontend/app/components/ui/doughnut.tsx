"use client"
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, plugins } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ expense }: any) => {
  const data = {
    labels: ['Expense', 'Earning', 'Debt', "Total Investment", 'Balance'],
    datasets: [
      {
        label: 'Rs',
        data: [expense.MonthlyExpenses, expense.MonthlyEarning, expense.TotalDebt, expense.TotalInvestedAmount, expense.TotalRemainingMoneySaved],
        backgroundColor: [
          'rgb(255,0,0)',
          'rgb(34,139,34)',
          'rgb(192,192,192)',
          'rgb(255,215,0)',
          'rgb(255,255,255)',
        ],
        borderColor: [
          'rgb(0,0,0)',
          'rgb(0,0,0)',
          'rgb(0,0,0)',
          'rgb(0,0,0)',
          'rgb(0,0,0)',
        ],
        borderWidth: 4,
        hoverOffset: 20,
      },
    ],
  };

  const options = {
    animation: {
      animateScale: true,
    },
    plugins: {
      legend: {
        display: false,
      }
    }
  }

  return (
    <div className='w-[30rem] flex flex-col justify-center items-center'>
      <Doughnut data={data} options={options} />
      <div className='mt-4'>
        {data.labels.map((label, index) => (
          <div key={index} className='inline-block mx-2'>
            <span
              style={{
                display: 'inline-block',
                width: '12px',
                height: '12px',
                backgroundColor: data.datasets[0].backgroundColor[index],
                marginRight: '5px',
              }}
            />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoughnutChart;

// style={{ display: 'inline-block', margin: '0 10px' }}
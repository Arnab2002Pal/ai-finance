"use client"
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, plugins } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const data = {
    labels: ['EXPENSE', 'Blue', 'Yellow', 'Green', 'Purple'],
    datasets: [
      {
        label: 'Colors Distribution',
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 206, 86)',
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
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
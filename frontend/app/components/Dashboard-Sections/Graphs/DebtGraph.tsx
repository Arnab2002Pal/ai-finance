import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { DebtManagement } from '@/app/interface/userInterface';

// Registering required components for Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const DebtChart = ({ debt }: { debt: DebtManagement }) => {
    // Data for the bar chart
    const data = {
        labels: ['Debt Payment Comparison'],
        datasets: [
            {
                label: 'Total Existing Debt (₹)',
                data: [debt.totalExistingDebt],
                backgroundColor: '#B71C1C',
                borderColor: '#9B1B1B',
                borderWidth: 1,
            },
            {
                label: 'Recommended Debt Payment (₹)',
                data: [debt.recommendedDebtPayment],
                backgroundColor: '#FFB300',
                borderColor: '#FF8F00',
                borderWidth: 1,
            },
        ],
    };

    // Options to customize the chart
    const options = {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem: any) {
                        return `${tooltipItem.dataset.label}: ₹${tooltipItem.raw}`;
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true, // Ensures the Y-axis starts from 0
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

export default DebtChart;

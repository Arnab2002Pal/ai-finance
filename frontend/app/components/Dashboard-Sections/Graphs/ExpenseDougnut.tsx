import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const ExpenseDoughnut = ({ financialData }: { financialData: any }) => {
    const { monthlyDebtPayments, monthlyExpenses, monthlyNetEarnings } = financialData;

    // Calculate remaining balances
    const remainingAfterExpenses = monthlyNetEarnings - monthlyExpenses;
    const remainingAfterDebt = remainingAfterExpenses - monthlyDebtPayments;

    // Allocations for Doughnut chart
    const allocations = [
        { Name: 'Monthly Earnings', Amount: monthlyNetEarnings },
        { Name: 'Expenses', Amount: monthlyExpenses },
        { Name: 'Debt Payments', Amount: monthlyDebtPayments },
        { Name: 'Remaining Balance', Amount: remainingAfterDebt },
    ];

    // Doughnut chart data
    const totalAmount = allocations.reduce((sum, item) => sum + item.Amount, 0);

    const data = {
        labels: allocations.map((item) => item.Name),
        datasets: [
            {
                label: 'Financial Breakdown',
                data: allocations.map((item) => item.Amount),
                backgroundColor: ['#FFD700', '#8B8000', '#B87333', '#4B0082'],
                hoverBackgroundColor: ['#FFDF00', '#A68B00', '#D2691E', '#5A1E96'],
                borderWidth: 1,
                hoverBorderWidth: 2,
                borderColor: 'black',
                hoverSize: 'large',
            },
        ],
    };

    // Chart options with percentage in tooltip
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#FFFFFF',
                    font: {
                        size: 14,
                        weight: 'bold',
                    },
                },
            },
            tooltip: {
                backgroundColor: '#333333',
                titleFont: {
                    size: 16,
                    weight: 'bold',
                },
                bodyFont: {
                    size: 14,
                },
                callbacks: {
                    label: function (tooltipItem: { raw: any; label: string; dataIndex: number }) {
                        const amount = tooltipItem.raw;
                        const label = tooltipItem.label || '';
                        const percentage = ((amount / totalAmount) * 100).toFixed(2); // Calculate percentage
                        return `${label}: ₹${amount} (${percentage}%)`;
                    },
                },
            },
        },
        layout: {
            padding: 20,
        },
    };

    return (
        <div className="relative bg-neutral-800 rounded-xl w-full h-[300px] md:h-[400px]">
            <Doughnut data={data} options={options as any} />
        </div>
    );
};

export default ExpenseDoughnut;

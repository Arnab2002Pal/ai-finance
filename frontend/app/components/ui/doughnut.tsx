"use client";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  plugins,
} from "chart.js";
import { ExpenseAnalysis } from "@/interface/userInterface";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ expense }: { expense: ExpenseAnalysis }) => {
  console.log(expense);

  const data = {
    labels: ["Expense", "Earning", "Total Investment", "Balance"],
    datasets: [
      {
        label: "Rs",
        data: [
          expense.MonthlyExpenses,
          expense.MonthlyEarning,
          expense.TotalInvestedAmount,
          expense.TotalRemainingMoneySaved,
        ],
        backgroundColor: [
          "rgb(255,0,0)",
          "rgb(34,139,34)",
          "rgb(255,215,0)",
          "rgb(255,255,255)",
        ],
        borderColor: [
          "rgb(38 38 38)",
          "rgb(38 38 38)",
          "rgb(38 38 38)",
          "rgb(38 38 38)",
        ],
        borderWidth: 5,
        hoverOffset: 5,
        borderRadius: 10,
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
      },
    },
  };

  return (
    <div className="w-[20rem] flex flex-col justify-center items-center">
      <Doughnut data={data} options={options} />
      <div className="mt-4">
        {data.labels.map((label, index) => (
          <div key={index} className="inline-block mx-2">
            <span
              style={{
                display: "inline-block",
                width: "16px",
                height: "16px",
                backgroundColor: data.datasets[0].backgroundColor[index],
                marginRight: "5px",
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

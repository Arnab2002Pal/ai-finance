import React from 'react'
import type { ExpenseAnalysis } from '@/app/interface/userInterface';

const Expense = ({ expense }: { expense: ExpenseAnalysis }) => {
    return (
        <div className="md:p-6 bg-none md:bg-neutral-900 text-white rounded-xl shadow-lg animate-fadeIn transition-all duration-500 ease-in-out">
            <div className="w-full flex flex-col items-start md:flex-row md:justify-between ">
                <h2 className="text-gold text-2xl md:text-3xl font-bold mb-4 md:mb-6">💰 Expense Analysis</h2>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-start w-full gap-6">
                {/* Left Card */}
                <div className="p-3 md:p-6 w-full bg-neutral-900 md:bg-neutral-800 cursor-default rounded-xl transform transition-transform hover:shadow-[inset_-12px_-8px_40px_#454545] animate-slideIn delay-200">
                    <h3 className="text-xl font-semibold mb-4">💰 Expense Summary</h3>
                    <div className="space-y-2 text-gray-300">
                        <p>
                            <strong className="text-white">Monthly Earning:</strong> ₹{expense.monthlyNetEarnings || 0}
                        </p>
                        <p>
                            <strong className="text-white">Total Savings:</strong> ₹{expense.totalCurrentSavings || 0}
                        </p>
                        <p>
                            <strong className="text-white">Monthly Expense:</strong> ₹{expense.monthlyExpenses || 0}
                        </p>
                        {expense.monthlyDebtPayments !== 0 && (
                            <p>
                                <strong className="text-white">Monthly Debt Payments:</strong> ₹{expense.monthlyDebtPayments}
                            </p>
                        )}

                        <p>
                            <strong className="text-white">Total Monthly Savings:</strong> ₹{expense.totalMonthlySavings || 0}
                        </p>
                    </div>
                </div>
                {/* Right Content */}
                <div className="p-3 md:p-6 w-full bg-neutral-900 md:bg-neutral-800 cursor-default rounded-xl transform transition-transform hover:shadow-[inset_-12px_-8px_40px_#454545] animate-slideIn delay-200">
                    <p>
                        <strong className="text-base">Advice: </strong>{expense.advice}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Expense

import React from 'react'
import type { SavingPlan } from '@/app/interface/userInterface'

const SavingPlan = ({ savings, structurePlan }: { 
    savings: SavingPlan,
    structurePlan: string[]
}) => {
    return (
        <div className="md:p-6 bg-none md:bg-neutral-900 text-white rounded-xl shadow-lg animate-fadeIn transition-all duration-500 ease-in-out">
            {/* Header */}
            <div className="w-full flex flex-col items-start md:flex-row md:justify-between mb-6">
                <h2 className="text-gold text-2xl md:text-3xl font-bold">💸 Saving Plan</h2>
            </div>

            {/* Content */}
            <div className="flex flex-col md:flex-row justify-between items-start w-full gap-6">
                {/* Left Card - Savings Summary */}
                <div className="flex-1 p-4 md:p-6 bg-neutral-900 md:bg-neutral-800 rounded-xl cursor-default max-h-[472px] overflow-auto scrollbar-hide transform transition-transform hover:shadow-[inset_-12px_-8px_40px_#454545] animate-fadeIn delay-200">
                    <h3 className="text-xl font-semibold mb-4">💰 Savings Summary</h3>
                    <div className="space-y-3 text-gray-300 ">
                        <p>
                            <strong className="text-white">Monthly Savings:</strong> ₹{savings?.totalMonthlySavings || 0}
                        </p>
                        <p>
                            <strong className="text-white">Total Savings:</strong> ₹{savings?.annualSavings || 0}
                        </p>
                        <p>
                            <strong className="text-white">Percentage Saved:</strong> {savings?.percentageOfSalarySaved || 0}%
                        </p>
                        <p>
                            <strong className="text-white">Advice:</strong> {savings?.advice || "No advice available."}
                        </p>
                    </div>
                </div>

                {/* Right Card - Structured Plan */}
                <div className="flex-1 p-4 md:p-6 bg-neutral-900 md:bg-neutral-800 rounded-xl cursor-default max-h-[272px] overflow-y-auto scrollbar-hide transform transition-transform hover:shadow-[inset_-12px_-8px_40px_#454545] animate-fadeIn delay-200 ">
                    <h3 className="text-xl font-semibold mb-4">📋 Structured Plan</h3>
                    {structurePlan?.length ? (
                        structurePlan.map((value, key) => (
                            <div key={key} className="mb-2 text-gray-300">
                                <p>🔹 {value}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400">No structured plan available.</p>
                    )}

                </div>
            </div>
        </div>
    )
}

export default SavingPlan

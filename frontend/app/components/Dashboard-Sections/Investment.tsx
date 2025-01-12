import React from 'react'
import type { InvestmentAdvice } from '@/app/interface/userInterface'

const Investment = ({ investment }: { investment: InvestmentAdvice }) => {
    return (
        <>
            <div className="md:p-6  bg-none md:bg-neutral-900 text-white rounded-xl shadow-lg">
                <div className="w-full flex flex-col items-center md:flex-row md:justify-between mb-4">
                    <h2 className="text-gold text-2xl md:text-3xl font-bold">📈 Investment Advice</h2>
                    <h2 className="text-silver text-base md:text-xl font-medium ">
                        Risk Tolerance: {investment.riskTolerance}
                    </h2>
                </div>

                <div className="flex flex-col gap-6 md:flex-row md:justify-center md:items-start w-full">
                    {/* Card */}
                    <div className="p-2 md:p-6 w-full bg-neutral-800 rounded-xl transform transition-transform hover:shadow-[inset_-12px_-8px_40px_#454545] animate-slideIn delay-200">
                        <h3 className="text-xl text-center md:text-left font-semibold mb-4">💰 Investment Allocation</h3>

                        <div className="space-y-4 mx-6 text-gray-300 cursor-default animate-fadeIn transition-all duration-500 ease-in-out">
                            {investment.investments.map((asset, key) => (
                                <div
                                    key={key}
                                    className="p-4  bg-neutral-700 rounded-lg shadow-inner flex flex-col sm:flex-row justify-between items-start sm:items-center hover:scale-x-105 transition-transform duration-300 ease-in-out"
                                >
                                    {/* Left Section */}
                                    <div className="flex flex-col mb-2 sm:mb-0">
                                        <p className="text-white font-medium">Investment: <span className="text-gold">{asset.investmentName}</span></p>
                                        <p>Class: <span className="text-gray-400">{asset.assetClass}</span></p>
                                    </div>

                                    {/* Right Section */}
                                    <div className="flex flex-col justify-center items-start sm:text-right">
                                        <p>Allocation: <span className="text-green-400">₹{asset.amountAllocated}</span></p>
                                        <p>Percentage: <span className="text-blue-400">{asset.percentageAllocation}%</span></p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Investment

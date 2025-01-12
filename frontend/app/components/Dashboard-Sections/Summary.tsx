import React, { useState } from 'react';
import type { Summary as SummaryType } from '@/app/interface/userInterface';
import BarChart from '../ui/barChart';

const Summary = ({ summary }: { summary: SummaryType }) => {
    const [showFullStatus, setShowFullStatus] = useState(false);
    const [showFullOutcome, setShowFullOutcome] = useState(false);

    return (
        <>
            <div className="p-6 bg-neutral-900 text-white rounded-xl shadow-lg transition-all duration-300 ease-in-out">
                {/* Header Section */}
                <div className="w-full flex flex-col md:flex-row justify-between items-center">
                    <h2 className="text-gold text-3xl font-bold mb-6">✨ Overview</h2>
                    <p className="text-silver text-center md:text-left md:text-xl font-medium mb-6">
                        Re-Evaluate: {summary.reEvaluationTimeframe} Months
                    </p>
                </div>

                {/* Content Section */}
                <div className="flex flex-col md:flex-row justify-center items-start w-full gap-6">
                    {/* Current Status Card */}
                    <div
                        onClick={() => setShowFullStatus(!showFullStatus)}
                        className={`p-6 w-full md:w-1/2 bg-neutral-800 rounded-xl transform transition-transform hover:shadow-[inset_-12px_-8px_40px_#454545] ${showFullStatus ? 'max-h-full' : 'max-h-[280px] md:max-h-none'
                            } overflow-hidden transition-all duration-300 ease-in-out`}
                    >
                        <h3 className="text-md md:text-xl font-semibold mb-2">📋 Current Status</h3>
                        <p className={`text-gray-300 text-sm md:text-base ${!showFullStatus ? 'line-clamp-3' : ''}`}>
                            {summary.currentSituation}
                        </p>
                        <button
                            onClick={() => setShowFullStatus(!showFullStatus)}
                            className="text-gold mt-2 text-sm underline"
                        >
                            {showFullStatus ? 'Show Less' : 'Read More'}
                        </button>
                    </div>

                    {/* Expected Outcome Card */}
                    <div
                        onClick={() => setShowFullOutcome(!showFullOutcome)}
                        className={`p-6 w-full md:w-1/2 bg-neutral-800 rounded-xl transform transition-transform hover:shadow-[inset_-12px_-8px_40px_#454545] ${showFullOutcome ? 'max-h-full' : 'max-h-[280px] md:max-h-none'
                            } overflow-hidden transition-all duration-300 ease-in-out`}
                    >
                        <h3 className="text-md md:text-xl font-semibold mb-2">🎯 Expected Outcome</h3>
                        <p className={`text-gray-300 text-sm md:text-base ${!showFullOutcome ? 'line-clamp-3' : ''}`}>
                            {summary.expectedOutcomes}
                        </p>
                        <button
                            onClick={() => setShowFullOutcome(!showFullOutcome)}
                            className="text-gold mt-2 text-sm underline"
                        >
                            {showFullOutcome ? 'Show Less' : 'Read More'}
                        </button>
                    </div>
                </div>
            </div>
            {/* Placeholder for Charts
            <div className="mt-6 bg-neutral-700 p-6 rounded-lg shadow-md">
                <h2 className="text-yellow-400 text-xl font-bold mb-2">📊 Growth Chart Placeholder</h2>
                <div className="mt-12 w-full flex justify-around items-center">
                    <div className="w-[450px]">
                        <BarChart />
                    </div>
                    <div className="w-[450px]">
                        <BarChart />
                    </div>
                </div>
            </div> */}
        </>
    );
};

export default Summary;

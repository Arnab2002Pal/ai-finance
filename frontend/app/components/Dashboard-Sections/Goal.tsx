import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { GoalRoadmap, Summary } from '@/app/interface/userInterface';

const Goal = ({ goal, nextStep }: { goal: GoalRoadmap; nextStep: Summary }) => {
    const [showFullShortTermPlan, setShowFullShortTermPlan] = useState(false);
    const [showFullLongTermPlan, setShowFullLongTermPlan] = useState(false);
    const [showFullNextSteps, setShowFullNextSteps] = useState(false);
    const [showFullKeyRecommendation, setShowFullKeyRecommendation] = useState(false);

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    const toggleExpand = (setState: React.Dispatch<React.SetStateAction<boolean>>, state: boolean) => {
        setState(!state);
    };

    return (
        <div className="p-6 bg-neutral-900 text-white rounded-xl shadow-lg animate-fadeIn transition-all duration-500 ease-in-out">
            {/* Header */}
            <div className="w-full flex flex-col md:flex-row justify-between items-center mb-6">
                <h2 className="text-gold text-3xl font-bold mb-4">🚀 Goal Roadmap</h2>
            </div>

            {/* Cards Container */}
            <div className="flex flex-col md:flex-row justify-between items-start w-full gap-6">
                {/* Short Term Goal Card */}
                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    onClick={() => toggleExpand(setShowFullShortTermPlan, showFullShortTermPlan)}
                    className={`p-6 w-full md:w-1/2 cursor-pointer bg-neutral-800 rounded-xl shadow-md transform transition-transform hover:shadow-[inset_-12px_-8px_40px_#454545] overflow-hidden ease-in-out ${showFullShortTermPlan ? 'max-h-full' : 'max-h-[280px]'
                        }`}
                >
                    <h3 className="text-xl font-semibold text-yellow-400 mb-4">📅 Short Term Goal</h3>
                    <p
                        className={`text-gray-300 text-sm md:text-base transition-all duration-300 ${!showFullShortTermPlan ? 'line-clamp-3' : ''
                            }`}
                    >
                        {goal?.shortTermGoals || 'No short-term goals available.'}
                    </p>
                    <button
                        onClick={(e) => e.stopPropagation()}
                        className="text-gold mt-4 text-sm underline"
                    >
                        {showFullShortTermPlan ? 'Show Less' : 'Read More'}
                    </button>
                </motion.div>

                {/* Long Term Goal Card */}
                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    onClick={() => toggleExpand(setShowFullLongTermPlan, showFullLongTermPlan)}
                    className={`p-6 w-full md:w-1/2 cursor-pointer bg-neutral-800 rounded-xl overflow-hidden shadow-md transform transition-transform hover:shadow-[inset_-12px_-8px_40px_#454545] duration-300 ease-in-out  ${showFullLongTermPlan ? 'max-h-full' : 'max-h-[280px]'
                        }`}
                >
                    <h3 className="text-xl font-semibold text-yellow-400 mb-4">📈 Long Term Goal</h3>
                    <p
                        className={`text-gray-300 text-sm md:text-base transition-all duration-300 ${!showFullLongTermPlan ? 'line-clamp-3' : ''
                            }`}
                    >
                        {goal?.longTermGoals || 'No long-term goals available.'}
                    </p>
                    <button
                        onClick={(e) => e.stopPropagation()}
                        className="text-gold mt-4 text-sm underline"
                    >
                        {showFullLongTermPlan ? 'Show Less' : 'Read More'}
                    </button>
                </motion.div>
            </div>

            {/* Next Steps & Key Recommendation Cards */}
            <div className="flex flex-col md:flex-row justify-between items-start w-full gap-6 mt-6">
                {/* Next Step Card */}
                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    onClick={() => toggleExpand(setShowFullNextSteps, showFullNextSteps)}
                    className={`p-6 w-full md:w-1/2 cursor-pointer bg-neutral-800 rounded-xl overflow-hidden shadow-md transform transition-transform hover:shadow-[inset_-12px_-8px_40px_#454545] duration-300 ease-in-out ${showFullNextSteps ? 'max-h-full' : 'max-h-[280px]'
                        }`}
                >
                    <h3 className="text-xl font-semibold text-yellow-400 mb-4">📝 Next Steps to Follow</h3>
                    <p
                        className={`text-gray-300 text-sm md:text-base transition-all duration-300 ${!showFullNextSteps ? 'line-clamp-3' : ''
                            }`}
                    >
                        {nextStep?.nextSteps || 'No steps available to follow.'}
                    </p>
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            setShowFullNextSteps(!showFullNextSteps)
                        }}
                        className="text-gold mt-4 text-sm underline"
                    >
                        {showFullNextSteps ? 'Show Less' : 'Read More'}
                    </button>
                </motion.div>

                {/* Key Recommendation Card */}
                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    onClick={() => toggleExpand(setShowFullKeyRecommendation, showFullKeyRecommendation)}
                    className={`p-6 w-full md:w-1/2 cursor-pointer bg-neutral-800 rounded-xl overflow-hidden shadow-md transform transition-transform hover:shadow-[inset_-12px_-8px_40px_#454545] duration-300 ease-in-out ${showFullKeyRecommendation ? 'max-h-full' : 'max-h-[280px]'
                        }`}
                >
                    <h3 className="text-xl font-semibold text-yellow-400 mb-4">🔑 Key Recommendation</h3>
                    <p
                        className={`text-gray-300 text-sm md:text-base transition-all duration-300 ${!showFullKeyRecommendation ? 'line-clamp-3' : ''
                            }`}
                    >
                        {nextStep?.keyRecommendations || 'No recommendation available.'}
                    </p>
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            setShowFullKeyRecommendation(!showFullKeyRecommendation);
                        }}
                        className="text-gold mt-4 text-sm underline"
                    >
                        {showFullKeyRecommendation ? 'Show Less' : 'Read More'}
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default Goal;

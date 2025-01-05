"use client"
import React, { useEffect, useState } from 'react'
import Loading from '../Loader';
// import Location from '@/app/(pages)/form/location/page';
import AccountInfo from '@/app/(pages)/form/account/page';
import TermsAndCondition from '@/app/(pages)/form/termAndCondition/page';
import { checkFinancialReport, generateFinancialAdvice } from '@/app/api/utility/api';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { FormData, LocationInfo, RiskTolerance, UserAccountInfo } from '@/app/interface/userInterface';
import  Income  from './Income';
import Location from './Location';
import { AnimatePresence, motion } from "motion/react"
import { Expense } from './Expense';
import { Debt } from './Debt';
import { Saving } from './Saving';
import { Priority } from './Priority';
import Risk_Tolerance from './Risk_Tolerance';
import Goals from './Goals';
import Terms_Condition from './Terms_Condition';


const MultiStepForm = ({ email, message, status }: { email: string, message: string, status: string }) => {
    // State to track the current step
    const [currentStep, setCurrentStep] = useState(1);

    const [formData, setFormData] = useState<FormData>({
        email: email,
        locationInfo: {
            location: "",
        },
        accountInfo: {
            age: 0,
            occupation: "",
            monthly_income: 0,
            monthly_expense: 0,
            monthly_debt: 0,
            total_remaining_debt: 0,
            risk_tolerance: RiskTolerance.default,
            goal_priorities: "",
            current_amount_savings: "",
            short_term: "",
            long_term: "",           
        },
        termsAndCondition: {
            acceptTerms: false
        }
    });

    console.log(formData.accountInfo.age);
    

    // Steps array with components
    const steps = [
        { key: 1, value: "Choose Your Location", component: <Location setFormData={setFormData} /> },
        { key: 2, value: "Personal Details", component: <Income setFormData={setFormData} /> },
        { key: 3, value: "Expenses Details", component: <Expense /> },
        { key: 4, value: "Debt Overview", component: <Debt /> },
        { key: 5, value: "Savings Plan", component: <Saving /> },
        { key: 6, value: "Set Priorities", component: <Priority /> },
        { key: 7, value: "Assess Risk Tolerance", component: <Risk_Tolerance /> },
        { key: 8, value: "Define your Goals", component: <Goals /> },
        { key: 9, value: "Terms And Condition", component: <Terms_Condition /> }
    ];

    // Handler to go to the next step
    const handleNext = () => {
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        }
    };

    // Handler to go to the previous step
    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col lg:flex-row w-screen h-screen bg-gradient-to-r from-[#000000] via-[#835f0c] to-[#f8d948] "
        >
            {/* Stepper (Visible on larger screens) */}
            <div className="hidden lg:flex w-2/3 flex-col justify-center items-center px-20">
                <AnimatePresence mode="wait">
                    {steps
                        .filter((step) => step.key === currentStep) // Only show the current step
                        .map((step) => (
                            <motion.div
                                key={step.key}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="p-4 mb-2 text-white flex justify-center items-center w-full h-40 "
                            >
                                <div className="w-1/3 h-full flex justify-center items-center">
                                    <span className="rounded-full bg-black border-white border-2 h-20 w-20 flex justify-center items-center text-4xl text-white shadow-xl cursor-default font-bold">
                                        {step.key}
                                    </span>
                                </div>
                                <div className="w-2/3 h-full flex justify-start items-center text-3xl font-bold">
                                    {step.value}
                                </div>
                            </motion.div>
                        ))}
                </AnimatePresence>
            </div>

            {/* Content */}
            <div className="w-full h-screen lg:w-2/3 flex flex-col lg:flex-col items-center lg:justify-center lg:items-start ">

                {/* Heading (Visible on mobile) */}
                <div className="lg:hidden flex flex-row justify-center items-center text-white text-2xl h-24 gap-4 font-bold text-center p-4 w-full ">
                    <div className='bg-gradient-to-r from-green-500 to-green-700 h-10 md:h-12 w-12 flex justify-center items-center rounded-full'>{currentStep}{" "}</div>
                    <div>{steps.find((step) => step.key === currentStep)?.value}</div>
                </div>

                <div className="text-white h-2/3 flex flex-col justify-evenly items-start w-5/6">
                    <div className='w-10/12 flex flex-col'>
                        <h1 className='text-2xl lg:text-4xl font-bold'>Complete Your Profile</h1>
                        <span className="pt-2 hidden sm:inline ">
                            Just a few quick steps, and you&apos;re all set. Let&apos;s make this process quick and simple!
                        </span>
                        <span className="pt-2 sm:hidden">
                            Just a few steps to get started!
                        </span>

                    </div>
                    <div className='w-full h-60 flex my-10 items-center'>
                        <AnimatePresence mode="wait">
                            {steps.find((step) => step.key === currentStep)?.component}
                        </AnimatePresence>
                    </div>
                </div>
                <div className=' w-5/6'>


                    {
                        currentStep === steps.length ? (
                            <div className=" relative group/btn flex items-center justify-center mt-10 text-sm w-32 lg:text-md lg:w-60 text-black rounded-md h-10 font-medium shadow-input bg-zinc-900 shadow-[0px_0px_1px_1px_var(--neutral-800)] lg:mt-28 lg:space-x-2 lg:px-4">
                                <button
                                    // onClick={handleSubmit}
                                    className="btn w-full h-full px-4 py-2 text-white rounded disabled:opacity-50 flex items-center justify-center"
                                >
                                    Submit
                                </button>
                                <BottomGradient />
                            </div>
                        ) : (
                            <div className='w-full flex flex-row justify-between items-center mt-10 lg:mt-0'>
                                <div className=" relative group/btn flex items-center justify-center text-sm lg:text-md w-32 lg:w-52 text-black rounded-md h-10 font-medium shadow-input bg-zinc-900 shadow-[0px_0px_1px_1px_var(--neutral-800)] lg:mt-28 lg:space-x-2 lg:px-4">
                                    <button
                                        onClick={handlePrevious}
                                        disabled={currentStep === 1}
                                        className="btn w-full h-full px-4 py-2 text-white rounded disabled:opacity-50 flex items-center justify-center"
                                    >
                                        Previous
                                    </button>
                                    {
                                            currentStep === 1 ? "" : <BottomGradient />
                                    }
                                </div>
                                    <div className=" relative group/btn flex items-center justify-center text-sm w-32 lg:text-md lg:w-52 text-black rounded-md h-10 font-medium shadow-input bg-zinc-900 shadow-[0px_0px_1px_1px_var(--neutral-800)] lg:mt-28 lg:space-x-2 lg:px-4">
                                    <button
                                        onClick={handleNext}
                                        disabled={currentStep === steps.length}
                                        className="btn w-full h-full px-4 py-2 text-white rounded disabled:opacity-50 flex items-center justify-center"
                                    >
                                        Next
                                    </button>
                                    <BottomGradient />
                                </div>
                            </div>
                        )
                    }

                </div >

            </div >
        </motion.div >
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-[3px] w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

export default MultiStepForm;

"use client"
import React, { useEffect, useState } from 'react'

import { AILoading, Loading } from '../Loader';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import { FormData, LocationInfo, RiskTolerance } from '@/app/interface/userInterface';
import { AnimatePresence, motion } from "motion/react"
import Income from '../../(pages)/form/user-form/Components/Income';
import Location from '../../(pages)/form/user-form/Components/Location';
import Expense from '../../(pages)/form/user-form/Components/Expense';
import Debt from '../../(pages)/form/user-form/Components/Debt';
import Saving from '../../(pages)/form/user-form/Components/Saving';
import Priority from '../../(pages)/form/user-form/Components/Priority';
import Risk_Tolerance from '../../(pages)/form/user-form/Components/Risk_Tolerance';
import Goals from '../../(pages)/form/user-form/Components/Goals';
import Terms_Condition from '../../(pages)/form/user-form/Components/Terms_Condition';
import { priorities as priority_list } from "@/app/utils/lists";
import { checkFinancialReport, generateFinancialAdvice } from '@/app/api/utility/api';
import "react-toastify/dist/ReactToastify.css";
import "../../(pages)/form/user-form/Components/component.css"

const MultiStepForm = ({ email, message, status }: { email: string, message: string, status: string }) => {
    const router = useRouter()

    // State to track the current step
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [locationInfo, setLocationInfo] = useState<LocationInfo>({
        country: "",
    })
    const [income, setIncome] = useState<{
        age: number,
        occupation: string,
        monthly_income: number
    }>({
        age: 0,
        occupation: "",
        monthly_income: 0,
    })
    const [expense, setExpense] = useState<number>()
    const [debt, setDebt] = useState<{
        monthly_debt: number,
        total_remaining_debt: number
    }>({
        monthly_debt: 0,
        total_remaining_debt: 0
    })
    const [saving, setSaving] = useState<string>("")
    const [priorities, setPriorities] = useState<string>("")
    const [prioritiesState, setPrioritiesState] = useState<Record<string, { level: string; description: string }>>({
        first: { level: "", description: "" },
        second: { level: "", description: "" },
        third: { level: "", description: "" },
    });
    const [isDefaultPriority, setIsDefaultPriority] = useState<boolean>(false)
    const [riskTolerance, setRiskTolerance] = useState<string>("")
    const [updatedRisk, setUpdatedRisk] = useState<string>("");
    const [goal, setGoal] = useState<{
        short_term: string,
        long_term: string,
    }>({
        short_term: "",
        long_term: "",
    })
    const [termsCondition, setTermsCondition] = useState<boolean>(false)


    useEffect(() => {
        const authenticateUser = async () => {

            if (status === "unauthenticated") {
                router.push("/signin");
                return;
            }

            if (status === "authenticated" && email) {

                try {
                    const result = await checkFinancialReport(`/user/checkFinancialReport/${email}`);

                    if (result.status === 200) {
                        // User has a financial report, so will be denied access to form.
                        if (!result.first_time) {
                            router.push("/home?message=Access Denied");
                        } else {
                            setLoading(false);
                        }
                    } else if (result.status === 404 && result.errorType === "USER_NOT_EXIST") {
                        //  User doesn't exist
                        toast.warn("User does not exist.", {
                            autoClose: 3000
                        });

                        await signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/signup` });
                    } else if (result.status === 404 && result.errorType === "FINANCIAL_RESULT_NOT_FOUND") {
                        //  Financial report doesn't exist
                        setLoading(false);
                    } else {
                        // Handle other unexpected cases
                        console.error("Unexpected error:", result);
                        setLoading(false);
                    }
                } catch (error) {
                    console.error("Error checking report:", error);
                    setLoading(false);
                }

            }
        };

        authenticateUser();
    }, [status, email, router]);

    useEffect(() => {
        if (message.length > 0) {
            toast.warn(message, { autoClose: 3000 })
        }
    }, [message])

    const handle_location = (data: string) => {
        setLocationInfo({
            ...locationInfo,
            country: data
        });
    }

    const handle_account = (type: string, key: string, value: string | number | undefined) => {
        if (type === "number") {
            setIncome((prevIncome) => ({
                ...prevIncome,
                [key]: value,
            }));
        } else if (type === "text") {
            setIncome((prevIncome) => ({
                ...prevIncome,
                [key]: value,
            }));
        }
    }

    const handle_expense = (data: number) => {
        setExpense(data)
    }

    const handle_debt = (key: string, value: number) => {
        setDebt((prevDebt) => ({
            ...prevDebt,
            [key]: value,
        }));
    }

    const handle_saving = (data: string) => {
        setSaving(data)
    }

    const handlePriorityCheckStatus = (checked: boolean) => {
        setIsDefaultPriority(checked)
    }

    const handle_priority = (prioritiesState: Record<string, { level: string; description: string }>) => {
        // Handlers for text fields
        setPrioritiesState(prioritiesState);
        const unchecked_output = `${prioritiesState.first.level} priority for ${prioritiesState.first.description}, ${prioritiesState.second.level} priority for ${prioritiesState.second.description}, ${prioritiesState.third.level} priority for ${prioritiesState.third.description}`
        const checked_output = `Not Sure`

        const output = isDefaultPriority === true ? checked_output : unchecked_output
        setPriorities(output)
    }

    const handle_risk = (value: string) => {
        const risk = value.split(':')[0];
        setRiskTolerance(value);
        setUpdatedRisk(risk)
    }

    const handle_goals = (goalType: string, value: string) => {
        setGoal(prev => ({
            ...prev,
            [goalType]: value
        }))
    }

    const handleTermsCondition = (checked: boolean) => {
        setTermsCondition(checked)
    }

    const handleSubmit = async () => {
        if (!termsCondition) {
            toast.error("Accept with our terms and condition", {
                autoClose: 3000,
                position: 'top-center',
            })
            return;
        }
        // Prepare form data
        const formData = {
            email: email,
            locationInfo: {
                country: locationInfo.country,
            },
            accountInfo: {
                age: income.age,
                occupation: income.occupation,
                monthly_income: income.monthly_income,
                monthly_expense: expense ?? 0,
                monthly_debt: debt.monthly_debt,
                total_remaining_debt: debt.total_remaining_debt,
                risk_tolerance: updatedRisk as RiskTolerance,
                goal_priorities: priorities,
                current_amount_savings: saving,
                short_term: goal.short_term,
                long_term: goal.long_term,
            },
            termsAndCondition: {
                acceptTerms: termsCondition,
            },
        };

        setLoading(true);
        try {
            const response = await generateFinancialAdvice('finance/generateAdvice', formData)

            if (response.status === 201) {
                router.push('/home')
            } else if (response.status === 404) {
                toast.error(response.message, {
                    autoClose: 3000,
                    position: 'top-center',
                })
                router.push('/signup')
                return;
            } else if (response.status === 500) {
                toast.error(response.message, {
                    autoClose: 3000,
                    position: 'top-center',
                })
                return;
            }
        } catch (error) {
            console.log("[ERROR] During api Call:", error);
        } finally {
            setLoading(false);
        }
    }

    // Steps array with components
    const steps = [
        { key: 1, value: "Choose Your Location", component: <Location formData={locationInfo.country} handleFormData={handle_location} /> },
        { key: 2, value: "Personal Details", component: <Income formData={income} handleFormData={handle_account} /> },
        { key: 3, value: "Expenses Details", component: <Expense formData={expense} handleFormData={handle_expense} /> },
        { key: 4, value: "Debt Overview", component: <Debt formData={debt} handleFormData={handle_debt} /> },
        { key: 5, value: "Savings Plan", component: <Saving formData={saving} handleFormData={handle_saving} /> },
        { key: 6, value: "Set Priorities", component: <Priority formData={prioritiesState} checked={isDefaultPriority} handleFormData={handle_priority} handleCheckStatus={handlePriorityCheckStatus} /> },
        { key: 7, value: "Assess Risk Tolerance", component: <Risk_Tolerance formData={riskTolerance} handleFormData={handle_risk} /> },
        { key: 8, value: "Define your Goals", component: <Goals formData={goal} handleFormData={handle_goals} /> },
        { key: 9, value: "Terms And Condition", component: <Terms_Condition status={termsCondition} handleFormData={handleTermsCondition} /> }
    ];

    // Handler to go to the next step
    const handleNext = () => {
        switch (currentStep) {
            case 1:
                if (!locationInfo.country.trim()) {
                    toast.error("Please Choose Location", {
                        autoClose: 2000
                    })
                    return;
                }
                break;
            case 2:
                if (!income.age || !income.monthly_income || !income.occupation.trim()) {
                    toast.error("Incomplete Profile", {
                        autoClose: 2000
                    })
                    return;
                }
                break;
            case 3:
                if (!expense) {
                    toast.error("Incomplete Profile", {
                        autoClose: 2000
                    })
                    return;
                }
                break;
            case 4:
                if ((debt.monthly_debt && !debt.total_remaining_debt) || (!debt.monthly_debt && debt.total_remaining_debt)) {
                    toast.error("Incomplete Profile", {
                        autoClose: 2000
                    })
                    return;
                }
                break;
            case 5:
                if (!saving.trim()) {
                    toast.error("Incomplete Profile", {
                        autoClose: 2000
                    })
                    return;
                }
                break;
            case 6:
                if (!isDefaultPriority) {
                    // Check if any priority in the list exists in any of the levels
                    const isLevelValid =
                        priority_list.some(key => prioritiesState.first.level.includes(key)) &&
                        priority_list.some(key => prioritiesState.second.level.includes(key)) &&
                        priority_list.some(key => prioritiesState.third.level.includes(key));

                    // Check if any description is empty
                    const isDescriptionValid =
                        prioritiesState.first.description.trim() !== "" &&
                        prioritiesState.second.description.trim() !== "" &&
                        prioritiesState.third.description.trim() !== "";

                    if (!isLevelValid || !isDescriptionValid) {
                        toast.error("Incomplete Profile", {
                            autoClose: 2000
                        })
                        return;
                    }
                }

                break;
            case 7:
                if (!riskTolerance) {
                    toast.error("Incomplete Profile", {
                        autoClose: 2000
                    })
                    return;
                }
                break;
            case 8:
                if ((goal.long_term && !goal.short_term.trim()) || (goal.short_term && !goal.long_term.trim())) {
                    toast.error("Incomplete Profile", {
                        autoClose: 2000
                    })
                    return;
                }
                break;
            default:
                break;
        }
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
        <>
            {loading ? (
                <div className="w-full h-screen flex justify-center items-center">
                    <AILoading />
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col lg:flex-row w-screen h-screen "
                >
                    <ToastContainer
                        position="top-right"
                        autoClose={2000}
                        hideProgressBar={false}
                        closeOnClick={false}
                        pauseOnHover={false}
                        theme="dark"
                    />
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
                            <div className='bg-black border-2 border-white h-14 w-14 flex justify-center items-center rounded-full'>{currentStep}{" "}</div>
                            <div className='w-2/3'>{steps.find((step) => step.key === currentStep)?.value}</div>
                        </div>

                        <div className="text-white h-2/3 flex flex-col justify-evenly items-start w-5/6">
                            <div className='w-10/12 flex flex-col'>
                                <h1 className="text-2xl lg:text-4xl font-bold">
                                    Complete Your <span className="text-gold">Profile</span>
                                </h1>
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
                                            onClick={handleSubmit}
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
            )}
        </>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

export default MultiStepForm;

"use client"
import React, { useEffect, useState } from 'react'

import Loading from '../Loader';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { FormData, LocationInfo, RiskTolerance, UserAccountInfo } from '@/app/interface/userInterface';
import Income from './Income';
import Location from './Location';
import { AnimatePresence, motion } from "motion/react"
import { Expense } from './Expense';
import { Debt } from './Debt';
import { Saving } from './Saving';
import { Priority } from './Priority';
import Risk_Tolerance from './Risk_Tolerance';
import Goals from './Goals';
import Terms_Condition from './Terms_Condition';
import "./component.css"

// const MultiStepForm = ({ email, message, status }: { email: string, message: string, status: string }) => {
//     const router = useRouter();
//     const [step, setStep] = useState(1);
//     const [loading, setLoading] = useState(true);

// const [formData, setFormData] = useState<FormData>({
//     email: "",
//     locationInfo: {
//         location: "",
//     },
//     accountInfo: {
//         age: "",
//         occupation: "",
//         monthlyIncome: "",
//         totalExpense: "",
//         currentInvestment: "",
//         shortTermGoal: "",
//         longTermGoal: "",
//         riskTolerance: "",
//         debt: "",
//     },
//     termsAndCondition: {
//         acceptTerms: false,
//     },
// });

//     useEffect(() => {
//         const authenticateUser = async () => {
//             if (status === "unauthenticated") {
//                 router.push("/signin");
//                 return;
//             }

//             if (status === "authenticated" && email) {
//                 setFormData((prevData) => ({ ...prevData, email: email }));

//                 try {
//                     const result = await checkFinancialReport(`/user/checkFinancialReport/${email}`);

//                     if (result.status === 200) {
//                         if (!result.first_time) {
//                             router.push("/home?message=Access Denied");
//                         } else {
//                             setLoading(false);
//                         }
//                     } else if (result.status === 404 && result.errorType === "USER_NOT_EXIST") {
//                         await signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/signin` });
//                     } else if (result.status === 404 && result.errorType === "FINANCIAL_RESULT_NOT_FOUND") {
//                         setLoading(false);
//                     }
//                 } catch (error) {
//                     console.error("Error checking report:", error);
//                     setLoading(false);
//                 }
//             }
//         };

//         authenticateUser();
//     }, [status, email, router]);

//     useEffect(() => {
//         if (message.length > 0) {
//             toast.warn(message, { autoClose: 3000 })
//         }
//     }, [message])

//     if (loading) {
//         return (
//             <div className="w-full h-screen flex justify-center items-center">
//                 <Loading />
//             </div>
//         );
//     }

//     const handleChange = (
//         e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//     ) => {
//         const { name, value, type } = e.target;
//         const checked = (e.target as HTMLInputElement).checked;

//         const data = type === "checkbox" ? checked : value;

//         setFormData((prevData) => {
//             const sectionKey =
//                 name === "acceptTerms"
//                     ? "termsAndCondition"
//                     : step === 1
//                         ? "locationInfo"
//                         : "accountInfo";

//             return {
//                 ...prevData,
//                 [sectionKey]: {
//                     ...prevData[sectionKey],
//                     [name]: data,
//                 },
//             };
//         });
//     };

//     const nextStep = () => setStep(step + 1);
//     const prevStep = () => setStep(step - 1);

//     const renderStepContent = () => {
//         switch (step) {
//             case 1:
//                 return (
//                     <Location
//                         formData={formData.locationInfo}
//                         handleChange={handleChange}
//                     />
//                 );
//             case 2:
//                 return (
//                     <AccountInfo
//                         formData={formData.accountInfo}
//                         handleChange={handleChange}
//                     />
//                 );
//             case 3:
//                 return (
//                     <TermsAndCondition
//                         formData={formData.termsAndCondition}
//                         handleChange={handleChange}
//                     />
//                 );
//             case 4:
//                 return (
//                     <div className="flex flex-col items-center justify-center h-screen mt-10 p-4 md:p-8 lg:p-10">
//                         <Loading />
//                         <p className="text-lg font-semibold text-white mt-4 text-center">
//                             Generating your report, please wait.
//                         </p>
//                     </div>
//                 )
//             default:
//                 return (
//                     <Location
//                         formData={formData.locationInfo}
//                         handleChange={handleChange}
//                     />
//                 );
//         }
//     };

//     const isLocationFieldsFilled = (locationInfo: LocationInfo): boolean => {
//         return Object.values(locationInfo).every((field: any) => field.trim() !== "");
//     };

//     const areAccountInfoFieldsFilled = (accountInfo: UserAccountInfo): boolean => {
//         return Object.values(accountInfo).every((field: any) => field.trim() !== "");
//     };

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();

//         if (!isLocationFieldsFilled(formData.locationInfo)) {
//             toast.warn("Please select the country", {
//                 autoClose: 4000,
//                 position: "top-center",
//             });
//             setStep(1)
//             return;
//         }

//         if (!areAccountInfoFieldsFilled(formData.accountInfo)) {
//             toast.warn("Please fill out all the required fields to proceed.", {
//                 autoClose: 4000,
//                 position: "top-center",
//             });
//             setStep(2)
//             return;
//         }

//         if (!formData.termsAndCondition.acceptTerms) {
//             toast.warn("Please accept the terms and conditions to proceed.", {
//                 autoClose: 4000,
//                 position: "top-center",
//             });
//             return;
//         }

//         setStep(4)

//         try {
//             const result = await generateFinancialAdvice("finance/generateAdvice", formData);
//             console.log("Result:",result);

//             if (result.success) {
//                 router.push("/home");
//             } else {
//                 router.push('/error')
//                 // router.push(`/signup?message=User doesn't exist. Please sign up.`);
//             }
//         } catch (error) {
//             // toast.warn("An error occurred. Please try again later.")
//             router.push('/error')
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <>
//             <ToastContainer
//                 position="top-right"
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 rtl={false}
//                 pauseOnFocusLoss
//                 theme="dark"
//             />

//             <form onSubmit={handleSubmit} className="container mx-auto p-4">
//                 {step !== 4 && (
//                     <ol className="hidden md:flex items-center w-full p-3 space-x-2 text-sm font-medium text-center border-2 rounded-lg shadow-sm text-gray-400 sm:text-base bg-black border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse">
//                         <li
//                             className={`flex items-center ${step === 1 ? "text-green-500" : ""
//                                 }`}
//                         >
//                             <span
//                                 className={`flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 ${step === 1 ? "border-green-500" : "border-gray-400"
//                                     }`}
//                             >
//                                 1
//                             </span>
//                             Personal{" "}
//                             <span className="hidden sm:inline-flex sm:ms-2">Info</span>
//                             <svg
//                                 className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
//                                 aria-hidden="true"
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="none"
//                                 viewBox="0 0 12 10"
//                             >
//                                 <path
//                                     stroke="currentColor"
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="m7 9 4-4-4-4M1 9l4-4-4-4"
//                                 />
//                             </svg>
//                         </li>
//                         <li
//                             className={`flex items-center ${step === 2 ? "text-green-500" : ""
//                                 }`}
//                         >
//                             <span
//                                 className={`flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 ${step === 2 ? "border-green-500" : "border-gray-400"
//                                     }`}
//                             >
//                                 2
//                             </span>
//                             Account{" "}
//                             <span className="hidden sm:inline-flex sm:ms-2">Info</span>
//                             <svg
//                                 className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
//                                 aria-hidden="true"
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="none"
//                                 viewBox="0 0 12 10"
//                             >
//                                 <path
//                                     stroke="currentColor"
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="m7 9 4-4-4-4M1 9l4-4-4-4"
//                                 />
//                             </svg>
//                         </li>
//                         <li
//                             className={`flex items-center ${step === 3 ? "text-green-500" : ""
//                                 }`}
//                         >
//                             <span
//                                 className={`flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 ${step === 3 ? "border-green-500" : "border-gray-400"
//                                     }`}
//                             >
//                                 3
//                             </span>
//                             Review
//                         </li>
//                     </ol>
//                 )}

//                 <div className="flex items-center justify-center mt-5">
//                     <div
//                         className={`w-full mx-28 rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black  ${step === 1
//                             ? "max-w-5xl"
//                             : step === 2
//                                 ? "max-w-screen-5xl"
//                                 : "max-w-5xl"
//                             }`}
//                     >
//                         <div className="h-96 overflow-y-auto flex justify-center items-center scrollbar-hide">
//                             {renderStepContent()}
//                         </div>

//                         <div>
//                             {step === 1 && (
//                                 <div className="flex flex-col justify-center items-center">
//                                     <div className="bg-gradient-to-r from-transparent via-neutral-300 to-transparent my-6 h-[1px] w-full" />
//                                     <div className="relative group/btn flex items-center justify-center space-x-2 px-4 w-60 text-black rounded-md h-10 font-medium shadow-input bg-zinc-900 shadow-[0px_0px_1px_1px_var(--neutral-800)]">
//                                         <button
//                                             type="button"
//                                             onClick={nextStep}
//                                             className="btn w-full h-full"
//                                         >
//                                             <span className="text-neutral-300 text-sm">Next</span>
//                                         </button>
//                                         <BottomGradient />
//                                     </div>
//                                 </div>
//                             )}
//                             {step === 2 && (
//                                 <div>
//                                     <div className="bg-gradient-to-r from-transparent via-neutral-300 to-transparent my-6 h-[1px] w-full" />
//                                     <div className="flex justify-center items-center gap-20">
//                                         <div className="relative group/btn flex items-center justify-center space-x-2 px-4 w-60 text-black rounded-md h-10 font-medium shadow-input bg-zinc-900 shadow-[0px_0px_1px_1px_var(--neutral-800)]">
//                                             <button
//                                                 type="button"
//                                                 onClick={prevStep}
//                                                 className="btn w-full h-full"
//                                             >
//                                                 <span className="text-neutral-300 text-sm">
//                                                     Previous
//                                                 </span>
//                                             </button>
//                                             <BottomGradient />
//                                         </div>
//                                         <div className="relative group/btn flex items-center justify-center space-x-2 px-4 w-60 text-black rounded-md h-10 font-medium shadow-input bg-zinc-900 shadow-[0px_0px_1px_1px_var(--neutral-800)]">
// <button
//     type="button"
//     onClick={nextStep}
//     className="btn w-full h-full"
// >
//     <span className="text-neutral-300 text-sm">Next</span>
// </button>
// <BottomGradient />
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}
//                             {step === 3 && (
//                                 <div>
//                                     <div className="bg-gradient-to-r from-transparent via-neutral-300 to-transparent my-6 h-[1px] w-full" />
//                                     <div className="flex justify-center items-center gap-20">
//                                         <div className="relative group/btn flex items-center justify-center space-x-2 px-4 w-60 text-black rounded-md h-10 font-medium shadow-input bg-zinc-900 shadow-[0px_0px_1px_1px_var(--neutral-800)]">
//                                             <button
//                                                 type="button"
//                                                 onClick={prevStep}
//                                                 className="btn w-full h-full"
//                                             >
//                                                 <span className="text-neutral-300 text-sm">
//                                                     Previous
//                                                 </span>
//                                             </button>
//                                             <BottomGradient />
//                                         </div>
//                                         <div className="relative group/btn flex items-center justify-center space-x-2 px-4 w-60 text-black rounded-md h-10 font-medium shadow-input bg-zinc-900 shadow-[0px_0px_1px_1px_var(--neutral-800)]">
//                                             <button type="submit" className="btn w-full h-full">
//                                                 <span className="text-neutral-300 text-sm">Submit</span>
//                                             </button>
//                                             <BottomGradient />
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </form>
//         </>
//     )
// }

// const BottomGradient = () => {
//     return (
//         <>
//             <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
//             <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
//         </>
//     );
// };

const MultiStepForm = ({ email, message, status }: { email: string, message: string, status: string }) => {
    // State to track the current step
    const [currentStep, setCurrentStep] = useState(1);
    const [locationInfo, setLocationInfo] = useState<LocationInfo>({
        location: "",
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
        total_remaining_debt:0
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

    const handle_location = (data: string) => {
        setLocationInfo({
            ...locationInfo,
            location: data
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

    console.log(income);
    

    const handle_expense = (data: number) => {
        setExpense(data)
    }

    const handle_debt = (key: string, value: number) => {
        // setDebt(data)
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

    const handle_goals = (goalType:string, value:string) => {
        setGoal(prev => ({
            ...prev,
            [goalType]: value
        }))
    }

    const handleTermsCondition = (checked: boolean) => {
        setTermsCondition(checked)
    }
    
    const handleSubmit = () => {
        if(!termsCondition){
            alert("Please accept the terms and conditions")
            return;
        }
        setFormData({
            email: email,
            locationInfo: {
                location: locationInfo.location,
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
                acceptTerms: termsCondition
            }
        })
    }

    console.log(formData);
    

    // Steps array with components
    const steps = [
        { key: 1, value: "Choose Your Location", component: <Location formData={locationInfo.location} handleFormData={handle_location} /> },
        { key: 2, value: "Personal Details", component: <Income formData={income} handleFormData={handle_account} /> },
        { key: 3, value: "Expenses Details", component: <Expense formData={expense} handleFormData={handle_expense}/> },
        { key: 4, value: "Debt Overview", component: <Debt formData={debt} handleFormData={handle_debt} /> },
        { key: 5, value: "Savings Plan", component: <Saving formData={saving} handleFormData={handle_saving} /> },
        { key: 6, value: "Set Priorities", component: <Priority formData={prioritiesState} checked={isDefaultPriority} handleFormData={handle_priority} handleCheckStatus={handlePriorityCheckStatus}/> },
        { key: 7, value: "Assess Risk Tolerance", component: <Risk_Tolerance formData={riskTolerance} handleFormData={handle_risk} /> },
        { key: 8, value: "Define your Goals", component: <Goals formData={goal} handleFormData={handle_goals} /> },
        { key: 9, value: "Terms And Condition", component: <Terms_Condition status={termsCondition} handleFormData={handleTermsCondition} /> }
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
            className="flex flex-col lg:flex-row w-screen h-screen "
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

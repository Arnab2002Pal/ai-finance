"use client"
import React, { useEffect, useState } from 'react'
import Loading from '../Loader';
import Location from '@/app/(pages)/form/location/page';
import AccountInfo from '@/app/(pages)/form/account/page';
import TermsAndCondition from '@/app/(pages)/form/termAndCondition/page';
import { checkFinancialReport, generateFinancialAdvice } from '@/app/api/utility/api';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { FormData, LocationInfo, UserAccountInfo } from '@/app/interface/userInterface';


const MultiStepForm = ({ email, message, status }: { email: string, message: string, status: string }) => {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState<FormData>({
        email: "",
        locationInfo: {
            location: "",
        },
        accountInfo: {
            age: "",
            occupation: "",
            monthlyIncome: "",
            totalExpense: "",
            currentInvestment: "",
            shortTermGoal: "",
            longTermGoal: "",
            riskTolerance: "",
            debt: "",
        },
        termsAndCondition: {
            acceptTerms: false,
        },
    });

    useEffect(() => {
        const authenticateUser = async () => {
            if (status === "unauthenticated") {
                router.push("/signin");
                return;
            }

            if (status === "authenticated" && email) {
                setFormData((prevData) => ({ ...prevData, email: email }));

                try {
                    const result = await checkFinancialReport(`/checkFinancialReport/${email}`);

                    if (result.status === 200) {
                        if (!result.first_time) {
                            router.push("/home?message=Access Denied");
                        } else {
                            setLoading(false);
                        }
                    } else if (result.status === 404 && result.errorType === "USER_NOT_EXIST") {
                        await signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/signin` });
                    } else if (result.status === 404 && result.errorType === "FINANCIAL_RESULT_NOT_FOUND") {
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

    if (loading) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <Loading />
            </div>
        );
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        const data = type === "checkbox" ? checked : value;

        setFormData((prevData) => {
            const sectionKey =
                name === "acceptTerms"
                    ? "termsAndCondition"
                    : step === 1
                        ? "locationInfo"
                        : "accountInfo";

            return {
                ...prevData,
                [sectionKey]: {
                    ...prevData[sectionKey],
                    [name]: data,
                },
            };
        });
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <Location
                        formData={formData.locationInfo}
                        handleChange={handleChange}
                    />
                );
            case 2:
                return (
                    <AccountInfo
                        formData={formData.accountInfo}
                        handleChange={handleChange}
                    />
                );
            case 3:
                return (
                    <TermsAndCondition
                        formData={formData.termsAndCondition}
                        handleChange={handleChange}
                    />
                );
            case 4:
                return (
                    <div className="flex flex-col items-center justify-center h-screen mt-10 p-4 md:p-8 lg:p-10">
                        <Loading />
                        <p className="text-lg font-semibold text-white mt-4 text-center">
                            Generating your report, please wait.
                        </p>
                    </div>
                )
            default:
                return (
                    <Location
                        formData={formData.locationInfo}
                        handleChange={handleChange}
                    />
                );
        }
    };

    const isLocationFieldsFilled = (locationInfo: LocationInfo): boolean => {
        return Object.values(locationInfo).every((field: any) => field.trim() !== "");
    };
    
    const areAccountInfoFieldsFilled = (accountInfo: UserAccountInfo): boolean => {
        return Object.values(accountInfo).every((field: any) => field.trim() !== "");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isLocationFieldsFilled(formData.locationInfo)) {
            toast.warn("Please select the country", {
                autoClose: 4000,
                position: "top-center",
            });
            setStep(1)
            return;
        }
        
        if (!areAccountInfoFieldsFilled(formData.accountInfo)) {
            toast.warn("Please fill out all the required fields to proceed.", {
                autoClose: 4000,
                position: "top-center",
            });
            setStep(2)
            return;
        }

        if (!formData.termsAndCondition.acceptTerms) {
            toast.warn("Please accept the terms and conditions to proceed.", {
                autoClose: 4000,
                position: "top-center",
            });
            return;
        }

        setStep(4)

        try {
            const result = await generateFinancialAdvice("generateAdvice", formData);
            console.log("Result:",result);
            
            if (result.success) {
                router.push("/home");
            } else {
                router.push('/error')
                // router.push(`/signup?message=User doesn't exist. Please sign up.`);
            }
        } catch (error) {
            // toast.warn("An error occurred. Please try again later.")
            router.push('/error')
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                hideProgressBar={false}
                newestOnTop={false}
                rtl={false}
                pauseOnFocusLoss
                theme="dark"
            />

            <form onSubmit={handleSubmit} className="container mx-auto p-4">
                {step !== 4 && (
                    <ol className="hidden md:flex items-center w-full p-3 space-x-2 text-sm font-medium text-center border-2 rounded-lg shadow-sm text-gray-400 sm:text-base bg-black border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse">
                        <li
                            className={`flex items-center ${step === 1 ? "text-green-500" : ""
                                }`}
                        >
                            <span
                                className={`flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 ${step === 1 ? "border-green-500" : "border-gray-400"
                                    }`}
                            >
                                1
                            </span>
                            Personal{" "}
                            <span className="hidden sm:inline-flex sm:ms-2">Info</span>
                            <svg
                                className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 12 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m7 9 4-4-4-4M1 9l4-4-4-4"
                                />
                            </svg>
                        </li>
                        <li
                            className={`flex items-center ${step === 2 ? "text-green-500" : ""
                                }`}
                        >
                            <span
                                className={`flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 ${step === 2 ? "border-green-500" : "border-gray-400"
                                    }`}
                            >
                                2
                            </span>
                            Account{" "}
                            <span className="hidden sm:inline-flex sm:ms-2">Info</span>
                            <svg
                                className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 12 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m7 9 4-4-4-4M1 9l4-4-4-4"
                                />
                            </svg>
                        </li>
                        <li
                            className={`flex items-center ${step === 3 ? "text-green-500" : ""
                                }`}
                        >
                            <span
                                className={`flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 ${step === 3 ? "border-green-500" : "border-gray-400"
                                    }`}
                            >
                                3
                            </span>
                            Review
                        </li>
                    </ol>
                )}

                <div className="flex items-center justify-center mt-5">
                    <div
                        className={`w-full mx-28 rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black  ${step === 1
                            ? "max-w-5xl"
                            : step === 2
                                ? "max-w-screen-5xl"
                                : "max-w-5xl"
                            }`}
                    >
                        <div className="h-96 overflow-y-auto flex justify-center items-center scrollbar-hide">
                            {renderStepContent()}
                        </div>

                        <div>
                            {step === 1 && (
                                <div className="flex flex-col justify-center items-center">
                                    <div className="bg-gradient-to-r from-transparent via-neutral-300 to-transparent my-6 h-[1px] w-full" />
                                    <div className="relative group/btn flex items-center justify-center space-x-2 px-4 w-60 text-black rounded-md h-10 font-medium shadow-input bg-zinc-900 shadow-[0px_0px_1px_1px_var(--neutral-800)]">
                                        <button
                                            type="button"
                                            onClick={nextStep}
                                            className="btn w-full h-full"
                                        >
                                            <span className="text-neutral-300 text-sm">Next</span>
                                        </button>
                                        <BottomGradient />
                                    </div>
                                </div>
                            )}
                            {step === 2 && (
                                <div>
                                    <div className="bg-gradient-to-r from-transparent via-neutral-300 to-transparent my-6 h-[1px] w-full" />
                                    <div className="flex justify-center items-center gap-20">
                                        <div className="relative group/btn flex items-center justify-center space-x-2 px-4 w-60 text-black rounded-md h-10 font-medium shadow-input bg-zinc-900 shadow-[0px_0px_1px_1px_var(--neutral-800)]">
                                            <button
                                                type="button"
                                                onClick={prevStep}
                                                className="btn w-full h-full"
                                            >
                                                <span className="text-neutral-300 text-sm">
                                                    Previous
                                                </span>
                                            </button>
                                            <BottomGradient />
                                        </div>
                                        <div className="relative group/btn flex items-center justify-center space-x-2 px-4 w-60 text-black rounded-md h-10 font-medium shadow-input bg-zinc-900 shadow-[0px_0px_1px_1px_var(--neutral-800)]">
                                            <button
                                                type="button"
                                                onClick={nextStep}
                                                className="btn w-full h-full"
                                            >
                                                <span className="text-neutral-300 text-sm">Next</span>
                                            </button>
                                            <BottomGradient />
                                        </div>
                                    </div>
                                </div>
                            )}
                            {step === 3 && (
                                <div>
                                    <div className="bg-gradient-to-r from-transparent via-neutral-300 to-transparent my-6 h-[1px] w-full" />
                                    <div className="flex justify-center items-center gap-20">
                                        <div className="relative group/btn flex items-center justify-center space-x-2 px-4 w-60 text-black rounded-md h-10 font-medium shadow-input bg-zinc-900 shadow-[0px_0px_1px_1px_var(--neutral-800)]">
                                            <button
                                                type="button"
                                                onClick={prevStep}
                                                className="btn w-full h-full"
                                            >
                                                <span className="text-neutral-300 text-sm">
                                                    Previous
                                                </span>
                                            </button>
                                            <BottomGradient />
                                        </div>
                                        <div className="relative group/btn flex items-center justify-center space-x-2 px-4 w-60 text-black rounded-md h-10 font-medium shadow-input bg-zinc-900 shadow-[0px_0px_1px_1px_var(--neutral-800)]">
                                            <button type="submit" className="btn w-full h-full">
                                                <span className="text-neutral-300 text-sm">Submit</span>
                                            </button>
                                            <BottomGradient />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
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
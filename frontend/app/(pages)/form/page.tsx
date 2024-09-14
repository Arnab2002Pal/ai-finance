'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Location from './location/page';
import AccountInfo from './account/page';
import TermsAndCondition from './termAndCondition/page';
import { postUserInfo } from '@/app/api/utility/api';
import { useSession } from 'next-auth/react';

const MultiStepForm = () => {
    const router = useRouter()
    const [step, setStep] = useState(1);
    const { data: session, status } = useSession()
    const userEmail = session?.user?.email
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        email: "",
        locationInfo: {
            location: ""
        },
        accountInfo: {
            occupation: '',
            monthlyIncome: '',
            totalExpense: '',
            currentInvestment: '',
            shortTermGoal: '',
            longTermGoal: '',
            riskTolerance: '',
            debt: '',
        },
        termsAndCondition: {
            acceptTerms: false,
        },
    });

    useEffect(() => {
        if (userEmail) {
            setFormData((prevData) => ({
                ...prevData,
                email: userEmail,
            }));
        }
    }, [userEmail]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        const data = type === 'checkbox' ? checked : value;

        setFormData((prevData) => {
            const sectionKey = name === 'acceptTerms' ? 'termsAndCondition' : step === 1 ? 'locationInfo' : 'accountInfo';

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
                return <Location formData={formData.locationInfo} handleChange={handleChange} />;
            case 2:
                return <AccountInfo formData={formData.accountInfo} handleChange={handleChange} />;
            case 3:
                return <TermsAndCondition formData={formData.termsAndCondition} handleChange={handleChange} />;
            default:
                return <Location formData={formData.locationInfo} handleChange={handleChange} />;
        }
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formData.termsAndCondition.acceptTerms === true) {

            try {
                const result = await postUserInfo('userInfo', formData);

                if (result.success === true) {
                    router.push('/home');
                } else {
                    alert('Something went wrong. Please try again.');
                    // router.push('/error'); // Optional: You can route to an error page
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('An error occurred. Please try again later.');
                // router.push('/error'); // Optional: Handle API error by redirecting to a specific page
            }
        } else {
            alert('Please accept the Terms and Conditions to proceed.');
        }
    };
    
    return (
        <form onSubmit={handleSubmit} className="container mx-auto p-4">
            <ol className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center border-2 rounded-lg shadow-sm text-gray-400 sm:text-base bg-black border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse">
                <li className={`flex items-center ${step === 1 ? 'text-green-500' : ''}`}>
                    <span className={`flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 ${step === 1 ? 'border-green-500' : 'border-gray-400'}`}>
                        1
                    </span>
                    Personal <span className="hidden sm:inline-flex sm:ms-2">Info</span>
                    <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                        <path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="m7 9 4-4-4-4M1 9l4-4-4-4" />
                    </svg>
                </li >
                <li className={`flex items-center ${step === 2 ? 'text-green-500' : ''}`}>
                    <span className={`flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 ${step === 2 ? 'border-green-500' : 'border-gray-400'}`}>
                        2
                    </span>
                    Account <span className="hidden sm:inline-flex sm:ms-2">Info</span>
                    <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                        <path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="m7 9 4-4-4-4M1 9l4-4-4-4" />
                    </svg>
                </li>
                <li className={`flex items-center ${step === 3 ? 'text-green-500' : ''}`}>
                    <span className={`flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 ${step === 3 ? 'border-green-500' : 'border-gray-400'}`}>
                        3
                    </span>
                    Review
                </li>
            </ol >

            <div className="flex items-center justify-center mt-20">
                <div className={`w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black  ${step === 1 ? 'max-w-md' : step === 2 ? 'max-w-screen-md' : 'max-w-md'
                    }`}>
                    <div className="">
                        {renderStepContent()}
                    </div>

                    <div>
                        {
                            step == 1 &&
                            <div className='relative group/btn flex items-center justify-center space-x-2 px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-zinc-900 shadow-[0px_0px_1px_1px_var(--neutral-800)]'>
                                <button type="button" onClick={nextStep} className="btn w-full h-full"><span className='text-neutral-300 text-sm'>Next</span></button>
                                <BottomGradient />
                            </div>

                        }
                        {
                            step == 2 &&
                            <div className='flex justify-center items-center gap-20'>
                                <div className='relative group/btn flex items-center justify-center space-x-2 px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-zinc-900 shadow-[0px_0px_1px_1px_var(--neutral-800)]'>
                                    <button type="button" onClick={prevStep} className="btn w-full h-full"><span className='text-neutral-300 text-sm'>Previous</span></button>
                                    <BottomGradient />
                                </div>

                                <div className='relative group/btn flex items-center justify-center space-x-2 px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-zinc-900 shadow-[0px_0px_1px_1px_var(--neutral-800)]'>
                                    <button type="button" onClick={nextStep} className="btn w-full h-full"><span className='text-neutral-300 text-sm'>Next</span></button>
                                    <BottomGradient />
                                </div>
                            </div>
                        }
                        {
                            step == 3 &&
                            <div className='flex justify-center items-center gap-20'>
                                <div className='relative group/btn flex items-center justify-center space-x-2 px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-zinc-900 shadow-[0px_0px_1px_1px_var(--neutral-800)]'>
                                    <button type="button" onClick={prevStep} className="btn w-full h-full"><span className='text-neutral-300 text-sm'>Previous</span></button>
                                    <BottomGradient />
                                </div>

                                <div className='relative group/btn flex items-center justify-center space-x-2 px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-zinc-900 shadow-[0px_0px_1px_1px_var(--neutral-800)]'>
                                    <button type="submit" className="btn w-full h-full"><span className='text-neutral-300 text-sm'>Submit</span></button>

                                    <BottomGradient />
                                </div>

                            </div>
                        }
                    </div>
                </div>
            </div>
        </form >

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

export default MultiStepForm

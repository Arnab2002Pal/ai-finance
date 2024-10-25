"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Location from "./location/page";
import AccountInfo from "./account/page";
import TermsAndCondition from "./termAndCondition/page";
import { checkFinancialReport, generateFinancialAdvice } from "@/app/api/utility/api";
import { signOut, useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "@/app/components/Loader";

const MultiStepForm = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const searchedMessage = useSearchParams();
  const message = searchedMessage.get("message");

  const [formData, setFormData] = useState({
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
    if (status === "authenticated" && userEmail) {
      const checkReport = async () => {
        try {
          const result = await checkFinancialReport(`/checkFinancialReport/${userEmail}`);

          if (result.status === 200 && result.first_time === false) {
            router.push("/home?message=Access Denied");
            return;
          } else if (result.status === 200 && result.first_time === true) {
            setLoading(false);
          } else if (result.status === 404) {
            if (result.errorType == "USER_NOT_EXIST") {
              await signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/signin?message=User Not Registered` })
              return;
            } else if (result.errorType == "FINANCIAL_RESULT_NOT_FOUND") {
              toast.error(message, {
                pauseOnHover: false,
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
              })
              setLoading(false);
            }
          }
        } catch (error) {
          console.error("Error checking report:", error);
          setLoading(false);
        }
      };

      checkReport();
    } else if (status === "unauthenticated") {
      router.push("/signup");
    }
  }, [status, userEmail, router]);

  useEffect(() => {
    if (userEmail) {
      setFormData((prevData) => ({
        ...prevData,
        email: userEmail,
      }));
    }
  }, [userEmail]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  useEffect(() => {
    if (message) {
      toast.error(message, {
        autoClose: 2000,
      });
    }
  }, [message]);

  if (status === "loading" || loading) {
    return <div className="w-full h-screen flex justify-center items-center">
      <Loading />
    </div>;
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
        return <div className="text-center">Submitting...</div>;
      default:
        return (
          <Location
            formData={formData.locationInfo}
            handleChange={handleChange}
          />
        );
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.termsAndCondition.acceptTerms) {
      toast.warn("Please accept the terms and conditions to proceed.", {
        autoClose: 4000,
        position: "top-center",
      });
      return;
    }

    setStep(4)
    // setLoading(true);

    try {
      const result = await generateFinancialAdvice("generateAdvice", formData);

      if (result.success) {
        router.push("/home");
      } else {
        router.push(`/signup?message=User doesn't exist. Please sign up.`);
      }
    } catch (error) {
      toast.warn("An error occurred. Please try again later.");
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
          <ol className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center border-2 rounded-lg shadow-sm text-gray-400 sm:text-base bg-black border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse">
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
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

export default MultiStepForm;

// SignupForm component
"use client";
import React, { useEffect } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/app/lib/utils";
import { IconBrandGoogle } from "@tabler/icons-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signUpValidationSchema, SignUpValidationSchema } from "@/app/validator/userValidation";
import { credentialUserRegistration } from "@/app/api/utility/api";

export default function SignupForm() {
  const router = useRouter();
  const searchedMessage = useSearchParams();
  const message = searchedMessage.get("message");

  const { register, handleSubmit, formState: { errors } } = useForm<SignUpValidationSchema>({
    resolver: zodResolver(signUpValidationSchema),
  });

  useEffect(() => {
    if (message) {
      toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
      });
    }
  }, [message]);

  const submitForm = async (data: SignUpValidationSchema) => {
    const { confirmPassword, ...updatedFormData } = data;
    try {
      const result = await credentialUserRegistration('user/userCreate', updatedFormData);
      if (!result.success) {
        const redirectTo = result.providerId === "google" ? '/signin?message=Already registered with google' : '/signin?message=Already registered.';
        router.push(redirectTo);
      } else {
        router.push('/signin?message=User Registration Successfully');
      }
    } catch (error) {
      toast.error("An error occurred while registering", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <ToastContainer theme="dark" />
      <div className="max-w-md w-full mx-auto p-4 sm:p-8 rounded-none md:rounded-2xl bg-zinc-700 bg-opacity-10 backdrop-blur-md shadow-xl border border-gray-300 border-opacity-30">

        <h2 className="font-bold text-lg sm:text-xl text-white">Welcome to Vault</h2>
        <p className="text-sm text-white mt-2">Register yourself to access your Vault</p>

        <form className="mt-6 space-y-6" onSubmit={handleSubmit(submitForm)}>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-2">
            <LabelInputContainer>
              <Label htmlFor="firstName">First name</Label>
              <Input id="firstName" placeholder="Tyler" {...register('firstName')} />
              {errors?.firstName && <span className="text-red-500 text-xs">{errors.firstName.message}</span>}
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastName">Last name</Label>
              <Input id="lastName" placeholder="Durden" {...register('lastName')} />
              {errors?.lastName && <span className="text-red-500 text-xs">{errors.lastName.message}</span>}
            </LabelInputContainer>
          </div>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" placeholder="projectmayhem@fc.com" {...register('email')} />
            {errors?.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" {...register('password')} />
            {errors?.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
          </LabelInputContainer>

          <LabelInputContainer className="mb-8">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input id="confirmPassword" type="password" placeholder="••••••••" {...register('confirmPassword')} />
            {errors?.confirmPassword && <span className="text-red-500 text-xs">{errors.confirmPassword.message}</span>}
          </LabelInputContainer>

          <div className=" relative group/btn flex items-center justify-center w-full text-black rounded-md font-medium shadow-input bg-black shadow-[0px_0px_1px_1px_var(--neutral-800)] lg:mt-6 lg:space-x-2 lg:px-4">
            <button
              type="submit"
              className="btn w-full text-md h-full px-4 py-2 text-white rounded disabled:opacity-50 flex items-center justify-center"
            >
              Sign up &rarr;
            </button>
            <BottomGradient />
          </div>

          <div className=" text-sm font-light text-white">
            Already have an account? <Link href="/signin" className="font-semibold">Log In</Link>
          </div>
        </form>


        <div className=" relative group/btn flex items-center justify-center w-full text-black rounded-md font-medium shadow-input bg-black shadow-[0px_0px_1px_1px_var(--neutral-800)] lg:mt-6 lg:space-x-2 lg:px-4">
          <button
            onClick={() => signIn("google", { callbackUrl: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/form` })}
            className="btn w-full h-full px-4 py-2 text-white rounded disabled:opacity-50 flex items-center justify-center"
          >
            <IconBrandGoogle className="h-4 w-4 text-white" />
            <span className="ml-2 text-white text-md">Google</span>
          </button>
          <BottomGradient />
        </div>
      </div>
    </>
  );
}

// Helper Components
const LabelInputContainer = ({ children, className }: any) => {
  return <div className={`flex flex-col w-full space-y-2 ${className}`}>{children}</div>;
};


const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};


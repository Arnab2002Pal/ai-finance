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
  const router = useRouter()
  const searchedMessage = useSearchParams();

  const message = searchedMessage.get("message");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpValidationSchema>({
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
  });

  const submitForm = async (data: SignUpValidationSchema) => {
    /*
    Rest operator: When used in destructuring (...rest), it collects the remaining properties into a new object or array.
    */
    const {confirmPassword, ...updatedFormData} = data
    try {
      const result = await credentialUserRegistration('userCreate', updatedFormData)
      if (!result.success) {
        switch (result.providerId) {
          case "google":
            router.push('/signin?message=Already registered with google')
            break;
          case "credential":
            router.push('/signin?message=Already registered.')    
            break;
          default:
            toast.error("An error occurred while registering", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
            })
            break;
        }
      }

      if (result.success) {
        router.push('/signin?message=User Registration Successfully')            
      }
    } catch (error: any) {
      throw new Error("Invalid user registration:", error);
    } 
  };

  return (
    <>
      <ToastContainer theme="dark" />
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black border-gray-700 border-2">
        <h2 className="font-bold text-xl text-neutral-200">Welcome to Vault</h2>
        <p className="text-sm max-w-sm mt-2 text-neutral-300">
          Register yourself to access your Vault
        </p>

        <form className="mt-7" onSubmit={handleSubmit(submitForm)}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                placeholder="Tyler"
                {...register('firstName')}
              />
              {errors?.firstName && <span className="text-red-500 text-xs">{errors.firstName.message}</span>}

            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                placeholder="Durden"
                {...register('lastName')}
              />
              {errors?.lastName && <span className="text-red-500 text-xs">{errors.lastName.message}</span>}
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="projectmayhem@fc.com"
              {...register('email', { required: "email Required" })}
            />
            {errors?.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register('password', { required: true })}
            />
            {errors?.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
          </LabelInputContainer>
          <LabelInputContainer className="mb-8">
            <Label htmlFor="twitterpassword">Your Confirm password</Label>
            <Input
              id="confirmPassword"
              placeholder="••••••••"
              type="password"
              {...register('confirmPassword', { required: true })}
            />
            {errors?.confirmPassword && <span className="text-red-500 text-xs">{errors.confirmPassword.message}</span>}

          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Sign up &rarr;
            <BottomGradient />
          </button>

          <div className="pt-4 text-sm font-light text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Already have an account?{" "}
            <span className="font-semibold">
              <Link href="/signin">Log In</Link>
            </span>
          </div>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 to-transparent my-8 h-[1px] w-full" />

          <div className="flex flex-col space-y-4">
          </div>
        </form>
            <button
              onClick={() =>
                signIn("google", { callbackUrl: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/form` })
              }
              className="relative group/btn flex items-center justify-center space-x-2 px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-zinc-900 shadow-[0px_0px_1px_1px_var(--neutral-800)]"
              type="submit"
            >
              <IconBrandGoogle className="h-4 w-4 text-neutral-300 flex" />
              <span className="text-neutral-300 text-sm">Google</span>
              <BottomGradient />
            </button>
      </div>
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

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

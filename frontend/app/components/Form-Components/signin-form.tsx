"use client";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/app/lib/utils";
import { IconBrandGoogle } from "@tabler/icons-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { signInValidationSchema, SignInValidationSchema } from "@/app/validator/userValidation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInValidationSchema>({
    resolver: zodResolver(signInValidationSchema),
  });

  const handleCredentialSignIn = async (data: SignInValidationSchema) => {
    const { email, password } = data;
    await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/home",
    });
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black border-black md:border-gray-700 md:border-2">
      <h2 className="font-bold text-lg md:text-xl text-neutral-200">Welcome to Vault</h2>
      <p className="text-xs md:text-sm mt-2 text-neutral-300">
        Login to access your Vault
      </p>

      <form className="mt-6 md:mt-7" onSubmit={handleSubmit(handleCredentialSignIn)}>
        <LabelInputContainer className="mb-3 md:mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="example@example.com"
            {...register("email")}
          />
          {errors?.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
        </LabelInputContainer>
        <LabelInputContainer className="mb-3 md:mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            {...register("password")}
          />
          {errors?.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
        </LabelInputContainer>
        <button
          className="bg-gradient-to-br group relative from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] transition-all duration-200 hover:scale-105"
          type="submit"
        >
          Sign In &rarr;
          <BottomGradient />
        </button>

        <div className="pt-4 text-xs md:text-sm font-light text-white">
          Don&apos;t have an account?{" "}
          <span className="font-semibold">
            <Link href="/signup">Register</Link>
          </span>
        </div>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 to-transparent my-6 md:my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-3 md:space-y-4">
          <button
            onClick={() =>
              signIn("google", { callbackUrl: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/home` })
            }
            className="relative group flex items-center justify-center space-x-2 px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-zinc-900 shadow-[0px_0px_1px_1px_var(--neutral-800)] transition-all duration-200 hover:scale-105"
            type="button"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-300 flex" />
            <span className="text-neutral-300 text-xs md:text-sm">Google</span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
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
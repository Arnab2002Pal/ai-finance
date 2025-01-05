"use client";
import React, { useEffect } from "react";
import SignupForm from "../components/Form-Components/signup-form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Loading from "../components/Loader";

const SignUp = () => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/home");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="w-full h-screen flex justify-center items-center">
      <Loading />
    </div>;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-[#000000] via-[#4a3503] to-[#f8d948]">
      <SignupForm />
    </div>
  );
};

export default SignUp;

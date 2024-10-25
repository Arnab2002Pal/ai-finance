"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import SignInForm from "../components/Form-Components/signin-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../components/Loader";

const SignIn = () => {
  const router = useRouter();
  const { status } = useSession();
  const searchedMessage = useSearchParams();
  const message = searchedMessage.get("message");

  useEffect(() => {
    if (message) {
      toast.success(message, {
        autoClose: 2000,
      });
    }
  }, [message]);

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
    <>
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        theme="dark"
      />
      <div className="flex flex-col justify-center items-center min-h-screen">
        <SignInForm />
      </div>
    </>
  );
};

export default SignIn;

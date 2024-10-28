"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Suspense, useEffect, useState } from "react";
import SignInForm from "../components/Form-Components/signin-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../components/Loader";
import { MessageFetcher } from "../lib/utils";

const SignIn = () => {
  const router = useRouter();
  const { status } = useSession();
  const [message, setMessage] = useState("");

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

  return (
    <>
      <Suspense fallback={<Loading />}>
        <MessageFetcher setMessage={setMessage} />

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
      </Suspense>
    </>
  );
};

export default SignIn;

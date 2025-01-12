"use client";
import React, { Suspense, useState } from "react";
import { useSession } from "next-auth/react";
import {Loading} from "@/app/components/Loader";
import MultiStepForm from "@/app/components/Form-Components/Multi-StepForm";
import { MessageFetcher } from "@/app/lib/utils";

const Home = () => {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;
  const [message, setMessage] = useState("");

  return (
    <Suspense fallback={<Loading />}>
      <MessageFetcher setMessage={setMessage} />
      <MultiStepForm email={userEmail || ""} status={status} message={message || ""} />
    </Suspense>
  );
};

export default Home;

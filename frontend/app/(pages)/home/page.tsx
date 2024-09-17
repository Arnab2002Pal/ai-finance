"use client";
import React, { useEffect, useState } from "react";
import Appbar from "../../components/Appbar";
import Doughnut from "@/app/components/ui/doughnut";
import { useSession } from "next-auth/react";
import { getUserInfo } from "@/app/api/utility/api";
import { UserData } from "@/interface/userInterface";
import { useRouter } from "next/navigation";

const Home: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState<UserData>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const user_id = session?.user?.user_id;

  // Fetch user data
  const fetchData = async (id: number) => {
    try {
      const data = await getUserInfo(`userInfo/${id}`);
      setUserData(data);
    } catch (err) {
      console.error("Error fetching user info:", err);
      setError("Failed to fetch user data.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when the user is available
  useEffect(() => {
    if (user_id) {
      fetchData(user_id);
    }
  }, [user_id]);


  // By using useEffect, the component can render initially, and then if the status is unauthenticated, it triggers the redirection. This prevents a blocking operation that could slow down or even prevent the page from loading.
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  // Destructure user financial info for easier access
  const {
    userFinancialInfo: {
      expenseAnalysis = {},
      debtManagement = {},
      investmentAdvice = {},
      goalRoadmap = {},
      growth = {},
      savingPlan = {},
      structuredPlan = {},
      summary = "",
    } = {},
  } = userData;

  return (
    <div>
      <Appbar />
      <div className="mx-4 my-6 border-2 border-normal-500 border-solid rounded-xl h-screen">
        <div className="flex justify-center items-center">
          {loading ? (
            <p>Generating the report...</p>
          ) : loading && error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <Doughnut expense={expenseAnalysis} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

"use client";
import React, { useEffect, useState } from 'react';
import Appbar from "../../components/Appbar";
import Doughnut from '@/app/components/ui/doughnut';
import { useSession } from 'next-auth/react';
import { getUserInfo } from '@/app/api/utility/api';
import { UserData } from '@/interface/userInterface';



const Home: React.FC = () => {
  const { data: session, status } = useSession();
  const user_id = session?.user?.user_id;

  const [userData, setUserData] = useState<UserData>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUserInfo(`userInfo/${id}`);
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user info:', error);
      setError('Failed to fetch user data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(user_id!);
  }, [user_id]);

  const { success, userFinancialInfo } = userData
  const {
    expenseAnalysis = {},
    debtManagement = {},
    investmentAdvice = {},
    goalRoadmap = {},
    growth = {},
    savingPlan = {},
    structuredPlan = {},
    summary = ''
  } = userFinancialInfo || {};
  console.log(expenseAnalysis);
  
  return (
    <div>
      <Appbar />
      <div className='mx-4 my-6 border-2 border-normal-500 border-solid rounded-xl h-screen'>
        <div className='flex justify-center items-center'>
          {loading ? (
            <p>Generating the report...</p>
          ) : error ? (
            <p className='text-red-500'>{error}</p>
          ) : (
                <Doughnut expense={expenseAnalysis}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

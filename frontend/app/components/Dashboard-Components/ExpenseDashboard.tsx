import React, { useState } from 'react'
import { HomeDashboard } from './HomeDashboard'
import { useRecoilValue } from 'recoil';
import { userFinancialInfoState } from '@/app/store/atoms/financialAtom';

const ExpenseDashboard = () => {
    const [showHome, setShowHome] = useState(false);
    const userFinancialInfo = useRecoilValue(userFinancialInfoState);

    const backClick = () => {
        setShowHome(true);       
    }

    if(showHome) {
        return <HomeDashboard
            category={userFinancialInfo}
            expense={userFinancialInfo.expenseAnalysis}
            debt={userFinancialInfo.debtManagement}
            investment={userFinancialInfo.investmentAdvice}
        />
    }
  return (
    <div>
        <button onClick={backClick}>
            Back
        </button>
    </div>
  )
}

export default ExpenseDashboard

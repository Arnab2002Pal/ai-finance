import React from 'react'
import { atom } from 'recoil'

export const userFinancialAtom = atom({
    key: 'userFinancialAtom',
    default: {
        expenseAnalysis: {},
        debtManagement: {},
        investmentAdvice: {},
        goalRoadmap: {},
        growth: {},
        savingPlan: {},
        structuredPlan: {},
        summary: "",
    },
})


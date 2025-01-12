import React from 'react'
import type { DebtManagement } from '@/app/interface/userInterface'

const Debt = ({ debt }: { debt: DebtManagement }) => {
  return (
      <div className="md:p-6 bg-none md:bg-neutral-900 text-white rounded-xl shadow-lg animate-fadeIn transition-all duration-500 ease-in-out">
          {/* Header */}
          <div className="w-full flex flex-col items-start md:flex-row md:justify-between mb-6">
              <h2 className="text-gold text-2xl md:text-3xl font-bold">📉 Debt Management</h2>
          </div>

          {/* Content */}
          <div className="flex flex-col md:flex-row justify-between items-start w-full gap-6 ">
              {/* Left Card - Savings Summary */}
              <div className="flex-1 p-4 md:p-6 bg-neutral-900 md:bg-neutral-800 rounded-xl cursor-default max-h-[472px] overflow-auto scrollbar-hide transform transition-transform hover:shadow-[inset_-12px_-8px_40px_#454545] animate-fadeIn delay-200">
                  <div className="rounded-xl shadow-md text-white ">

                      <div className="space-y-3">
                          <p className="text-gray-300">
                              <strong className="text-white">Total Existing Debt:</strong> ₹{debt?.totalExistingDebt || 0}
                          </p>
                          <p className="text-gray-300">
                              <strong className="text-white">Recommended Debt Payment:</strong> ₹{debt?.recommendedDebtPayment || 0}
                          </p>
                          <p className="text-gray-300">
                              <strong className="text-white">Advice:</strong> {debt?.advice || "No specific advice at the moment."}
                          </p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default Debt

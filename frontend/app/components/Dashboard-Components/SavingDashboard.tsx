import React from 'react'

const SavingDashboard = () => {
  return (
    <>
      <div className="flex gap-2 flex-1 w-full h-full">
        <div className="w-full h-96 rounded-lg bg-neutral-800 flex justify-center items-center overflow-hidden">
          {/* <BarChart /> */}
        </div>
        <div className="w-full p-6 rounded-lg bg-neutral-800 flex flex-col justify-start items-start overflow-hidden">
          <div className="text-3xl font-bold">
            <h1>Structured Investment Plan</h1>
          </div>
          <div className="mt-6 max-h-64 overflow-auto scrollbar-hide">
            {/* {category?.structuredPlan &&
              // This method returns an array of key-value pairs from the category object. You can then loop over it using forEach.
              Object.entries(category.structuredPlan).map(
                ([key, value]) => (
                  <div key={key} className="mb-6">
                    <p className="text-xl font-bold">{key}</p>
                    <p className="text-neutral-400">
                      {value as React.ReactNode}
                    </p>
                  </div>
                )
              )} */}
          </div>
        </div>
      </div>
    </>
  )
}

export default SavingDashboard
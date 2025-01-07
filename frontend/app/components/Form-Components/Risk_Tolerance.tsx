import React, { useEffect, useState } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { risk_tolerance } from '@/app/utils/lists'
import { Label } from '../ui/label'

const Risk_Tolerance = ({ formData, handleFormData }: {
  formData: string,
  handleFormData: (value: string) => void
}) => {
  const [riskTolerance, setRiskTolerance] = useState<string>(formData || "")

  // Use useEffect to update the parent state only when riskTolerance changes
  useEffect(() => {
    handleFormData(riskTolerance)
  }, [riskTolerance, handleFormData])

  return (
    <div className='flex flex-col gap-2 w-full'>
      <Label htmlFor="monthly_expense" className="text-md md:text-xl font-semibold text-white">
        How much Risk can you take?
      </Label>
      <Select
        onValueChange={(value) => setRiskTolerance(value)}
      >
        <SelectTrigger className="">
          <SelectValue placeholder="Select a Level" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {risk_tolerance.map((level) => (
              <SelectItem key={level} value={level || riskTolerance} className='hover:bg-gray-200'>
                {level}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default Risk_Tolerance

import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { risk_tolerance } from '@/app/utils/lists'
import { Label } from '../ui/label'

const Risk_Tolerance = () => {
  return (
    <div>
      <Label htmlFor="monthly_expense" className="text-xl font-semibold text-white">
        How much Risk can you take?
      </Label>
      <Select
      // onValueChange={(value) => handlePriorityChange(key, "level", value)}
      >
        <SelectTrigger className="w-[480px]">
          <SelectValue placeholder="Select a Level" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {risk_tolerance.map((level) => (
              <SelectItem key={level} value={level} className='hover:bg-gray-200'>
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

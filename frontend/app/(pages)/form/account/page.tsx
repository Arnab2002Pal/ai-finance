import React from 'react'
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { cn } from "@/app/lib/utils";
import { Textarea } from "../../../components/ui/textarea"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';

const options = ['High', 'Low', 'Medium']


const AccountInfo = ({ formData, handleChange }: any) => {
  const handleRisk = (value: string) => {
    handleChange({ target: { name: "riskTolerance", value } });

  }
  return (
    <div className='grid grid-cols-2 gap-20'>
      {/* <div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="occupation">Occupation</Label>
          <Input
            placeholder="Student, Fresher, etc..."
            type="text"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
          />
          <Label htmlFor="monthlyIncome">Monthly Income</Label>
          <Input
            placeholder="eg. 25000"
            type="number"
            name="monthlyIncome"
            value={formData.monthlyIncome}
            onChange={handleChange}
          />
          {/* <Label htmlFor="totalExpense">Total Expense</Label>
          <Input
            placeholder="Student, Fresher, etc..."
            type="number"
            name="totalExpense"
            value={formData.totalExpense}
            onChange={handleChange}
          /> */}
      {/* <Label htmlFor="currentInvestment">Current Investment</Label>
          <Input
            placeholder="Student, Fresher, etc..."
            type="text"
            name="currentInvestment"
            value={formData.currentInvestment}
            onChange={handleChange}
          />
          <Label htmlFor="shortTermGoal">Short Term Goal</Label>
          <Input
            placeholder="Student, Fresher, etc..."
            type="text"
            name="shortTermGoal"
            value={formData.shortTermGoal}
            onChange={handleChange}
          />
          <Label htmlFor="longTermGoal">Long Term Goal</Label>
          <Input
            placeholder="Student, Fresher, etc..."
            type="text"
            name="longTermGoal"
            value={formData.longTermGoal}
            onChange={handleChange}
          />  */}




      {/* <Label htmlFor="riskTolerance">How much risk can you take?</Label>
          <Input
            placeholder="Student, Fresher, etc..."
            type="text"
            name="riskTolerance"
            value={formData.riskTolerance}
            onChange={handleChange}
          /> */}




      {/* <Select onValueChange={handleRisk}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Choose your Risk" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {options.map(option =>
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          <Label htmlFor="debt">Any debt?</Label>
          <Input
            placeholder="Student, Fresher, etc..."
            type="text"
            name="debt"
            value={formData.debt}
            onChange={handleChange}
          />
        </LabelInputContainer>
      </div>
      <div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="totalExpense">Total Expense</Label>
          <Textarea placeholder="Enter" name='totalExpense' value={formData.totalExpense} onChange={handleChange} className='text-black' />

        </LabelInputContainer>
      </div> */}


      <div>
        <div className="flex flex-col items-center gap-2 w-3/4 bg-neutral-800 rounded-lg p-10">
          <div className="text-3xl font-semibold text-white">
            Big Box Content
          </div>
          <div className="text-white text-center">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis cumque reiciendis enim deleniti ex ullam?
            {/* <DoughnutChart expense={expense ?? {}}/> */}
          </div>
        </div>
      </div>


    </div>
  )
}

export default AccountInfo

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

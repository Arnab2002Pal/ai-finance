import React from 'react'
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { cn } from "@/lib/utils";
import { Textarea } from "../../../components/ui/textarea"


const AccountInfo = ({ formData, handleChange }: any) => {
  return (
    <div className='grid grid-cols-2 gap-20'>
      <div>
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
          <Label htmlFor="currentInvestment">Current Investment</Label>
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
          />
          <Label htmlFor="riskTolerance">How much risk can you take?</Label>
          <Input
            placeholder="Student, Fresher, etc..."
            type="text"
            name="riskTolerance" 
            value={formData.riskTolerance}
            onChange={handleChange}
          />
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
          <Textarea placeholder="Enter" name='totalExpense' value={formData.totalExpense} onChange={handleChange} className='text-black'/>
   
        </LabelInputContainer>
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
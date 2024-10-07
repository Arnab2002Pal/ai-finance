import React from "react";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { cn } from "@/app/lib/utils";
import { Textarea } from "../../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

const options = ["High", "Low", "Medium"];

const AccountInfo = ({ formData, handleChange }: any) => {
  const handleRisk = (value: string) => {
    handleChange({ target: { name: "riskTolerance", value } });
  };
  return (
    <div className="flex justify-between h-full w-full">
      <div className="w-full flex flex-col justify-start items-center ">
        <div className="text-2xl pt-6 w-full text-center font-medium">
          Personal Information
        </div>
        <div className="bg-black w-full h-full p-10">
          <div></div>
          <LabelInputContainer className="mb-6">
            <Label htmlFor="age">Your current age</Label>
            <Input
              placeholder="Your current age"
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-6">
            <Label htmlFor="occupation">Occupation</Label>
            <Input
              placeholder="Student, Fresher, etc..."
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="monthlyIncome">In-hand Earning</Label>
            <Input
              placeholder="eg. 25000"
              type="number"
              name="monthlyIncome"
              value={formData.monthlyIncome}
              onChange={handleChange}
            />
          </LabelInputContainer>
        </div>
      </div>
      <div className="w-full flex flex-col justify-start items-center ">
        <div className="text-2xl pt-6 w-full text-center font-medium">
          Financial Information
        </div>
        <div className="bg-black w-full h-full p-10">
          <div></div>
          <LabelInputContainer className="mb-6">
            <Label htmlFor="currentInvestment">Current Investment</Label>
            <Input
              placeholder="Total Investment till date"
              type="number"
              name="currentInvestment"
              value={formData.currentInvestment}
              onChange={handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-6 relative">
            <Label htmlFor="shortTermGoal" className="flex items-end justify-between">
              Short Term Goal
              <button
                className="relative group"
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-info-small">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 9h.01" />
                  <path d="M11 12h1v4h1" />
                </svg>

                {/* Tooltip */}
                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-64 p-2 bg-gray-700 text-white text-sm rounded-md shadow-lg z-10">
                  Short-term goals are objectives you plan to achieve within 1-2 years, like saving for a vacation, buying a gadget, or investing in a small business with a target amount set.</div>
              </button>
            </Label>
            <Input
              placeholder="Within 1-2 years"
              type="text"
              name="shortTermGoal"
              value={formData.shortTermGoal}
              onChange={handleChange}
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-6">
            <Label htmlFor="longTermGoal" className="flex items-end justify-between">Long Term Goal
              <button
                className="relative group"
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-info-small">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 9h.01" />
                  <path d="M11 12h1v4h1" />
                </svg>

                {/* Tooltip */}
                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-64 p-2 bg-gray-700 text-white text-sm rounded-md shadow-lg z-10">
                  Long-term goals are objectives over 5+ years, like saving for retirement, buying a home, or building an investment portfolio, with or without a target amount set.</div>
              </button>
            </Label>

            <Input
              placeholder="More then 2 years"
              type="text"
              name="longTermGoal"
              value={formData.longTermGoal}
              onChange={handleChange}
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="riskTolerance">How much risk can you take?</Label>
            <Select onValueChange={handleRisk}>
              <SelectTrigger className="bg-white text-gray-400 font-medium">
                <SelectValue placeholder="Choose your Risk" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {options.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </LabelInputContainer>
        </div>
      </div>
      <div className="w-full flex flex-col justify-start items-center ">
        <div className="text-2xl pt-6 w-full text-center font-medium">
          Expense Information
        </div>
        <div className="bg-black w-full h-full p-10">
          <div></div>
          <LabelInputContainer className="mb-6">
            <Label htmlFor="debt">Any debt?</Label>
            <Input
              placeholder="eg. 5000/month for 2 years"
              type="text"
              name="debt"
              value={formData.debt}
              onChange={handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-6">
            <Label htmlFor="totalExpense">Total Expense</Label>
            <Textarea
              placeholder="Enter"
              name="totalExpense"
              value={formData.totalExpense}
              onChange={handleChange}
              className="text-black"
            />
          </LabelInputContainer>

        </div>
      </div>
      {/* <div>
        <LabelInputContainer className="mb-4">
          
         
      {/* 
          
          */}
      {/* */}
      {/* 
          
        </LabelInputContainer>
      </div>
      <div>
       
      </div> */}
    </div>
  );
};

export default AccountInfo;

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

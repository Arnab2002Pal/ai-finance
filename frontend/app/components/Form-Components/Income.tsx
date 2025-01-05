import React, { useState } from 'react'
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";


const Income: React.FC<{ setFormData: (formData: any) => void }> = ({ setFormData }) => {
    const [age, setAge] = useState<number | undefined>(undefined);
    const [occupation, setOccupation] = useState("");
    const [monthly_income, setMonthly_income] = useState<number | undefined>(undefined);

    return (
        <div className="grid w-full max-w-sm items-center gap-4 ">
            {/* Age Field */}
            <div className="flex flex-col gap-1">
                <Label htmlFor="age" className="text-xl font-semibold ">
                    Your Age
                </Label>
                <Input
                    type="number"
                    id="age"
                    name='age'
                    value={age || ""}
                    placeholder="Enter your age"
                    // onChange={handleEvent}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  shadow-lg"
                />
            </div>

            {/* Occupation Field */}
            <div className="flex flex-col gap-1">
                <Label htmlFor="occupation" className="text-xl font-semibold">
                    Occupation
                </Label>
                <Input
                    type="text"
                    id="occupation"
                    name="occupation"
                    value={occupation || ""}
                    // onChange={handleEvent}
                    placeholder="What is your occupation?"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  shadow-lg"
                />
            </div>

            {/* Monthly Income Field */}
            <div className="flex flex-col gap-1">
                <Label htmlFor="monthly_income" className="text-xl font-semibold">
                    Monthly Income
                </Label>
                <Input
                    type="number"
                    id="monthly_income"
                    name="monthly_income"
                    value={monthly_income}
                    // onChange={handleEvent}
                    placeholder="Enter your monthly net income"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  shadow-lg"
                />
            </div>
        </div>
    );
}


export default Income;
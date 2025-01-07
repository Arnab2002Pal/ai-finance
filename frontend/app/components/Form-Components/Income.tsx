import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const Income: React.FC<{
    formData: {
        age: number,
        occupation: string,
        monthly_income: number,
    }, handleFormData: (type: string, key:string ,value: string | number | undefined) => void
}> = ({ formData, handleFormData }) => {
    const [occupation, setOccupation] = useState(formData.occupation || "");
    const [monthly_income, setMonthlyIncome] = useState<number | undefined>(formData.monthly_income || undefined);
    const [age, setAge] = useState<number | undefined>(formData.age || undefined);

    // Age input handler
    const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, type, value} = e.target
        
        const newAge = Number(value);
        setAge(newAge);

        handleFormData(type, id, newAge);
    };

    // Occupation input handler
    const handleOccupationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, type, value } = e.target
        // console.log(id, type, value);
        
        setOccupation(value);
        handleFormData(type, id, value)
    };

    // Monthly Income input handler
    const handleMonthlyIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, type, value } = e.target
        const newMonthlyIncome = Number(value)

        setMonthlyIncome(newMonthlyIncome);
        handleFormData(type, id, newMonthlyIncome)
    };

    return (
        <div className="grid w-full max-w-sm items-center gap-4">
            {/* Age Field */}
            <div className="flex flex-col gap-1">
                <Label htmlFor="age" className="text-md md:text-xl font-semibold">
                    Your Age
                </Label>
                <Input
                    type="number"
                    id="age"
                    value={age || ""}
                    placeholder="Enter your age"
                    onChange={handleAgeChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
                />
            </div>

            {/* Occupation Field */}
            <div className="flex flex-col gap-1">
                <Label htmlFor="occupation" className="text-md md:text-xl font-semibold">
                    Occupation
                </Label>
                <Input
                    type="text"
                    id="occupation"
                    value={occupation}
                    placeholder="What is your occupation?"
                    onChange={handleOccupationChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
                />
            </div>

            {/* Monthly Income Field */}
            <div className="flex flex-col gap-1">
                <Label htmlFor="monthly_income" className="text-md md:text-xl font-semibold">
                    Monthly Income
                </Label>
                <Input
                    type="number"
                    id="monthly_income"
                    value={monthly_income || ""}
                    placeholder="Enter your monthly net income"
                    onChange={handleMonthlyIncomeChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
                />
            </div>
        </div>
    );
};


export default Income;
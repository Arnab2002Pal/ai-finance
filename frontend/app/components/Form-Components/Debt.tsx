import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { useState } from "react";

export function Debt({ formData, handleFormData }: {
    formData: { monthly_debt: number; total_remaining_debt: number },
    handleFormData: (key: string, value: number) => void
}) {
    const [monthly_debt , set_monthly_debt] = useState(formData.monthly_debt);
    const [total_remaining_debt, set_total_remaining_debt] = useState(formData.total_remaining_debt);

    const handleDebtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value } = e.target;
        const newValue = Number(value)
        id === "monthly_debt" ? set_monthly_debt(newValue) : set_total_remaining_debt(newValue)
        
        handleFormData(id, newValue);
    };
    return (
        <div className="grid w-full max-w-sm items-center gap-4">
            {/* Age Field */}
            <div className="flex flex-col gap-1">
                <Label htmlFor="monthly_debt" className="text-md md:text-xl font-semibold ">
                    Monthly Debt
                </Label>
                <Input
                    type="number"
                    id="monthly_debt"
                    value={monthly_debt || ""}
                    onChange={handleDebtChange}
                    placeholder="Excluding General Expenses"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  shadow-lg"
                />
            </div>

            {/* Monthly Income Field */}
            <div className="flex flex-col gap-1">
                <Label htmlFor="total_remaining_debt" className="text-md md:text-xl font-semibold">
                    Total Remaining Debt
                </Label>
                <Input
                    type="number"
                    id="total_remaining_debt"
                    value={total_remaining_debt || ""}
                    onChange={handleDebtChange}
                    placeholder="Enter total remaining debt needed to pay"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  shadow-lg"
                />
            </div>
        </div>
    );
}

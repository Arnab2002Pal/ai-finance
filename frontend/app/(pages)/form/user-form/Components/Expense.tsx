import { Label } from "@radix-ui/react-label";
import { Input } from "../../../../components/ui/input";
import { useState } from "react";

export default function Expense({ formData, handleFormData }: { formData: number | undefined, handleFormData: (data: number) => void }) {
    const [expense, setExpense] = useState(formData || "");

    const handle_change_event = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);
        setExpense(newValue)
        handleFormData(newValue)
    }

    return (
        <div className="grid w-full max-w-sm items-center gap-4">
            {/* Expense Field */}
            <div className="flex flex-col gap-1">
                <Label htmlFor="monthly_expense" className="text-md md:text-xl font-semibold ">
                    Monthly Expense
                </Label>
                <Input
                    type="number"
                    id="monthly_expense"
                    value={expense}
                    placeholder="Excluding debt payments"
                    onChange={handle_change_event}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  shadow-lg"
                />
            </div>
        </div>
    );
}


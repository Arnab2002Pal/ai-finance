import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";

export function Expense() {
    return (
        <div className="grid w-full max-w-sm items-center gap-4">
            {/* Expense Field */}
            <div className="flex flex-col gap-1">
                <Label htmlFor="monthly_expense" className="text-xl font-semibold ">
                    Monthly Expense
                </Label>
                <Input
                    type="number"
                    id="monthly_expense"
                    placeholder="Excluding debt payments"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  shadow-lg"
                />
            </div>
        </div>
    );
}

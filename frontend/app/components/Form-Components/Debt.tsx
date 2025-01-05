import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";

export function Debt() {
    return (
        <div className="grid w-full max-w-sm items-center gap-4">
            {/* Age Field */}
            <div className="flex flex-col gap-1">
                <Label htmlFor="monthly_debt" className="text-xl font-semibold ">
                    Monthly Debt
                </Label>
                <Input
                    type="number"
                    id="monthly_debt"
                    placeholder="Excluding General Expenses"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  shadow-lg"
                />
            </div>

            {/* Monthly Income Field */}
            <div className="flex flex-col gap-1">
                <Label htmlFor="total_remaining_debt" className="text-xl font-semibold">
                    Total Remaining Debt
                </Label>
                <Input
                    type="number"
                    id="total_remaining_debt"
                    placeholder="Enter total remaining debt needed to pay"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  shadow-lg"
                />
            </div>
        </div>
    );
}

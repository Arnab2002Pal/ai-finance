import { Label } from "@radix-ui/react-label";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";

export function Saving() {
    return (
        <div className="grid w-full max-w-sm items-center gap-4">
            {/* Expense Field */}
            <div className="flex flex-col gap-1">
                <Label htmlFor="current_amount_savings" className="text-xl font-medium">
                    How much have you saved till now?
                </Label>
                <Textarea
                    id="current_amount_savings"
                    placeholder="Example: 20,000 in Stocks and 10,000 in Cash."
                    className="px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-[80px] max-h-[200px]  shadow-lg"
                />
            </div>
        </div>
    );
}

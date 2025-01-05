import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { priorities } from "@/app/utils/lists";
import { cn } from "@/app/lib/utils";

export function Priority() {
    // State to manage priorities and checkbox
    const [check, setCheck] = useState(false);
    const [prioritiesState, setPrioritiesState] = useState<Record<string, { level: string; description: string }>>({
        first: { level: "", description: "" },
        second: { level: "", description: "" },
        third: { level: "", description: "" },
    });

    // Handlers for Select fields
    const handlePriorityChange = (key: string, field: string, value: string) => {
        setPrioritiesState((prev: any) => ({
            ...prev,
            [key]: {
                ...prev[key],
                [field]: value,
            },
        }));        
    };
    
    // Checkbox toggle handler
    const handleCheckbox = () => setCheck(!check);

    return (
        <div className="grid w-full max-w-lg items-center gap-4">
            <Label htmlFor="monthly_expense" className="text-xl font-medium">
                Set Your Priorities
            </Label>

            {["first", "second", "third"].map((key, index) => (
                <div key={key} className="flex flex-row gap-2 justify-start items-center">
                    {/* Select Field */}
                    <Select
                        onValueChange={(value) => handlePriorityChange(key, "level", value)}
                        disabled={check}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a Level" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {priorities.map((priority) => (
                                    <SelectItem key={priority} value={priority}>
                                        {priority}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    {/* Input Field */}
                    <Input
                        type="text"
                        placeholder="Excluding debt payments"
                        disabled={check}
                        className={`px-4 py-2 border text-black  shadow-lg border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${check ? "bg-gray-200 cursor-not-allowed" : ""
                            }`}
                        value={prioritiesState[key].description}
                        onChange={(e) => handlePriorityChange(key, "description", e.target.value)}
                    />
                </div>
            ))}

            {/* Checkbox Field */}
            <div className="flex items-center space-x-2">
                <Checkbox id="terms" checked={check} onCheckedChange={handleCheckbox} />
                <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Check in case you are not sure what to prioritize.
                </label>
            </div>
        </div>
    );
}

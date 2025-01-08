import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { priorities } from "@/app/utils/lists";

export default function Priority({ formData, checked, handleFormData, handleCheckStatus }: {
    formData: Record<string, { level: string; description: string }>;
    checked: boolean;
    handleFormData: (value: Record<string, { level: string; description: string }>) => void;
    handleCheckStatus: (value: boolean) => void;
}) {
    // State to manage priorities and checkbox
    const [check, setCheck] = useState<boolean>(checked || false);
    const [prioritiesState, setPrioritiesState] = useState<Record<string, { level: string; description: string }>>({
        first: { level: formData.first.level || "", description: formData.first.description || "" },
        second: { level: formData.second.level || "", description: formData.second.description || "" },
        third: { level: formData.third.level || "", description: formData.third.description || "" },
    });

    // Trigger them only after the state changes.
    useEffect(() => {
        handleCheckStatus(check);
    }, [check, handleCheckStatus]);

    useEffect(() => {
        handleFormData(prioritiesState);
    }, [prioritiesState, handleFormData]);

    // Handlers for Select fields
    const handlePriorityChange = (key: string, field: string, value: string) => {
        setPrioritiesState((prev) => ({
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
        <div className="grid w-full items-center gap-4 h-64 md:h-none overflow-auto">
            <Label htmlFor="monthly_expense" className="text-md md:text-xl font-medium">
                Set Your Priorities
            </Label>

            {["first", "second", "third"].map((key) => (
                <div key={key} className="flex flex-col md:flex-row gap-2 justify-start items-center">
                    {/* Select Field */}
                    <Select
                        onValueChange={(value) => handlePriorityChange(key, "level", value)}
                        disabled={check}
                    >
                        <SelectTrigger className="w-full md:w-[180px]">
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
                    <div className="w-full md:w-2/3">
                        <Input
                            type="text"
                            placeholder="Excluding debt payments"
                            disabled={check}
                            className={`px-4 py-2 border text-black shadow-lg border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${check ? "bg-gray-200 cursor-default" : ""
                                }`}
                            value={prioritiesState[key].description}
                            onChange={(e) => handlePriorityChange(key, "description", e.target.value)}
                        />

                    </div>
                </div>
            ))}

            {/* Checkbox Field */}
            <div className="flex items-center space-x-2">
                <Checkbox id="priority_state" checked={check} onCheckedChange={handleCheckbox} />
                <label
                    htmlFor="priority_state"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Check in case you are not sure what to prioritize.
                </label>
            </div>
        </div>
    );
}

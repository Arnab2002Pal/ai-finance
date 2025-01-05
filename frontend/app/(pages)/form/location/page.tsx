"use client";
import { Label } from "../../../components/ui/label";
import { cn } from "@/app/lib/utils";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../components/ui/select"
import { locations } from "@/app/utils/lists";


export default function Location({ handleChange }: any) {
    const handleLocation = (value: string) => {
        handleChange({ target: { name: "location", value } });
    }

    return (
        <div className=" ">
            <div className="mt-7">
                <LabelInputContainer className="mb-4 flex justify-center items-center">
                    <Label htmlFor="location" className="text-md mb-2">Where are you from?</Label>
                    <Select onValueChange={handleLocation}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a Location" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {locations.map(location =>
                                    <SelectItem key={location} value={location}>
                                        {location}
                                    </SelectItem>
                                )}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </LabelInputContainer>
            </div>
        </div>
    );
}


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

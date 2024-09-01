"use client";
import React, { useState } from "react";
import { Label } from "../../../components/ui/label";
import { cn } from "@/lib/utils";
import { useRouter } from 'next/navigation';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../../../components/ui/select"
import { locations } from "@/app/util/location";


export default function Location({ formData, handleChange }:any) {
    const handleLocation = (value: string) => {        
        handleChange({ target: { name: "location", value } });
    }

    return (
        <div className="">

            <div className="mt-7">
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="location">Where are you from?</Label>
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
                <div className="bg-gradient-to-r from-transparent via-neutral-300 to-transparent my-8 h-[1px] w-full" />

                <div className="flex flex-col space-y-4">



                </div>
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

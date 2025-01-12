import { LocationInfo } from "@/app/interface/userInterface";
import { locations } from "@/app/utils/lists";
import React, { useState } from "react";

const Location: React.FC<{ formData: LocationInfo['country'], handleFormData: (formData: any) => void }> = ({ formData, handleFormData }) => {
    const [inputValue, setInputValue] = useState(formData ||"");
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        handleFormData(value)
        // Update formData.locationInfo.location
        

        if (value.length > 0) {
            const filtered = locations.filter((location) =>
                location.toLowerCase().startsWith(value.toLowerCase())
            );
            setFilteredSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    // Handle suggestion click
    const handleSuggestionClick = (suggestion: string) => {
        setInputValue(suggestion);

        // Update formData.locationInfo.location
        handleFormData(suggestion);
        setShowSuggestions(false);
    };

    return (
        <div className="relative w-full max-w-sm text-black">
            <label htmlFor="location" className="text-white text-md md:text-xl font-semibold ">Select Country:</label>
            <input
                id="location"
                type="text"
                className="w-full px-4 py-2  border mt-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-lg"
                value={inputValue}
                onChange={handleChange}
                placeholder="Type to search..."
            />
            {showSuggestions && (
                <ul className="absolute w-full max-h-52 bg-white border border-gray-300 rounded-md mt-1 shadow-lg overflow-y-auto">
                    {filteredSuggestions.length > 0 ? (
                        filteredSuggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                {suggestion}
                            </li>
                        ))
                    ) : (
                        <li className="px-4 py-2 text-gray-500">No suggestions found</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default Location;

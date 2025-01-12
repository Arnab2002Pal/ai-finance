import React, { useEffect, useState } from 'react'
import { Label } from '../../../../components/ui/label'
import { Input } from '../../../../components/ui/input'

const Goals = ({ formData, handleFormData }: {
    formData: {
        short_term: string,
        long_term: string,
    },
    handleFormData: (id: string, value: string) => void
}) => {
    const [shortTerm, setShortTerm] = useState<string>(formData.short_term || "")
    const [longTerm, setlongTerm] = useState<string>(formData.long_term || "")

    // Sync local state with parent state
    useEffect(() => {
        handleFormData('short_term', shortTerm);
    }, [handleFormData, shortTerm]);

    useEffect(() => {
        handleFormData('long_term', longTerm);
    }, [handleFormData, longTerm]);

    const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        id === 'short_term' ? setShortTerm(value) : setlongTerm(value);
    };

    return (
        <div className='w-full flex flex-col gap-3 '>
            <div className="flex flex-col gap-1">
                <Label htmlFor="short_term" className="text-md md:text-xl font-semibold text-white">
                    Any short term goal?
                </Label>
                <Input
                    type="text"
                    id="short_term"
                    value={shortTerm}
                    onChange={handleFormDataChange}
                    placeholder="Example: Planning vacation or buying a bike, etc."
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Monthly Income Field */}
            <div className="flex flex-col gap-1">
                <Label htmlFor="long_term" className="text-md md:text-xl font-semibold text-white">
                    Any long term goal?
                </Label>
                <Input
                    type="text"
                    id="long_term"
                    value={longTerm}
                    onChange={handleFormDataChange}
                    placeholder="Saving for Retirement, down payment on a house, child's education, etc."
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <span className='text-xs md:text-sm'>Note* : Incase you are not sure about your goals, keep it empty.</span>
        </div>
    )
}

export default Goals
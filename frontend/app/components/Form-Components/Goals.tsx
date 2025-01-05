import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

const Goals = () => {
    // vacation, buying bike
    // retirement, down payment on a house, child's education
    return (
        <div className='w-full flex flex-col gap-3 '>
            <div className="flex flex-col gap-1">
                <Label htmlFor="short_term" className="text-xl font-semibold text-white">
                    Any short term goal?
                </Label>
                <Input
                    type="text"
                    id="short_term"
                    placeholder="Example: Planning vacation or buying a bike, etc."
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Monthly Income Field */}
            <div className="flex flex-col gap-1">
                <Label htmlFor="long_term" className="text-xl  font-semibold text-white">
                    Any long term goal?
                </Label>
                <Input
                    type="text"
                    id="long_term"
                    placeholder="Saving for Retirement, down payment on a house, child's education, etc."
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <span className='text-sm'>Note* : Incase you are not sure about your goals, keep it empty.</span>
        </div>
    )
}

export default Goals
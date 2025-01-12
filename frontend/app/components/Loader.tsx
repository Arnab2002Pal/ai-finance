"use client"
import React, { useEffect, useState } from 'react'
import PulseLoader from "react-spinners/PulseLoader";
import HashLoader from "react-spinners/HashLoader";

const lines = [
    "Thinking... even AI needs a moment!",
    "Loading wisdom... Good things take time!",
    "Our AI is in deep thought… just like you before payday!",
    "AI is thinking hard… that's a lot of zeros to count!",
    "Our AI is cooking up something smart... Hold tight!"
]


const Loading: React.FC = () => {
    return (
        <div>
            <PulseLoader
                color="#00d36b"
                margin={5}
                size={10}
                speedMultiplier={1}
            />
        </div>
    )
}


const AILoading: React.FC = () => {
    const [loadingText, setLoadingText] = useState<string>("");

    // Generate a random line on component mount
    useEffect(() => {
        const generateRandom = (lines: string[]): string => {
            return lines[Math.floor(Math.random() * lines.length)];
        };
        setLoadingText(generateRandom(lines));
    }, []);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <div className="">
                {/* Loader */}
                <div className='flex items-center justify-center'>
                    <HashLoader
                        color="#ffffff"
                        size={50}
                    />
                </div>
                <div>
                    {/* Loading Text */}
                    <p className="mt-4 text-lg font-medium text-white">
                        {loadingText}
                    </p>

                </div>
            </div>
        </div>
    );
};

export {
    Loading,
    AILoading
}

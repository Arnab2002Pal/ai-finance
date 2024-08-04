"use client";
import { TypewriterEffect } from "./ui/typewriter-effect";

export function HeroTitle() {
    const words = [
        {
            text: "AI-Powered",
        },
        {
            text: "Decisions, ",
        },
        {
            text: "Wealthier ",
        },
        {
            text: "Outcomes.",
            className: "text-yellow-500",
        },
    ];
    return (
        <div className="flex flex-col items-center justify-center h-[35rem] ">
            <p className="text-neutral-200 text-xl mb-3">
                The road to freedom starts from here...
            </p>
            <TypewriterEffect words={words} />
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
                <button className="w-40 h-10 rounded-xl bg-black border border-white border-transparent text-white text-sm">
                    Join now
                </button>
                <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
                    Signin
                </button>
            </div>
        </div>
    );
}

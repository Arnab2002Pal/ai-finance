"use client";
import { TypewriterEffect } from "./ui/typewriter-effect";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function HeroTitle() {
  const router = useRouter();

  const words = [
    { text: "AI-Powered" },
    { text: "Decisions," },
    { text: "Wealthier" },
    { text: "Outcomes.", className: "text-yellow-500" },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-[35rem] p-4">
      <p className="text-neutral-200 text-lg md:text-xl mb-3 text-center">
        The road to freedom starts from here...
      </p>
      <TypewriterEffect words={words} />
      <div className="mt-5 flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 items-center">
        <button
          onClick={() => router.push("/signup")}
          className="w-40 h-10 rounded-xl bg-black border border-white text-white text-sm"
        >
          Join now
        </button>
        <button
          onClick={() => signIn()}
          className="w-40 h-10 rounded-xl bg-white text-black border border-black text-sm"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

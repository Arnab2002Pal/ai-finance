"use client";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import {
    IconBrandGoogle,
} from "@tabler/icons-react";
import Link from "next/link";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';


export default function SignInForm() {
    const router = useRouter()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleCredentialSignIn = async (e: any) => {
        e.preventDefault();
        console.log(email, password);
        
        const result = await signIn('credentials', {
            email,
            password,
            redirect: false
        });
        if (result?.ok) {
            router.push('/');
        } else {
            console.error('Sign-in error', result?.error);
        }
    };

    return (
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black border-gray-700 border-2">
            <h2 className="font-bold text-xl text-neutral-200">
                Welcome to Vault
            </h2>
            <p className="text-sm max-w-sm mt-2 text-neutral-300">
                Login yourself to access your Vault
            </p>

            <form className="mt-7" onSubmit={handleCredentialSignIn}>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        id="email"
                        placeholder="projectmayhem@fc.com"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        placeholder="••••••••"
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </LabelInputContainer>

                <button
                    className="bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="submit"
                >
                    Sign In &rarr;
                    <BottomGradient />
                </button>

                <div className="pt-4 text-sm font-light text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Don't have an account? <span className="font-semibold"><Link href="/signup">Register</Link></span>
                </div>

                <div className="bg-gradient-to-r from-transparent via-neutral-300 to-transparent my-8 h-[1px] w-full" />

                <div className="flex flex-col space-y-4">

                    <button
                        onClick={() => signIn('google', { callbackUrl: 'http://localhost:3000/home' })}
                        className="relative group/btn flex items-center justify-center space-x-2 px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-zinc-900 shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                        type="submit"
                    >
                        <IconBrandGoogle className="h-4 w-4 text-neutral-300 flex" />
                        <span className="text-neutral-300 text-sm">Google</span>
                        <BottomGradient />
                    </button>

                </div>
            </form>
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

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

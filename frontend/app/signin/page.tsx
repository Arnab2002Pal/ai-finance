"use client"
import SignInForm from '../components/signin-form';


const SignIn = () => {
    

    return (
        <div className='flex flex-col justify-center items-center min-h-screen'>
            <SignInForm/>
        </div>
        // <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        //     <div className="max-w-md w-full space-y-8">
        //         <div>
        //             <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        //         </div>
        //         <form className="mt-8 space-y-6" onSubmit={handleCredentialSignIn}>
        //             <div className="rounded-md shadow-sm -space-y-px">
        //                 <div>
        //                     <label htmlFor="username" className="sr-only">Email address</label>
        //                     <input
        //                         id="username"
        //                         name="username"
        //                         type="text"
        //                         autoComplete="username"
        //                         required
        //                         value={username}
        //                         onChange={(e) => setUsername(e.target.value)}
        //                         className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        //                         placeholder="Email address"
        //                     />
        //                 </div>
        //                 <div>
        //                     <label htmlFor="password" className="sr-only">Password</label>
        //                     <input
        //                         id="password"
        //                         name="password"
        //                         type="password"
        //                         autoComplete="current-password"
        //                         required
        //                         value={password}
        //                         onChange={(e) => setPassword(e.target.value)}
        //                         className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        //                         placeholder="Password"
        //                     />
        //                 </div>
        //             </div>

        //             <div>
        //                 <button
        //                     type="submit"
        //                     className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        //                 >
        //                     Sign in
        //                 </button>
        //             </div>
        //         </form>
        //         <div className="mt-6">
        //             <div className="relative">
        //                 <div className="absolute inset-0 flex items-center">
        //                     <div className="w-full border-t border-gray-300" />
        //                 </div>
        //                 <div className="relative flex justify-center text-sm">
        //                     <span className="px-2 bg-white text-gray-500">Or continue with</span>
        //                 </div>
        //             </div>
        //             <div className="mt-6 grid grid-cols-1 gap-3">
        //                 <div>
        //                     <button
        //                         onClick={() => signIn('google', { callbackUrl: 'http://localhost:3000/home' })}
        //                         className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        //                     >
        //                         <span className="">Sign in with Google</span>
        //                     </button>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
};

export default SignIn;

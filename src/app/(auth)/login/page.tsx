"use client"

import { SignInResponse, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { ReactNode, useState } from "react";

function Login() { 
  
  const [result, setResult] = useState<SignInResponse | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const router = useRouter();

  async function handleSubmit(e : React.FormEvent<HTMLFormElement>) {
   e.preventDefault();   

    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

   try {    
    setLoading(true);
    setError(null);
    const signInResponse =  await signIn("credentials", { email: email, password: password, redirect: false, callbackUrl: "/" });
    if(signInResponse === undefined){throw new Error("Error with sign in, Try again")}    
    setResult(signInResponse);
    if(signInResponse.ok && signInResponse?.url){
     router.push(signInResponse.url);
    } 
   }catch (error: any) {
    setError(error);
   }finally{
     setLoading(false);
   }  
   
  }


  return (    
  <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">    
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <img
      className="mx-auto h-10 w-auto"
      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
      alt="Your Company"
    />
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
      Sign in to your account
    </h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form onSubmit={handleSubmit} className="space-y-6" >
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
          Email address
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
            Password
          </label>
          <div className="text-sm">
            <a href="#" className="font-semibold text-red-600 hover:text-red-500">
              Forgot password?
            </a>
          </div>
        </div>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
          Sign in
        </button>
      </div>
    </form>
    {      error && <div className="text-red-500">{error}</div>     } 
    {      loading && <div className="text-green-500">Loading...</div>    } 
    {      result?.error && <div className="text-red-500">{result?.error}</div>    }  
  </div>
</div>);
}

export default Login;

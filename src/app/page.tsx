"use client";

import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react"

export default function Home() {
  const { data: session, status } = useSession();  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hello, world!
      {status === "authenticated" && (
        <div className="flex flex-col items-center justify-center">          
          <h1 className="text-2xl font-bold">{session.user.fullname}</h1>
          <p className="text-gray-500">{session.user.email}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      )}
      {
        status === "unauthenticated" && (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">You are not logged in</h1>
            <button onClick={() => signIn()}>Sign in</button>
          </div>
        )
      }
      
    </main>
  );
}

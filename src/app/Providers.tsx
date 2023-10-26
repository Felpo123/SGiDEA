"use client";
import { SessionProvider } from "next-auth/react";
import { ToastProvider } from "@/components/toaster-provider";

interface Props {
  children: React.ReactNode;
}

function Providers({ children }: Props) {
  return (
    <SessionProvider>
      <ToastProvider />
      {children}
    </SessionProvider>
  );
}

export default Providers;

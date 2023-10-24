"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { signOut } from "next-auth/react";
import { authRoutes } from "@/routes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { LogOut } from "lucide-react";
import MobileSidebar from "./mobile-sidebar";

function Navbar() {
  return (
    <div className="p-4 border-b-2 h-full flex items-center bg-white shadow-sm">
      <MobileSidebar />
      <div className="flex gap-x-2 ml-auto">
        <Link href={authRoutes.signIn}>
          <Button onClick={() => signOut({ callbackUrl: authRoutes.signIn })}>
            <LogOut className="h-4 w-4 mr-2" />
            Salir
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;

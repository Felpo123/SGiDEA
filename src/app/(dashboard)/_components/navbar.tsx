"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { signOut } from "next-auth/react";
import { appRoutes, authRoutes } from "@/routes";

function Navbar() {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <div className="flex gap-x-2 ml-auto">
        <Button onClick={() => signOut({ callbackUrl: authRoutes.signIn })}>
          Salir
        </Button>
      </div>
    </div>
  );
}

export default Navbar;

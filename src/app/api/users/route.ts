import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try{
        const users = await prisma.users.findMany({where: {flag: true}})
        return NextResponse.json(users);

    }catch(e){
        if(e instanceof Error){
            return NextResponse.json(
                {
                    message: e.message,
                },
                {
                    status: 500,
                }
            );
        }
    }

    
}


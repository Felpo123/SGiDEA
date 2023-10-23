import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try{
        const objects = await prisma.users.findMany({where: {flag: true}})
        return NextResponse.json(objects);

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


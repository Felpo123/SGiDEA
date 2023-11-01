import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
    params: { id: string }
}

export async function GET(request:Request,{params}:Params){
    try{
       const assignment = await prisma.assignments.findMany({where: {user_id: parseInt(params.id), flag: true},  include: {users: true, objects: true}})
        return NextResponse.json(assignment);
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
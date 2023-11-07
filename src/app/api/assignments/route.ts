import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){
    const objects = await prisma.assignments.findMany({ include: {users: true, objects: true}})
    return NextResponse.json(objects);
}

export async function POST(request:Request){
    const { end_date, description, user_id, object_sku } = await request.json();

    try{
        const newAssignment = await prisma.assignments.create({
            data: {
                end_date,
                description,
                user_id,
                object_sku
            }
        })
        return NextResponse.json(newAssignment);
        
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
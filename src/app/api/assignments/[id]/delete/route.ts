import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
    params: { id: string }
}

export async function PUT(request:Request,{params}:Params){
    try{
       const assignment = await prisma.assignments.update({where: {id: parseInt(params.id)}, data: {flag: false}})
       if(assignment){
        const object = await prisma.objects.update({where: {sku: assignment.object_sku}, data: {quantity: {increment:1}}})       
       }
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
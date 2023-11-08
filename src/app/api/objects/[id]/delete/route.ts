import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
    params: { id: string }
}

export async function PUT(request:Request,{params}:Params){
    try{
       const object = await prisma.objects.update({where: {sku: params.id}, data: {flag: false}})
        return NextResponse.json(object);
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
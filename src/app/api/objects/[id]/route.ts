import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";



interface Params {
    params: { id: string }

}    

export async function GET(request:Request,{params}:Params){
    try{
       const object = await prisma.objects.findUnique({where: {sku: params.id, flag: true}})
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



export async function PUT(request:Request,{params}:Params){
    try{
        const {name, quantity, flag , states_id, categories_id, general_location_id, specific_location_id} = await request.json();
        const updatedObject = await prisma.objects.update({
            where: {sku: params.id},
            data: {
                name,
                quantity,
                flag,
                states_id,
                categories_id,
                specific_location_id
            }
        })
        return NextResponse.json(updatedObject)

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
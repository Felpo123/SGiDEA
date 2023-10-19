import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET(){
    try{
        const objects = await prisma.objects.findMany({where: {flag: true}})
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

export async function POST(request:Request){
    const {sku, name, quantity,  states_id, categories_id, general_location_id, specific_location_id} = await request.json();
    try{
        const newObject = await prisma.objects.create({
            data: {
                sku,
                name,
                quantity,
                states_id,
                categories_id,
                general_location_id,
                specific_location_id
            }
        })
        return NextResponse.json(newObject);
        
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
    

    
  


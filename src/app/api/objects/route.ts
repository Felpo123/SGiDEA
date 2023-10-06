import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(){
    const objects = await prisma.object.findMany()
    return NextResponse.json(objects);
}

export async function POST(request:Request){
    const {sku, name, quantity, flag , states_id, categories_id, general_location_id, specific_location_id} = await request.json();
    try{
        const newObject = await prisma.object.create({
            data: {
                sku,
                name,
                quantity,
                flag,
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
    

    
  


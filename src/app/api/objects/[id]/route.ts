import { specificLocation } from './../../../../constants/specific-location';
import { categories } from '@/constants/categories';
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
        const {name, quantity, state, category, specific_location} = await request.json();

        const state_record = await prisma.states.findUnique({where: {name: state}})
        const category_record = await prisma.categories.findUnique({where: {name: category}})
        const specific_location_record = await prisma.specificLocations.findFirst({where: {name: specific_location}})
        
        const updatedObject = await prisma.objects.update({
            where: {sku: params.id},
            data: {
                name,
                quantity,             
                states_id: state_record?.id,
                categories_id: category_record?.id,
                specific_location_id: specific_location_record?.id
            }
        })
        return NextResponse.json(updatedObject)

    }catch(e){
        if(e instanceof Error){
            console.log(e.message)
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
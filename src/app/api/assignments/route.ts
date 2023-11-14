import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { endAssignment } from "@/services/assignments.service";

export async function GET(){
    const objects = await prisma.assignments.findMany({ include: {users: true, objects: true}, orderBy: [ { flag: 'desc' }]})
    return NextResponse.json(objects);
}

export async function POST(request:Request){
    const { end_date, description, user_id, object_sku } = await request.json();
    
    try{
        const object = await prisma.objects.findUnique({where: {sku: object_sku}})
        if(object?.flag === true && object?.quantity > 0){
        const newAssignment = await prisma.assignments.create({
            data: {
                end_date,
                description,
                user_id,
                object_sku
            }
        })
        const object = await prisma.objects.update({where: {sku: object_sku}, data: {quantity: {decrement:1}}})
        console.log(newAssignment.end_date)
        endAssignment(newAssignment.end_date, newAssignment.id, object_sku)   
        return NextResponse.json(newAssignment);
        }
        return NextResponse.json({message: "Object not found or is inactive"}, {status: 404})
             
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
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"

interface Params {
    params: { id: number }

}

export async function PATCH(request:Request,{params}:Params) {

    try{
        const disabledUser = await prisma.users.update({
            where: {id: params.id},
            data: {
                flag: false
            }
        })
        return NextResponse.json(disabledUser)

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
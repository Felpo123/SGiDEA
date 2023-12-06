import { prisma } from "@/lib/prisma";
import schedule from "node-schedule";

export async function endAssignment(date:Date, id:number, sku:string){
    const assignment = await prisma.assignments.findUnique({where: {id:id,end_date: date, flag: true}})   
    
    if(assignment){
        const job = schedule.scheduleJob(date, async function(){
            console.log("Assignment ended")
            const object = await prisma.objects.update({where: {sku: sku}, data: {quantity: {increment:1}}})
            const assignment = await prisma.assignments.update({where: {id: id}, data: {flag: false}})
            
        })
    }

}
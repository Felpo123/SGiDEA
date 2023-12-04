import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET() {
  try {
    const today = new Date();
    const countObjects = await prisma.objects.count({where: { flag: true }});
    const countAssignments = await prisma.assignments.count({where: { flag: true }});
    const recentObjects = await prisma.objects.findMany({
        take:5,
        where: { flag: true},
        include: {specific_location: true, category:{select: {name: true}}},
        orderBy: [{ created_at: "desc" }]
    });
    const expiredAssignments = await prisma.assignments.findMany({
      take: 5,
      where: { end_date: { lt: today},flag: false},
      include: { users: {include: {credentials: {select: {email: true}}}}, objects: true},
      orderBy: [{ end_date: "desc" }],
    });
    
    return NextResponse.json({countObjects,countAssignments,recentObjects,expiredAssignments});
  } catch (e) {
    if (e instanceof Error) {
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

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: { id: number };
}

export async function PUT(request: Request, { params }: Params) {
  const { id } = params;
  try {
    const user = await prisma.users.update({
      where: { id: Number(id) },
      data: { flag: false },
    });
    console.log(user);
    return NextResponse.json(user);
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
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

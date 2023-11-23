import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.users.findMany({
      orderBy: [{ flag: "desc" }, { id: "desc" }],
    });
    return NextResponse.json(users);
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

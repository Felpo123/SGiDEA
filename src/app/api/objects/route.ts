import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const objects = await prisma.objects.findMany({ where: { flag: true } });
    return NextResponse.json(objects);
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

export async function POST(request: Request) {
  const { values, general_location_id, specific_location_id } =
    await request.json();
  const {
    sku,
    name,
    quantity,
    state: states_id,
    category: categories_id,
  } = values;
  try {
    const newObject = await prisma.objects.create({
      data: {
        sku,
        name,
        quantity,
        category: {
          connect: { name: categories_id },
        },
        states: {
          connect: { name: states_id },
        },
        general_location: {
          connect: { id: 1 },
        },
        specific_location: { connect: { id: 1 } },
      },
    });
    return NextResponse.json(newObject);
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

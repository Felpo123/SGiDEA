import { signup } from "@/services/auth.service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, lastname, photo, roles_id, email, password } =
      await request.json();
    console.log(name, lastname, photo, roles_id, email, password);
    const registerUser = await signup({
      name,
      lastname,
      photo,
      roles_id,
      email,
      password,
    });

    return NextResponse.json(registerUser);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}

import { upload } from "@/lib/upload";
import { signup } from "@/services/auth.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const photo = data.get("photo") ;
    
    if(photo === "df-user.webp"){
      const registerUser = await signup({
          name: data.get("name") as string,
          lastname: data.get("lastname") as string,
          photo: "df-user.webp",
          roles_id: Number(data.get("roles_id")),
          email: data.get("email") as string,
          password: data.get("password") as string,
        });
    
        return NextResponse.json(registerUser);
    }
    const userPhoto = photo as File;
    const uploadPhoto = await upload(userPhoto);

    if (!uploadPhoto) {
      throw new Error("Error al subir la imagen");
    }
   
    const registerUser = await signup({
      name: data.get("name") as string,
      lastname: data.get("lastname") as string,
      photo: userPhoto.name,
      roles_id: Number(data.get("roles_id")),
      email: data.get("email") as string,
      password: data.get("password") as string,
    });

    return NextResponse.json(registerUser);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
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

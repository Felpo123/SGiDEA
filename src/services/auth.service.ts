import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { Credentials, RegistrationData, User } from "next-auth";

export async function login(credentials: Credentials): Promise<User>{
  const { email, password } = credentials;

  const userFound = await prisma.users.findFirst({
    select: {
      id: true,
      name: true,
      lastname: true,
      photo: true,
      credentials: {
        select: {
          email: true,
          password: true,
        },
      },
      roles: {
        select: {
          type: true,
        },
      },
    },
    where: {
      credentials: {
        email,
      },
    },
  });

  if (!userFound) {
    throw new Error("Invalid credentials");
  }

  const passwordMatch = bcrypt.compareSync(
    password,
    userFound.credentials.password
  );

  if (!passwordMatch) {
    throw new Error("Invalid credentials");
  }

  return {
    id: userFound.id,
    fullname: `${userFound.name} ${userFound.lastname}`,
    photo: userFound.photo,
    email: userFound.credentials.email,
    role: userFound.roles.type,
  };
}

export async function signup(user: RegistrationData) {
  const { name, lastname, photo, roles_id, email, password } = user;

  const emailAlreadyExists = await prisma.credentials.findFirst({
    where: {
      email,
    },
  });

  if (emailAlreadyExists) {
    throw new Error("Email already exists");
  }

  const result = await prisma.credentials.create({
    data: {
      email,
      password: bcrypt.hashSync(password, 10),
      users: {
        create: {
          name,
          lastname,
          photo,
          roles_id,
        },
      },
    },
    include: { users: true },
  });

  return result;
}

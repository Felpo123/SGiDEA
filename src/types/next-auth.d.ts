import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User;
  }

  interface User {
    id: number;
    fullname: string;
    photo: string;
    email: string;
    role: string;
  }

  interface Credentials {
    email: string;
    password: string;
  }

  interface RegistrationData {
    name: string;
    lastname: string;
    photo: string;
    roles_id: number; // se puede ocupar el nombre del rol en vez del id para que sea mas legible hay que llegar a un acuerdo con el front
    email: string;
    password: string;
  }
}


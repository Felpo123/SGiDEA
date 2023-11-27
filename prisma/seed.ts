import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.roles.createMany({
    data: [
      {
        type: "ADMIN",
      },
      {
        type: "USER",
      },
    ],
  });

  await prisma.categories.createMany({
    data: [
      {
        name: "Articulo de Oficina",
      },
      {
        name: "Computacion",
      },
      {
        name: "Electronica",
      },
      {
        name: "Ferreteria",
      },
      {
        name: "Fungible",
      },
      {
        name: "Material de Aseo",
      },
      {
        name: "Supermercado",
      },
      {
        name: "Mobiliario",
      },
      {
        name: "Mobiliario de Oficina",
      },
      {
        name: "Cocina",
      },
      {
        name: "Art. Electrico",
      },
    ],
  });

  await prisma.generalLocations.createMany({
    data: [
      {
        name: "Bodega",
      },
      {
        name: "Mueble Rojo 1",
      },
      {
        name: "Mueble Rojo 2",
      },
      {
        name: "Mueble Rojo 3",
      },
      {
        name: "Oficina Central",
      },
      {
        name: "Salas de Formacion",
      },
      {
        name: "Cocina",
      },
      {
        name: "Laboratorio IDEA",
      },
    ],
  });

  await prisma.specificLocations.createMany({
    data: [
      { name: "Sala de Clase", general_locations_id: 6 },
      { name: "Bodega", general_locations_id: 6 },
      { name: "Laboratorio", general_locations_id: 8 },
      { name: "Oficina 1", general_locations_id: 5 },
      { name: "Oficina 2", general_locations_id: 5 },
      { name: "Oficina 3", general_locations_id: 5 },
      { name: "Oficina 4", general_locations_id: 5 },
      { name: "Teletrabajo", general_locations_id: 5 },
      { name: "Sala de Clases", general_locations_id: 6 },
      { name: "Hall IDEAUDRO", general_locations_id: 5 },
      { name: "Cocina", general_locations_id: 5 },
    ],
  });

  await prisma.states.createMany({
    data: [
      { name: "Nuevo", abbreviation: "NV" },
      { name: "Usado Bueno", abbreviation: "UB" },
      { name: "Usado Mal Estado", abbreviation: "UME" },
    ],
  });

  await prisma.credentials.create({
    data: {
      email: "admin",
      password: bcrypt.hashSync("admin", 10),
      users: {
        create: {
          name: "admin",
          lastname: "admin",
          photo: "/df-user.webp",
          roles_id: 1,
        },
      },
    },
  });
  await prisma.credentials.create({
    data: {
      email: "user",
      password: bcrypt.hashSync("user", 10),
      users: {
        create: {
          name: "user",
          lastname: "user",
          photo: "/df-user.webp",
          roles_id: 2,
        },
      },
    },
  });
}

main().catch(e =>{
    console.error(e);
    process.exit(1);
}).finally(async () =>    await prisma.$disconnect();
);
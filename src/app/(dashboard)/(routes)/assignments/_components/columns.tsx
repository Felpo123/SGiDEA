"use client";

import { ArrowUpDown, MoreHorizontal, Text } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Users } from "@prisma/client";

export const columns: ColumnDef<Object>[] = [
  {
    accessorKey: "initial_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha de inicio
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const initialDate = row.getValue("initial_date") as Date;
      const formattedDate = format(new Date(initialDate), "dd/MM/yyyy");
      return formattedDate;
    },
  },
  {
    accessorKey: "end_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha de fin
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const endDate = row.getValue("end_date") as Date;
      const formattedDate = format(new Date(endDate), "dd/MM/yyyy");
      return formattedDate;
    },
  },
  {
    accessorKey: "description",
    header: "Descripción",
    cell: ({ row }) => {
      const description = row.getValue("description") as string;
      return <div className="max-w-xs break-words">{description}</div>;
    },
  },
  {
    accessorKey: "users",
    header: "Usuario",
    cell: ({ row }) => {
      const user = row.getValue("users") as Users;
      return <div>{user.name + " " + user.lastname}</div>;
    },
  },
  {
    accessorKey: "objects.name",
    header: "Objecto",
  },
  {
    accessorKey: "flag",
    header: "Estado",
    cell: ({ row }) => {
      const state = row.getValue("flag") as boolean;
      return (
        <div>
          {state ? (
            <Badge variant="default">Activo</Badge>
          ) : (
            <Badge variant="outline">Inactivo</Badge>
          )}
        </div>
      );
    },
  },
];

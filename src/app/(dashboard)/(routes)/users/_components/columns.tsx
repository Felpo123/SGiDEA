"use client";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { Users } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<Users>[] = [
  {
    accessorKey: "photo",
    header: "Foto",
    cell: ({ row }) => {
      return (
        <Avatar>
          <AvatarImage src="/yo.jpeg" />
          <AvatarFallback>AV</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Nombres",
  },
  {
    accessorKey: "lastname",
    header: "Apellidos",
  },
  {
    accessorKey: "flag",
    header: "Estado",
    cell: ({ row }) => {
      const user = row.original as Users;
      return (
        <div>
          {user.flag ? (
            <Badge variant="default">Activo</Badge>
          ) : (
            <Badge variant="outline">Inactivo</Badge>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original as Users;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir Menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {user.flag && <DropdownMenuItem>Eliminar</DropdownMenuItem>}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

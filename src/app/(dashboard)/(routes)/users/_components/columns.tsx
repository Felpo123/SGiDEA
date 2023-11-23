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
import { Badge } from "@/components/ui/badge";
import DropdownMenuUsersTable from "./dropdown-menu";

export const columns: ColumnDef<Users>[] = [
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
      return <DropdownMenuUsersTable user={user} />;
    },
  },
];

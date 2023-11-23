import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Users } from "@prisma/client";
import toast from "react-hot-toast";
import axios from "axios";

interface DropdownMenuUsersTableProps {
  user: Users;
}

const deleteUser = async (id: number) => {
  const response = await axios.put(`/api/users/${id}/delete`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

async function deleteConfirm(id: number) {
  try {
    toast.promise(deleteUser(id), {
      loading: "Bloqueando...",
      success: <b>Usuario Bloqueado!</b>,
      error: <b>Error al bloquear el usuario.</b>,
    });
  } catch (error) {
    toast.error("Error al bloquear el usuario");
  }
}

function DropdownMenuUsersTable({ user }: DropdownMenuUsersTableProps) {
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
        {user.flag && (
          <Dialog>
            <DialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                Bloquear
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  ¿Está seguro de bloquear a {`${user.name} ${user.lastname}`}?
                </DialogTitle>
                <DialogDescription>
                  Esta acción no se puede deshacer. ¿Está seguro de que desea
                  eliminar permanentemente este registro de nuestros servidores?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    onClick={() => {
                      deleteConfirm(user.id);
                    }}
                  >
                    Confirmar
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropdownMenuUsersTable;

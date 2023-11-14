"use client";
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
import { Assignments } from "@prisma/client";
import axios from "axios";
import toast from "react-hot-toast";

interface DropdownMenuAssignmentsTableProps {
  assigment: Assignments;
}

const deleteAssignment = async (id: number) => {
  const response = await axios.put(`/api/assignments/${id}/delete`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response);
};

async function deleteConfirm(id: number) {
  try {
    toast.promise(deleteAssignment(id), {
      loading: "Eliminando...",
      success: <b>Asignacion eliminada!</b>,
      error: <b>Error al eliminar la asignacion.</b>,
    });
  } catch (error) {
    toast.error("Error al eliminar el objeto");
  }
}

function DropdownMenuAssignmentsTable({
  assigment,
}: DropdownMenuAssignmentsTableProps) {
  return (
    <Dialog>
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
          <DropdownMenuItem>Editar</DropdownMenuItem>
          <DialogTrigger asChild>
            <DropdownMenuItem>Eliminar</DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Estas seguro de eliminar la asignacion {assigment.id}?
          </DialogTitle>
          <DialogDescription>
            Esta acción no se puede deshacer. ¿Está seguro de que desea eliminar
            permanentemente este registro de nuestros servidores?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() => {
                deleteConfirm(assigment.id);
              }}
            >
              Confirmar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DropdownMenuAssignmentsTable;

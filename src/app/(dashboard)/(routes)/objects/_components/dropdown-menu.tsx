"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
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
import axios from "axios";
import toast from "react-hot-toast";
import { Objects } from "@prisma/client";

interface DropdownMenuObjectsTableProps {
  children: React.ReactNode;
  object: Objects;
}

async function deleteConfirm(sku: string) {
  try {
    toast.promise(
      axios.delete(`/api/objects/${sku}/delete`, {
        headers: {
          "Content-Type": "application/json",
        },
      }),
      {
        loading: "Eliminando...",
        success: <b>Objeto eliminado!</b>,
        error: <b>Error al eliminar el objeto.</b>,
      }
    );
  } catch (error) {
    toast.error("Error al eliminar el objeto");
  }
}

function DropdownMenuObjectsTable({
  children,
  object,
}: DropdownMenuObjectsTableProps) {
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

        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Editar
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edita el objeto</DialogTitle>
              <DialogDescription>
                Presione guardar para actualizar el objeto.
              </DialogDescription>
            </DialogHeader>
            {children}
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Eliminar
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>¿Está seguro de eliminar {object.name}?</DialogTitle>
              <DialogDescription>
                Esta acción no se puede deshacer. ¿Está seguro de que desea
                eliminar permanentemente este registro de nuestros servidores?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  onClick={() => {
                    deleteConfirm(object.sku);
                  }}
                >
                  Confirmar
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Asignar
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Asigna el objeto</DialogTitle>
              <DialogDescription>
                Presione guardar para asignar el objeto.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  onClick={() => {
                    console.log("Hola");
                  }}
                >
                  Confirmar
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropdownMenuObjectsTable;

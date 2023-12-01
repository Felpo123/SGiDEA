"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { wait } from "@/lib/wait";
import React from "react";

interface ConfirmModalProps {
  children: React.ReactNode;
  onConfirm?: () => any;
}

export const ConfirmModal = ({ children, onConfirm }: ConfirmModalProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Estas seguro de crear el registro?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. ¿Está seguro de que desea ingresar
            este registro al sistema?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              wait().then(() => setOpen(false));
              if (onConfirm) onConfirm();
            }}
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

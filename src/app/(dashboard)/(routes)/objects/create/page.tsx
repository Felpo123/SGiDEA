"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { appRoutes } from "@/routes";
import React from "react";
import toast from "react-hot-toast";
import axios from "axios";
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
import { ConfirmModal } from "@/components/confirm-modal";
import { states } from "@/constants/states";
import { categories } from "@/constants/categories";
import SelectContentAndItem from "@/components/select-content";
import { specificLocation } from "@/constants/specific-location";

const formSchema = z.object({
  sku: z.string(),
  name: z
    .string()
    .min(1)
    .max(255, { message: "Por favor ingresa el nombre de objeto" }),
  quantity: z.coerce
    .number()
    .int()
    .min(0, { message: "Por favor ingresa la cantidad de objetos" }),
  state: z
    .string()
    .min(1, { message: "Por favor ingresa el estado del objeto" }),
  category: z.string().min(1, { message: "Por favor ingresa la categoria" }),
  specific_location: z
    .string()
    .min(1, { message: "Por favor ingresa la ubicacion" }),
});

function CreateObjectPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sku: "A",
      name: "",
      quantity: 0,
      state: "",
      category: "",
      specific_location: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const saveObject = async (values: z.infer<typeof formSchema>) => {
    const response = await axios.post(
      "http://localhost:3000/api/objects",
      {
        values,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      toast.promise(saveObject(values), {
        loading: "Guardando...",
        success: <b>Objeto guardado!</b>,
        error: <b>Error al ingresar el objeto.</b>,
      });
      // form.reset();
    } catch (error) {
      toast.error("Error al ingresar el objeto");
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h3 className="text-2xl">Registro de Ingreso de Productos</h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4 mt-2"
          >
            <FormField
              control={form.control}
              name="sku"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Código de referencia</FormLabel>
                  <FormDescription>
                    Stock-keeping unit (autogenerado)
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del objeto</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. Cafetera west bend 9 litros"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cantidad del objeto</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isSubmitting}
                      placeholder="10"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado General</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el estado" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContentAndItem array={states} />
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria del objeto</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona la categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContentAndItem array={categories} />
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="specific_location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ubicacion Especifica</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona la ubicacion" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContentAndItem array={specificLocation} />
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-x-2">
              <Link href={appRoutes.inventory}>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </Link>
              <ConfirmModal onConfirm={form.handleSubmit(handleSubmit)}>
                <Button disabled={!isValid || isSubmitting}>Ingresar</Button>
              </ConfirmModal>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default CreateObjectPage;

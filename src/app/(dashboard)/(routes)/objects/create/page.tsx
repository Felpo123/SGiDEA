"use client";

import { Category } from "@/types/category.d";
import { State } from "@/types/state.d";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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

const formSchema = z.object({
  sku: z.string(),
  name: z
    .string()
    .min(1)
    .max(255, { message: "Porfavor ingresa el nombre de objeto" }),
  quantity: z.coerce
    .number()
    .int()
    .min(0, { message: "Porfavor ingresa la cantidad de objetos" }),
  state: z
    .string()
    .min(1, { message: "Porfavor ingresa el estado del objeto" }),
  category: z.string().min(1, { message: "Porfavor ingresa la categoria" }),
});

const categorys = [
  Category.ARTICULO_DE_OFICINA,
  Category.COMPUTACION,
  Category.ELECTRONICA,
  Category.FERRETERIA,
  Category.FUNGIBLE,
  Category.MATERIAL_DE_ASEO,
  Category.SUPERMERCADO,
  Category.MOBILIARIO,
  Category.MOBILIARIO_DE_OFICINA,
  Category.COCINA,
  Category.ARTICULO_ELECTRICO,
];
const states = [State.NUEVO, State.USADO, State.MAL_ESTADO];

function CreateObjectPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sku: "A",
      name: "",
      quantity: 0,
      state: "",
      category: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const saveObject = async (values: z.infer<typeof formSchema>,general_location_id: number,specific_location_id: number) => {
    const response = await axios.post(
      "http://localhost:3000/api/objects",
      {        
        values,
        general_location_id,
        specific_location_id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    return response.data    
  }

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {     
      toast.promise(
        saveObject(values,1,1),
         {
           loading: 'Guardando...',
           success: <b>Objeto guardado!</b>,
           error: <b>Error al ingresar el objeto.</b>,
         }
       );
      form.reset()
    } catch (error) {
      toast.error("Error al ingresar el objeto");
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">Registro de Ingreso de Productos</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8 mt-8"
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
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el estado" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {states.map((state, i) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
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
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona la categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categorys.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
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
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Ingresar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default CreateObjectPage;

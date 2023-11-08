"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
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
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import SelectContentAndItem from "@/components/select-content";
import { states } from "@/constants/states";
import { categories } from "@/constants/categories";
import { Categories, Objects, States } from "@prisma/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import axios from "axios";

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
});

interface UpdateObjectFormProps {
  object: Objects;
  state: States;
  category: string;
}

function UpdateObjectForm({ object, state, category }: UpdateObjectFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sku: object.sku,
      name: object.name,
      quantity: object.quantity,
      state: state.name,
      category: category,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const updateObject = async (
    values: z.infer<typeof formSchema>,
    general_location_id: number,
    specific_location_id: number
  ) => {
    try {
      const { data } = await axios.put(
        `/api/objects/${object.sku}`,
        {
          ...values,
          general_location_id,
          specific_location_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      toast.promise(updateObject(values, 1, 1), {
        loading: "Actualizando...",
        success: <b>Objeto actualizado!</b>,
        error: <b>Error al actualizar el objeto.</b>,
      });
    } catch (error) {
      toast.error("Error al actualizar el objeto");
    }
  };
  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-2"
          >
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
            <div className="flex items-center gap-x-2">
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="submit" disabled={!isValid || isSubmitting}>
                    Guardar
                  </Button>
                </DialogClose>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default UpdateObjectForm;

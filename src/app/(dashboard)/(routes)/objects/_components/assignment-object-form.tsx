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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SelectContentAndItem from "@/components/select-content";
import { states } from "@/constants/states";
import { categories } from "@/constants/categories";
import { Categories, Objects, States, Users } from "@prisma/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import axios from "axios";
import { wait } from "@/lib/wait";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { api_routes } from "@/routes";

const formSchema = z.object({
  initial_date: z.date(),
  end_date: z.date().min(new Date()),
  user_id: z.coerce.number(),
  object_sku: z.coerce.string(),
  description: z
    .string()
    .min(10, { message: "Minimo 10 caracteres" })
    .max(200, { message: "Maximo 200 caracteres" }),
});

interface UpdateObjectFormProps {
  object: Objects;
  usersData: Users[] | [];
}

function AssignmentObjectForm({ object, usersData }: UpdateObjectFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      initial_date: new Date(),
      end_date: new Date(),
      user_id: undefined,
      object_sku: object.sku,
      description: "",
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const saveAssignment = async (assignment: z.infer<typeof formSchema>) => {
    const response = await axios.post(api_routes.assignments, assignment, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      toast.promise(saveAssignment(values), {
        loading: "Guardando...",
        success: <b>Asignacion guardada!</b>,
        error: <b>Error al ingresar la asignacion.</b>,
      });
    } catch (error) {
      toast.error("Error al ingresar el objeto");
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
              name="initial_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de inicio</FormLabel>
                  <FormDescription>
                    Se establece con la fecha actual
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="object_sku"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Codigo de Referencia</FormLabel>
                  <FormDescription>{object.sku}</FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="end_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Fecha de termino</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Fecha en la que se termina la asignación
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="user_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usuario</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={`${field.value}`}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el Usuario" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {usersData.map((user) => (
                        <SelectItem key={user.id} value={user.id + ""}>
                          {user.name}
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripcion</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descripcion de la asignacion"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
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

export default AssignmentObjectForm;

"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
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
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Objects, Users } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";


interface CreateAssignmentFormProps {
    usersData: Users[] | [];
    objectsData: Objects[] | [];
}

const formSchema = z.object({
  initial_date: z.date(),
  end_date: z.date().min(new Date()),
  user_id: z.coerce.number(),
  object_sku: z.coerce.string(),
  description: z.string().min(10, {message: "Minimo 10 caracteres"}).max(200, { message: "Maximo 200 caracteres"}),
});

function CreateAssignmentForm({usersData, objectsData}: CreateAssignmentFormProps) {
   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      initial_date: new Date(),
      end_date: new Date(),
      user_id: undefined,
      object_sku: "",
      description: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const saveAssignment = async (assignment: z.infer<typeof formSchema>)=> {          
    const response = await axios.post('http://localhost:3000/api/assignments',assignment,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    );  
      return response.data;    
  }

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {      
      toast.promise(
        saveAssignment(values),
         {
           loading: 'Guardando...',
           success: <b>Asignacion guardada!</b>,
           error: <b>Error al ingresar la asignacion.</b>,
         }
       );
      form.reset()
    } catch (error) {
      toast.error("Error al ingresar el objeto");
    }
  };

  return (
      <div>
        <h1 className="text-2xl">Registro de Asignaciones</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8 mt-8"
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
                      <SelectItem key={user.id} value={user.id +""} >
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
              name="object_sku"
              render={({ field }) => (
                <FormItem>
                <FormLabel>Objetos</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={`${field.value}`}                   
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el Objeto" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {objectsData.map((object) => (
                      <SelectItem key={object.sku} value={object.sku} >
                        {object.name}
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
              <Link href={appRoutes.assignments}>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </Link>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Asignar
              </Button>
            </div>
          </form>
        </Form>
      </div>    
  );
}

export default CreateAssignmentForm;

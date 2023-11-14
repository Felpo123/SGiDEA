"use client";
import React from 'react'
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
import toast from "react-hot-toast";
import axios from "axios";
import { ConfirmModal } from "@/components/confirm-modal";

const formSchema = z.object({
  name: z
    .string()
    .min(1)
    .max(255, { message: "Por favor ingresa el nombre de usuario" }),
  lastname: z.string().min(1).max(255, { message: "Por favor ingresa el apellido de usuario" }),
  photo: z.string().min(1).max(255, { message: "Por favor ingresa la foto de usuario" }),
  roles_id: z.number().min(1).max(2, { message: "Por favor ingresa el rol de usuario" }),
  email: z.string().email({ message: "Por favor ingresa un email valido" }),
  password: z
    .string()
    .min(1)
    .max(255, { message: "Por favor ingresa una contraseña" }),
  confirm_password: z.string().min(1).max(255, { message: "Por favor reescribe la contraseña" }),  
  
}).refine((data) => data.password === data.confirm_password, {
  message: "Las contraseñas no coinciden",
  path: ["confirm_password"],

});


function CreateUserPage() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      lastname: "",
      photo: "",
      roles_id: 2,
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const saveUser = async (values: z.infer<typeof formSchema>)=>{
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup", 
        {
          name: values.name,
          lastname: values.lastname,
          photo: values.photo,
          roles_id: values.roles_id,
          email: values.email,
          password: values.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
        console.log(response.data);  
        return response.data;
  };  
  
  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      toast.promise(saveUser(values), {
        loading: "Guardando...",
        success: <b>Usuario creado!</b>,
        error: <b>Error al crear el Usuario.</b>,
      });
      form.reset();
    } catch (error) {
      toast.error("Error al crear el Usuario.");
    }
  };


  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h3 className="text-2xl">Registro de Usuario</h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4 mt-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombres</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. John "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />  
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellidos</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. Smith"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="photo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Foto</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      disabled={isSubmitting}
                      placeholder="usuario.jpg"
                      {...field}
                    />
                    
                  </FormControl>
                  <FormDescription>No Obligatorio</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="email@email.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      disabled={isSubmitting}
                      placeholder="*********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirme Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      disabled={isSubmitting}
                      placeholder="*********"
                      {...field}
                    />
                  </FormControl>
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
  )
}

export default CreateUserPage
import React from "react";
import { UsersDataTable } from "./_components/data-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { adminRoutes } from "@/routes";
import { columns } from "./_components/columns";
import axios from "axios";
import { Users } from "@prisma/client";

async function getData(): Promise<Users[]> {
  try {
    const response = await axios.get('http://localhost:3000/api/users', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

async function UserAdministation(){
  const data = await getData();

  return(
      <div className="container mx-auto py-10">
        <UsersDataTable columns={columns} data={data}/>
      </div>     
    );
}

export default UserAdministation;

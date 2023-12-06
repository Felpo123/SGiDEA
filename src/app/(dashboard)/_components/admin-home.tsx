import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clipboard, Container } from "lucide-react";
import React from "react";
import { Assignments, Objects, SpecificLocations, Users } from "@prisma/client";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import format from "date-fns/format";
import { User } from "next-auth";
import { api_routes } from "@/routes";

interface UserAndEmail extends Users {
  credentials: {
    email: string;
  };
}

interface ExpiredAssignments extends Assignments {
  objects: Objects;
  users: UserAndEmail;
}

export interface RecentObject extends Objects {
  specific_location: SpecificLocations;
  category: {
    name: string;
  };
}

interface DashboardData {
  countObjects: number;
  countAssignments: number;
  recentObjects: RecentObject[];
  expiredAssignments: ExpiredAssignments[];
}

async function dashboardData(): Promise<DashboardData> {
  try {
    const response = await axios.get(api_routes.assignments_dashboard, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    return {
      countObjects: 0,
      countAssignments: 0,
      recentObjects: [],
      expiredAssignments: [],
    };
  }
}

async function AdminHomePage() {
  const { countObjects, countAssignments, recentObjects, expiredAssignments } =
    await dashboardData();
  return (
    <div className="flex-col md:flex pt-">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-center space-y-2">
          <h1 className="text-4xl font-bold text-red-600 mb-4">
            Panel de Administrador
          </h1>
        </div>
        <div className="grid lg:grid-flow-col gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Inventario
              </CardTitle>
              <Container className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{countObjects}</div>
              <p className="text-xs text-muted-foreground">
                Objetos en el inventario
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Asignaciones
              </CardTitle>
              <Clipboard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{countAssignments}</div>
              <p className="text-xs text-muted-foreground">
                Asignaciones en curso
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid lg:grid-flow-col gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Últimos ingresos al inventario</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {recentObjects.map((object, i) => (
                  <div key={i} className="flex items-center">
                    <div className=" space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {object.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {object.category.name}
                      </p>
                    </div>
                    <div className="ml-auto font-medium">
                      <p className="text-base font-medium leading-none">
                        {object.specific_location.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Asignaciones caducadas recientes</CardTitle>
              <CardDescription>
                Últimas 5 asignaciones caducadas, Comprueba su recepcion!!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {expiredAssignments.map((assignment) => (
                  <div key={assignment.id} className="flex items-center">
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={`/static/imgs/${assignment.users.photo}`}
                        alt="Avatar"
                      />
                      <AvatarFallback>AV</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {assignment.users.name +
                          " " +
                          assignment.users.lastname}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {assignment.users.credentials.email}
                      </p>
                    </div>
                    <div className="ml-auto font-medium">
                      <p className="text-sm font-medium leading-none">
                        {assignment.objects.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(assignment.end_date), "dd/MM/yyyy")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AdminHomePage;

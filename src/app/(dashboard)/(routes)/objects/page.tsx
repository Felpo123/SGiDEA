import { columns } from "./_components/columns";
import { ObjectDataTable } from "./_components/data-table";
import { Object } from "@/types/object";
import axios from "axios";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Objects, SpecificLocations, States, Users } from "@prisma/client";
import { api_routes } from "@/routes";

interface FullObjectData extends Objects {
  category: {
    name: string;
  };
  state: States;
  specific_location: SpecificLocations;
}

async function getObjects(): Promise<FullObjectData[]> {
  try {
    const response = await axios.get(api_routes.objects, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

async function getUsers(): Promise<Users[]> {
  try {
    const response = await axios.get(api_routes.users, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

async function ObjectPage() {
  const objectsPromise = getObjects();
  const usersPromise = getUsers();
  const [object, users] = await Promise.all([objectsPromise, usersPromise]);
  const session = (await getServerSession(authOptions)) as Session;
  const { role } = session.user;

  return (
    <div className="container mx-auto py-10">
      <ObjectDataTable
        columns={columns}
        data={object}
        role={role}
        users={users}
      />
    </div>
  );
}

export default ObjectPage;

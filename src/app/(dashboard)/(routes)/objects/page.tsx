import { columns } from "./_components/columns";
import { ObjectDataTable } from "./_components/data-table";
import { Object } from "@/types/object";
import axios from "axios";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Users } from "@prisma/client";

async function getObjects(): Promise<Object[]> {
  try {
    const response = await axios.get("http://localhost:3000/api/objects", {
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
    const response = await axios.get("http://localhost:3000/api/users", {
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

import { Button } from "@/components/ui/button";
import { adminRoutes } from "@/routes";
import { columns } from "./_components/columns"
import axios from "axios";
import Link from "next/link";
import { AssignmentDataTable } from "./_components/data-table";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Role } from "@/types/role.d";

async function getData(role: Role, id: number): Promise<Object[]> {
  try {
    let url = '' 
    if (role == Role.ADMINISTRADOR) {
      url = 'http://localhost:3000/api/assignments'
    } else {
      url = 'http://localhost:3000/api/assignments/'+id
    }
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

async function Assignments() {
  const session = await getServerSession(authOptions) as Session

  const data = await getData(session?.user?.role, session.user.id)

  return (
    <div>
      <div className="container mx-auto py-10">
        <AssignmentDataTable columns={columns} data={data} />
      </div>
      <Link href={adminRoutes.create_assignments}>
        <Button>Asignar objeto</Button>
      </Link>
    </div>
  );
}

export default Assignments;

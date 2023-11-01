import { Button } from "@/components/ui/button";
import { adminRoutes } from "@/routes";
import Link from "next/link";
import { columns } from "./_components/columns"
import { ObjectDataTable } from "./_components/data-table"
import { Object } from "@/types/object";
import axios from 'axios';

async function getData(): Promise<Object[]> {
  try {
    const response = await axios.get('http://localhost:3000/api/objects', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

async function ObjectPage() {
  const data = await getData()

  return (

    <div>
      <div className="container mx-auto py-10">
        <ObjectDataTable columns={columns} data={data} />
      </div>
      <Link href={adminRoutes.create_objects}>
        <Button> Crear Objecto</Button>
      </Link>
    </div>
  );
}

export default ObjectPage;

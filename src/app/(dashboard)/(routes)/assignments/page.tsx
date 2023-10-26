import { Button } from "@/components/ui/button";
import { adminRoutes } from "@/routes";
import Link from "next/link";

function Assignments() {
  return (
    <div>
      LAS ASIGNACIONES VA ACA
      <Link href={adminRoutes.create_assignments}>
        <Button>Asignar objeto</Button>
      </Link>
    </div>
  );
}

export default Assignments;

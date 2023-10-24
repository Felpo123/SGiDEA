import { Button } from "@/components/ui/button";
import { adminRoutes } from "@/routes";
import Link from "next/link";

function Objects() {
  return (
    <div>
      EL INVENTARIO DE LOS OBJETOS VA AQUI
      <Link href={adminRoutes.create_objects}>
        <Button> Crear Objecto</Button>
      </Link>
    </div>
  );
}

export default Objects;

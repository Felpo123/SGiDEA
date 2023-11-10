import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface CellModalProps {
  cell: string;
}

function CellModal({ cell }: CellModalProps) {
  return (
    <Dialog>
      <DialogTrigger>{cell}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Descripcion detallada</DialogTitle>
          <DialogDescription>
            Informacion completa del objeto {cell}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label>Nombre</Label>
            <p>{cell}</p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label>Cantidad</Label>
            <p>2</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CellModal;

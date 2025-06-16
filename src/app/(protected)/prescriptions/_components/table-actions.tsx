"use client";

import { MoreVerticalIcon, PrinterIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { generatePrescriptionPdf } from "@/src/actions/generate-prescription";
import { prescriptionsTable } from "@/src/db/schema";

type PrescriptionWithRelations = typeof prescriptionsTable.$inferSelect & {
  patient: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    sex: "male" | "female";
  } | null;
  doctor: {
    id: string;
    name: string;
    specialty: string;
  } | null;
};

interface PrescriptionsTableActionsProps {
  prescription: PrescriptionWithRelations;
}

const PrescriptionsTableActions = ({
  prescription,
}: PrescriptionsTableActionsProps) => {
  const printPrescriptionAction = useAction(generatePrescriptionPdf, {
    onSuccess: () => {
      toast.success("Receita impressa com sucesso.");
    },
    onError: () => {
      toast.error("Erro ao imprimir receita.");
    },
  });

  const handlePrintPrescriptionClick = () => {
    printPrescriptionAction.execute({ id: prescription.id });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVerticalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          {prescription.patient ? prescription.patient.name : "-"}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <PrinterIcon className="mr-2 h-4 w-4" />
              Imprimir
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Tem certeza que deseja imprimir essa receita?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Essa ação não pode ser revertida. Isso irá deletar o agendamento
                permanentemente.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handlePrintPrescriptionClick}>
                Imprimir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PrescriptionsTableActions;

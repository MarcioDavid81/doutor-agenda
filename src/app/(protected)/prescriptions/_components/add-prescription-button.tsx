"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { doctorsTable, patientsTable } from "@/src/db/schema";

import UpsertPrescriptionSheet from "./upsert-prescription-sheet";

interface AddPrescriptionButtonProps {
  patients: (typeof patientsTable.$inferSelect)[];
  doctors: (typeof doctorsTable.$inferSelect)[];
}

const AddPrescriptionButton = ({ patients, doctors }: AddPrescriptionButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button>
          <Plus />
          Adicionar receita
        </Button>
      </SheetTrigger>
      <UpsertPrescriptionSheet patients={patients} doctors={doctors} />
    </Sheet>
  );
};

export default AddPrescriptionButton;

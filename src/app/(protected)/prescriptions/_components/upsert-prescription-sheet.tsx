"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addPrescription } from "@/src/actions/add-prescription";
import { doctorsTable, patientsTable } from "@/src/db/schema";

import PrescriptionTextEditor from "./prescription-text-editor";

const formSchema = z.object({
  patientId: z.string().uuid({
    message: "Paciente é obrigatório.",
  }),
  doctorId: z.string().uuid({
    message: "Médico é obrigatório.",
  }),
  content: z.string().min(1, {
    message: "Conteúdo da prescrição é obrigatório.",
  }),
});

interface UpsertPrescriptionSheetProps {
  patients: (typeof patientsTable.$inferSelect)[];
  doctors: (typeof doctorsTable.$inferSelect)[];
  prescription?: string;
  onSuccess?: () => void;
}

const UpsertPrescriptionSheet = ({
  patients,
  doctors,
  prescription,
  onSuccess,
}: UpsertPrescriptionSheetProps) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientId: "",
      doctorId: "",
      content: prescription || "",
    },
  });

  const createPrescriptionAction = useAction(addPrescription, {
    onSuccess: () => {
      toast.success("Receita criada com sucesso.");
      onSuccess?.();
    },
    onError: () => {
      toast.error("Erro ao criar receita.");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createPrescriptionAction.execute({
      ...values,
    });
  };

  return (
    <SheetContent className="!max-w-[600px] px-4" side="right">
      <SheetHeader className="px-0">
        <SheetTitle>Adicionar Receita</SheetTitle>
        <SheetDescription>
          Insira abaixo, as informações da saída
        </SheetDescription>
      </SheetHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <FormField
            control={form.control}
            name="patientId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Paciente</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione um paciente" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {patients.map((patient) => (
                      <SelectItem key={patient.id} value={patient.id}>
                        {patient.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="doctorId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Médico</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione um médico" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {doctors.map((doctor) => (
                      <SelectItem key={doctor.id} value={doctor.id}>
                        {doctor.name} - {doctor.specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Receita</FormLabel>
                <PrescriptionTextEditor
                  value={field.value}
                  onChange={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <SheetClose className="px-0" asChild>
            <Button type="submit" disabled={createPrescriptionAction.isPending}>
              {createPrescriptionAction.isPending
                ? "Criando..."
                : "Criar receita"}
            </Button>
          </SheetClose>
        </form>
      </Form>
    </SheetContent>
  );
};

export default UpsertPrescriptionSheet;

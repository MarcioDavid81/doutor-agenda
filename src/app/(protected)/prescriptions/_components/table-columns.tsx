"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { prescriptionsTable } from "@/src/db/schema";

import PrescriptionsTableActions from "./table-actions";

type PrescriptionWithRelations = typeof prescriptionsTable.$inferSelect & {
  id: number;
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

export const prescriptionsTableColumns: ColumnDef<PrescriptionWithRelations>[] =
  [
    {
      id: "id",
      accessorKey: "id",
      header: "Número",
      cell: (params) => {
        const prescription = params.row.original;
        return prescription.id ? `#${prescription.id}` : "-";
      },
    },
    {
      id: "patient",
      accessorKey: "patient.name",
      header: "Paciente",
      cell: (params) => {
        const prescription = params.row.original;
        return prescription.patient ? prescription.patient.name : "-";
      },
    },
    {
      id: "doctor",
      accessorKey: "doctor.name",
      header: "Médico",
      cell: (params) => {
        const prescription = params.row.original;
        return prescription.doctor ? prescription.doctor.name : "-";
      },
    },
    {
      id: "date",
      accessorKey: "date",
      header: "Data e Hora",
      cell: (params) => {
        const prescription = params.row.original;
        return format(
          new Date(prescription.createdAt),
          "dd/MM/yyyy 'às' HH:mm",
          {
            locale: ptBR,
          },
        );
      },
    },
    {
      id: "specialty",
      accessorKey: "doctor.specialty",
      header: "Especialidade",
      cell: (params) => {
        const prescription = params.row.original;
        return prescription.doctor ? prescription.doctor.specialty : "-";
      },
    },

    {
      id: "actions",
      cell: (params) => {
        const prescription = params.row.original;
        return <PrescriptionsTableActions prescription={prescription} />;
      },
    },
  ];

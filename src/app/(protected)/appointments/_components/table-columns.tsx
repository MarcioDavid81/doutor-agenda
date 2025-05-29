"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { appointmentsTable } from "@/src/db/schema";

import AppointmentsTableActions from "./table-actions";

type AppointmentWithRelations = typeof appointmentsTable.$inferSelect & {
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

export const appointmentsTableColumns: ColumnDef<AppointmentWithRelations>[] = [
  {
    id: "patient",
    accessorKey: "patient.name",
    header: "Paciente",
    cell: (params) => {
      const appointment = params.row.original;
      return appointment.patient ? appointment.patient.name : "-";
    },
  },
  {
    id: "doctor",
    accessorKey: "doctor.name",
    header: "Médico",
    cell: (params) => {
      const appointment = params.row.original;
      return appointment.doctor ? appointment.doctor.name : "-";
    },
  },
  {
    id: "date",
    accessorKey: "date",
    header: "Data e Hora",
    cell: (params) => {
      const appointment = params.row.original;
      return format(new Date(appointment.date), "dd/MM/yyyy 'às' HH:mm", {
        locale: ptBR,
      });
    },
  },
  {
    id: "specialty",
    accessorKey: "doctor.specialty",
    header: "Especialidade",
    cell: (params) => {
      const appointment = params.row.original;
      return appointment.doctor ? appointment.doctor.specialty : "-";
    },
  },
  {
    id: "price",
    accessorKey: "appointmentPriceInCents",
    header: "Valor",
    cell: (params) => {
      const appointment = params.row.original;
      const price = appointment.appointmentPriceInCents / 100;
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price);
    },
  },
  {
    id: "actions",
    cell: (params) => {
      const appointment = params.row.original;
      return <AppointmentsTableActions appointment={appointment} />;
    },
  },
];

import { eq } from "drizzle-orm";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { DataTable } from "@/components/ui/data-table";
import {
  PageActions,
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";
import { auth } from "@/lib/auth";
import { db } from "@/src/db";
import { doctorsTable, patientsTable, prescriptionsTable } from "@/src/db/schema";

import AddPrescriptionButton from "./_components/add-prescription-button";
import { DownloadPrescriptionButton } from "./_components/download-prescription-button";
import { prescriptionsTableColumns } from "./_components/table-columns";

export const metadata: Metadata = {
  title: "Receitas",
  keywords: [
    "agendamento de consultas",
    "gestão de clínic",
    "controle de agenda de médicos e pacientes",
  ],
  description: "O seu sistema de gestão de agendamento de consultas",
  authors: [
    { name: "Marcio David", url: "https://md-webdeveloper.vercel.app" },
  ],
};

const PrescriptionsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/authentication");
  }
  if (!session.user.clinic) {
    redirect("/clinic-form");
  }
  if (!session.user.plan) {
    redirect("/new-subscription");
  }

  const [patients, doctors, prescriptions] = await Promise.all([
    db.query.patientsTable.findMany({
      where: eq(patientsTable.clinicId, session.user.clinic.id),
    }),
    db.query.doctorsTable.findMany({
      where: eq(doctorsTable.clinicId, session.user.clinic.id),
    }),
    db.query.prescriptionsTable.findMany({
      where: eq(prescriptionsTable.clinicId, session.user.clinic.id),
      with: {
        patient: true,
        doctor: true,
      },
    }),
  ]);

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Receitas</PageTitle>
          <PageDescription>Gerencie as receitas da sua clínica</PageDescription>
        </PageHeaderContent>
        <PageActions>
          <AddPrescriptionButton patients={patients} doctors={doctors} />
        </PageActions>
      </PageHeader>
      <PageContent>
        <DataTable data={prescriptions} columns={prescriptionsTableColumns} />
        <DownloadPrescriptionButton
          doctor={prescriptions[0]?.doctor?.name ?? ""}
          patient={prescriptions[0]?.patient?.name ?? ""}
          contentHtml={prescriptions[0]?.content ?? ""} crm={""}        />
      </PageContent>
    </PageContainer>
  );
};

export default PrescriptionsPage;

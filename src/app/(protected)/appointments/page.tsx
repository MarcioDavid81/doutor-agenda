import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Agendamentos",
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

const AppointmentsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/authentication");
  }
  if (!session.user.clinic) {
    redirect("/clinic-form");
  }
  return <h1>Appointments</h1>;
};

export default AppointmentsPage;

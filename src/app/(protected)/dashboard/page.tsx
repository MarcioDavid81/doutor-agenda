import { Metadata } from "next";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";

import SignOutButton from "./_components/sign-out-button";

export const metadata: Metadata = {
  title: "Dashboard",
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

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/authentication");
  }
  if (!session.user.clinic) {
    redirect("/clinic-form");
  }
  return (
    <div>
      <h1>{session?.user.name}</h1>
      <h1>{session?.user.email}</h1>
      <Image
        src={session?.user?.image as string}
        alt="User"
        width={50}
        height={50}
        className="rounded-full"
      />
      <Button>
        <Link href="/">Página Inicial</Link>
      </Button>
      <SignOutButton />
    </div>
  );
};

export default DashboardPage;

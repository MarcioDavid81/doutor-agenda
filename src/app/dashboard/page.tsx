import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { db } from "@/src/db";
import { usersToClinicsTable } from "@/src/db/schema";

import SignOutButton from "./_components/sign-out-button";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/authentication");
  }
  console.log(session.user)
  //Pegar as clínicas do usuário logado
  const clinics = await db.query.usersToClinicsTable.findMany({
    where: eq(usersToClinicsTable.userId, session.user.id),
  });
  if (clinics.length === 0) {
    redirect("/clinic-form");
  }
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <h1>Dashboard</h1>
      <h1>{session?.user.name}</h1>
      <h1>{session?.user.email}</h1>
      <Image
        src={session?.user?.image as string}
        alt="User"
        width={50}
        height={50}
        className="rounded-full"
      />
      <SignOutButton />
    </div>
  );
};

export default DashboardPage;

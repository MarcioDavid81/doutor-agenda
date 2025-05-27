"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { db } from "@/src/db";
import { clinicsTable, usersToClinicsTable } from "@/src/db/schema";

interface ClinicProps {
  name: string;
  address: string;
  phone: string;
  email: string;
}

export const createClinic = async ({
  name,
  address,
  phone,
  email,
}: ClinicProps) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Usuário não autenticado");
  }
  const [clinic] = await db
    .insert(clinicsTable)
    .values({ name, address, phone, email })
    .returning();
  await db.insert(usersToClinicsTable).values({
    userId: session.user.id,
    clinicId: clinic.id,
  });
  redirect("/dashboard");
};

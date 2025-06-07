"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";
import { db } from "@/src/db";
import { prescriptionsTable } from "@/src/db/schema";

import { addPrescriptionSchema } from "./schema";

export const addPrescription = actionClient.schema(addPrescriptionSchema).action(
  async ({ parsedInput }) => {
    const session = await auth.api.getSession({
        headers: await headers(),
      });
      if (!session?.user) {
        throw new Error("Unauthorized");
      }
    if (!session?.user.clinic?.id) {
      throw new Error("Clinic not found");
    }
    await db.insert(prescriptionsTable).values({
      ...parsedInput,
      clinicId: session?.user.clinic?.id,
      });
      revalidatePath("/prescriptions");
      revalidatePath("/dashboard");
    });
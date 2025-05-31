"use server";

import { v2 as cloudinary } from "cloudinary";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";
import { db } from "@/src/db";
import { doctorsTable } from "@/src/db/schema";

import { upsertDoctorSchema } from "./schema";

dayjs.extend(utc);

// Configuração do Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Função para upload de imagem para o Cloudinary
async function uploadImageToCloudinary(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "doctor-avatars",
          transformation: [
            { width: 400, height: 400, crop: "fill", gravity: "face" },
          ],
        },
        (error, result) => {
          if (error || !result) {
            return reject(error || new Error("Upload failed"));
          }
          resolve(result.secure_url);
        },
      )
      .end(buffer);
  });
}

export const upsertDoctor = actionClient
  .schema(upsertDoctorSchema)
  .action(async ({ parsedInput }) => {
    const { availableFromTime, availableToTime, avatarUrl, ...rest } =
      parsedInput;

    // Converter horários para UTC
    const availableFromTimeUTC = dayjs()
      .set("hour", parseInt(availableFromTime.split(":")[0]))
      .set("minute", parseInt(availableFromTime.split(":")[1]))
      .set("second", parseInt(availableFromTime.split(":")[2]))
      .utc();
    const availableToTimeUTC = dayjs()
      .set("hour", parseInt(availableToTime.split(":")[0]))
      .set("minute", parseInt(availableToTime.split(":")[1]))
      .set("second", parseInt(availableToTime.split(":")[2]))
      .utc();

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Unauthorized");
    }
    if (!session?.user.clinic?.id) {
      throw new Error("Clinic not found");
    }

    let imageUrl: string | undefined;

    // Se avatarUrl for um File (nova imagem), faz upload para o Cloudinary
    if (avatarUrl instanceof File) {
      imageUrl = await uploadImageToCloudinary(avatarUrl);
    } else if (typeof avatarUrl === "string") {
      // Se for string (URL existente), mantém a URL
      imageUrl = avatarUrl;
    }

    const doctorData = {
      ...rest,
      clinicId: session.user.clinic.id,
      availableFromTime: availableFromTimeUTC.format("HH:mm:ss"),
      availableToTime: availableToTimeUTC.format("HH:mm:ss"),
      avatarImageUrl: imageUrl,
    };

    await db
      .insert(doctorsTable)
      .values(doctorData)
      .onConflictDoUpdate({
        target: [doctorsTable.id],
        set: doctorData,
      });

    revalidatePath("/doctors");
  });
/* eslint-disable @typescript-eslint/no-explicit-any */
import { v2 as cloudinary } from "cloudinary";
import { eq } from "drizzle-orm";
import { File as FormidableFile, IncomingForm } from "formidable";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { db } from "@/src/db";
import { doctorsTable } from "@/src/db/schema";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const fetchCache = 'force-no-store';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface FormidableFileWithPath extends FormidableFile {
  filepath: string;
}

interface ParsedForm {
  fields: Record<string, string[]>;
  file: FormidableFileWithPath;
}

function parseForm(req: NextRequest): Promise<ParsedForm> {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm({
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024,
      allowEmptyFiles: false,
    });

    form.parse(req as unknown as any, (err, fields, files: any) => {
      if (err) return reject(err);
      
      if (!files.file) {
        return reject(new Error("Nenhum arquivo enviado"));
      }
      
      resolve({ 
        fields: Object.fromEntries(
          Object.entries(fields).map(([key, value]) => [key, value ?? []])
        ),
        file: files.file[0] as FormidableFileWithPath 
      });
    });
  });
}

function validateImageFile(file: FormidableFile): boolean {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  const maxSizeInBytes = 5 * 1024 * 1024;
  
  return (
    allowedTypes.includes(file.mimetype || '') &&
    file.size <= maxSizeInBytes
  );
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    
    if (!session?.user?.clinic) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      );
    }

    const { fields, file } = await parseForm(req);
    
    if (!validateImageFile(file)) {
      return NextResponse.json(
        { error: "Arquivo inválido. Use imagens JPG, PNG ou WebP com no máximo 5MB" },
        { status: 400 }
      );
    }

    // Upload para Cloudinary
    const result = await cloudinary.uploader.upload(file.filepath, {
      folder: "doctor-avatars",
      transformation: [
        { width: 400, height: 400, crop: "fill", gravity: "face" }
      ],
      resource_type: "image"
    });

    // Atualizar o médico no banco de dados com a URL da imagem
    const doctorId = fields.doctorId?.[0];
    if (!doctorId) {
      return NextResponse.json(
        { error: "ID do médico não fornecido" },
        { status: 400 }
      );
    }

    const updatedDoctor = await db.update(doctorsTable)
      .set({ 
        avatarImageUrl: result.secure_url,
        updatedAt: new Date()
      })
      .where(eq(doctorsTable.id, doctorId))
      .returning();

    return NextResponse.json({ 
      success: true,
      doctor: updatedDoctor[0],
      avatarImageUrl: result.secure_url,
      publicId: result.public_id
    });
  } catch (err) {
    console.error("Erro no upload:", err);
    return NextResponse.json(
      { error: "Erro ao fazer upload da imagem" },
      { status: 500 }
    );
  }
}
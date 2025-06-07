import { z } from "zod";

export const addPrescriptionSchema = z.object({
    patientId: z.string().uuid({
        message: "Paciente é obrigatório.",
    }),
    doctorId: z.string().uuid({
        message: "Médico é obrigatório.",
    }),
    content: z.string().min(1, {
        message: "Conteúdo da prescrição é obrigatório.",
    }),
})
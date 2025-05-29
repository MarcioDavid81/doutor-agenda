import { z } from "zod";

export const upsertPatientSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  phoneNumber: z.string().min(1, "Telefone é obrigatório"),
  sex: z.enum(["male", "female"], {
    required_error: "Sexo é obrigatório",
  }),
  dateOfBirth: z.date({
    required_error: "Data de nascimento é obrigatória",
  }),
  address: z.string().min(1, "Endereço é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(1, "Estado é obrigatório"),
  zipCode: z.string().min(1, "CEP é obrigatório"),
  country: z.string().min(1, "País é obrigatório"),
  clinicId: z.string().min(1, "Clínica é obrigatória"),
});

export type UpsertPatientSchema = z.infer<typeof upsertPatientSchema>;

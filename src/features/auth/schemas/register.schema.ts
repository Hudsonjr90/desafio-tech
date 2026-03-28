import { z } from "zod"

export const registerSchema = z
  .object({
    firstName: z.string().min(2, "Informe seu nome"),
    lastName: z.string().min(2, "Informe seu sobrenome"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z.string().min(6, "Confirme sua senha"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "As senhas precisam ser iguais",
    path: ["confirmPassword"],
  })

export type RegisterFormData = z.infer<typeof registerSchema>

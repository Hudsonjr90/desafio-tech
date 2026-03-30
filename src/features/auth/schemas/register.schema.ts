import { z } from "zod"

export const registerSchema = z
  .object({
    firstName: z.string().trim().min(2, "Nome é obrigatório"),
    lastName: z.string().trim().min(2, "Sobrenome é obrigatório"),
    email: z
      .string()
      .trim()
      .min(1, "E-mail é obrigatório")
      .email("E-mail inválido"),
    password: z
      .string()
      .min(1, "Senha é obrigatória")
      .min(6, "A senha deve ter no mínimo 6 caracteres")
      .regex(/^[A-Za-z\d@$!%*?&._\-#]+$/, "A senha contém caracteres inválidos"),
    confirmPassword: z
      .string()
      .min(1, "Confirme sua senha")
      .min(6, "A senha deve ter no mínimo 6 caracteres"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "As senhas precisam ser iguais",
    path: ["confirmPassword"],
  })

export type RegisterFormData = z.infer<typeof registerSchema>

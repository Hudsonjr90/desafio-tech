import { z } from "zod"

export const createTransferSchema = (balance: number) =>
  z.object({
    recipient: z.string().min(3, "Informe o destinatário"),
    amount: z.coerce
      .number()
      .positive("O valor deve ser maior que zero")
      .max(balance, "Saldo insuficiente"),
    description: z.string().optional(),
  })

export type TransferFormData = z.output<ReturnType<typeof createTransferSchema>>
export type TransferFormInput = z.input<ReturnType<typeof createTransferSchema>>
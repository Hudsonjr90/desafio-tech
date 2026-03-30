import { z } from "zod"

export const createTransferSchema = (balance: number) => {
  const formattedBalance = balance.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })

  return z.object({
    recipient: z.string().min(3, "Informe o destinatário"),
    amount: z.coerce
      .number()
      .positive("O valor deve ser maior que zero")
      .max(balance, `O valor não pode ser maior que ${formattedBalance}`),
    description: z.string().optional(),
  })
}

export type TransferFormData = z.output<ReturnType<typeof createTransferSchema>>
export type TransferFormInput = z.input<ReturnType<typeof createTransferSchema>>
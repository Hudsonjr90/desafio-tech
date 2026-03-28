import { useMemo } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  createTransferSchema,
  type TransferFormData,
  type TransferFormInput,
} from "@/features/transfer/schemas/transfer.schema"

interface TransferFormProps {
  balance: number
  onSubmitTransfer: (data: TransferFormData) => Promise<void> | void
}

export function TransferForm({
  balance,
  onSubmitTransfer,
}: TransferFormProps) {
  const schema = useMemo(() => createTransferSchema(balance), [balance])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TransferFormInput, unknown, TransferFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      recipient: "",
      amount: 0,
      description: "",
    },
  })

  return (
    <form
      onSubmit={handleSubmit(onSubmitTransfer)}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Input
          aria-label="Destinatário"
          placeholder="Nome do destinatário"
          {...register("recipient")}
        />
        {errors.recipient && (
          <p className="text-sm text-rose-400">{errors.recipient.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Input
          aria-label="Valor"
          type="number"
          step="0.01"
          placeholder="Valor"
          {...register("amount")}
          
        />
        {errors.amount && (
          <p className="text-sm text-rose-400">{errors.amount.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Input
          aria-label="Descrição"
          placeholder="Descrição (opcional)"
          {...register("description")}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Processando..." : "Transferir"}
      </Button>
    </form>
  )
}
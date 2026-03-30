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
  const maxAmountLength = balance.toFixed(2).length
  const formattedBalance = balance.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<TransferFormInput, unknown, TransferFormData>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      recipient: "",
      amount: undefined,
      description: "",
    },
  })

  const normalizeAmountInput = (value: string) => {
    const digitsAndSeparator = value.replace(",", ".").replace(/[^\d.]/g, "")
    const [integerPart = "", ...decimalParts] = digitsAndSeparator.split(".")
    const decimalPart = decimalParts.join("").slice(0, 2)
    const normalizedValue = decimalPart ? `${integerPart}.${decimalPart}` : integerPart

    return normalizedValue.slice(0, maxAmountLength)
  }

  const amountField = register("amount", {
    setValueAs: (value) => {
      if (value === "") {
        return undefined
      }

      return Number(String(value).replace(",", "."))
    },
    onChange: (event) => {
      event.target.value = normalizeAmountInput(event.target.value)
      void trigger("amount")
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
          type="text"
          inputMode="decimal"
          maxLength={maxAmountLength}
          placeholder={`Disponível: ${formattedBalance}`}
          {...amountField}
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
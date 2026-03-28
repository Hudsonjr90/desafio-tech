import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TransferForm } from "@/features/transfer/components/transfer-form"
import type { TransferFormData } from "@/features/transfer/schemas/transfer.schema"
import { useWalletStore } from "@/features/wallet/store/wallet.store"
import { AppShell } from "@/shared/components/layout/app-shell"

export function TransferPage() {
  const navigate = useNavigate()
  const balance = useWalletStore((state) => state.balance)
  const addTransfer = useWalletStore((state) => state.addTransfer)

  const handleTransfer = async (data: TransferFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 500))

    addTransfer({
      recipient: data.recipient,
      amount: data.amount,
      description: data.description,
    })

    toast.success("Transferência realizada com sucesso!")
    navigate("/")
  }

  return (
    <AppShell>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Nova transferência</h1>
        <Button variant="outline" onClick={() => navigate(-1)}>
          Voltar
        </Button>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Enviar dinheiro</CardTitle>
          <p className="text-sm text-muted-foreground">
            Saldo disponível:{" "}
            <span className="font-semibold text-emerald-400">
              {balance.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </p>
        </CardHeader>

        <CardContent>
          <TransferForm balance={balance} onSubmitTransfer={handleTransfer} />
        </CardContent>
      </Card>
    </AppShell>
  )
}
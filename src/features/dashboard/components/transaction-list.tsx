import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { Transaction } from "@/shared/types"

interface TransactionListProps {
  transactions: Transaction[]
}

export function TransactionList({ transactions }: TransactionListProps) {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleOpenTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setIsDialogOpen(true)
  }

  return (
    <>
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg">Últimas transações</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {transactions.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhuma transação encontrada.</p>
          ) : (
            transactions.map((transaction) => (
              <button
                key={transaction.id}
                type="button"
                onClick={() => handleOpenTransaction(transaction)}
                className="flex w-full flex-col items-start gap-2 rounded-lg border border-border p-3 text-left transition-colors hover:bg-muted/40 sm:flex-row sm:items-center sm:justify-between cursor-pointer"
              >
                <div>
                  <p className="font-medium text-foreground">{transaction.recipient}</p>
                  <p className="text-sm text-muted-foreground">
                    {transaction.description || "Transferência"}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <p className="font-semibold text-rose-400">
                    -{" "}
                    {transaction.amount.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(transaction.createdAt).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </button>
            ))
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalhes da transação</DialogTitle>
            <DialogDescription>
              Informações completas da movimentação selecionada.
            </DialogDescription>
          </DialogHeader>

          {selectedTransaction && (
            <div className="mt-4 space-y-3">
              <div className="rounded-md border border-border p-3">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Destinatário</p>
                <p className="font-medium text-foreground">{selectedTransaction.recipient}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-md border border-border p-3">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Valor</p>
                  <p className="font-semibold text-rose-400">
                    -{" "}
                    {selectedTransaction.amount.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </div>

                <div className="rounded-md border border-border p-3">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Tipo</p>
                  <p className="font-medium text-foreground">Transferência</p>
                </div>
              </div>

              <div className="rounded-md border border-border p-3">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Descrição</p>
                <p className="font-medium text-foreground">
                  {selectedTransaction.description || "Sem descrição"}
                </p>
              </div>

              <div className="rounded-md border border-border p-3">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Data e hora</p>
                <p className="font-medium text-foreground">
                  {new Date(selectedTransaction.createdAt).toLocaleDateString("pt-BR")} às {new Date(selectedTransaction.createdAt).toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Transaction } from "@/shared/types"

interface TransactionListProps {
  transactions: Transaction[]
}

export function TransactionList({ transactions }: TransactionListProps) {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg">Últimas transações</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {transactions.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nenhuma transação encontrada.</p>
        ) : (
          transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex flex-col items-start gap-2 rounded-lg border border-border p-3 sm:flex-row sm:items-center sm:justify-between"
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
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
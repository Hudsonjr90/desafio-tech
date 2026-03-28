import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface BalanceCardProps {
  balance: number
}

export function BalanceCard({ balance }: BalanceCardProps) {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Saldo disponível
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold text-emerald-400">
          {balance.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
      </CardContent>
    </Card>
  )
}
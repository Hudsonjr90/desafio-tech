import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { BalanceCard } from "@/features/dashboard/components/balance-card"
import { TransactionList } from "@/features/dashboard/components/transaction-list"
import { useTransactions } from "@/features/dashboard/hooks/use-transaction"
import { useAuthStore } from "@/features/auth/store/auth.store"
import { useWalletStore } from "@/features/wallet/store/wallet.store"
import { AppShell } from "@/shared/components/layout/app-shell"

export function DashboardPage() {
  const user = useAuthStore((state) => state.user)
  const balance = useWalletStore((state) => state.balance)
  const newTransactions = useWalletStore((state) => state.transactions)
  const { data: fetchedTransactions = [] } = useTransactions()

  const transactions = [...newTransactions, ...fetchedTransactions]

  return (
    <AppShell>
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl leading-tight font-bold sm:text-2xl">Olá, {user?.name ?? "Usuário"}</h1>
          <p className="text-sm text-muted-foreground">Bem-vindo à sua conta digital</p>
        </div>

        <div className="grid w-full gap-2 sm:w-auto">
          <Button asChild className="w-full sm:w-auto">
            <Link to="/transfer">Nova transferência</Link>
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <BalanceCard balance={balance} />
        <TransactionList transactions={transactions} />
      </div>
    </AppShell>
  )
}
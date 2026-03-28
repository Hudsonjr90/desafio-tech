import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { BalanceCard } from "@/features/dashboard/components/balance-card"
import { TransactionList } from "@/features/dashboard/components/transaction-list"
import { useAuthStore } from "@/features/auth/store/auth.store"
import { useWalletStore } from "@/features/wallet/store/wallet.store"
import { AppShell } from "@/shared/components/layout/app-shell"

export function DashboardPage() {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const balance = useWalletStore((state) => state.balance)
  const transactions = useWalletStore((state) => state.transactions)

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <AppShell>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Olá, {user?.name ?? "Usuário"}</h1>
          <p className="text-sm text-muted-foreground">Bem-vindo à sua conta digital</p>
        </div>

        <div className="flex gap-2">
          <Button asChild>
            <Link to="/transfer">Nova transferência</Link>
          </Button>
          <Button variant="outline" className="cursor-pointer" onClick={handleLogout}>
            Sair
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
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
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl leading-tight font-bold sm:text-2xl">Olá, {user?.name ?? "Usuário"}</h1>
          <p className="text-sm text-muted-foreground">Bem-vindo à sua conta digital</p>
        </div>

        <div className="grid w-full gap-2 sm:flex sm:w-auto">
          <Button asChild className="w-full sm:w-auto">
            <Link to="/transfer">Nova transferência</Link>
          </Button>
          <Button variant="outline" className="w-full cursor-pointer sm:w-auto" onClick={handleLogout}>
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
import type { Transaction } from "@/shared/types"

export const mockTransactions: Transaction[] = [
  {
    id: crypto.randomUUID(),
    type: "transfer",
    recipient: "Maria Souza",
    amount: 150,
    description: "Pagamento de serviço",
    createdAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    type: "transfer",
    recipient: "Carlos Lima",
    amount: 89.9,
    description: "Reembolso",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
]
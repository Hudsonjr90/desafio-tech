import { create } from "zustand"
import { mockTransactions } from "@/shared/mocks/transactions"
import type { Transaction } from "@/shared/types"

interface WalletState {
  balance: number
  transactions: Transaction[]
  addTransfer: (data: Omit<Transaction, "id" | "createdAt" | "type">) => void
}

export const useWalletStore = create<WalletState>((set) => ({
  balance: 1250.75,
  transactions: mockTransactions,
  addTransfer: (data) =>
    set((state) => ({
      balance: state.balance - data.amount,
      transactions: [
        {
          id: crypto.randomUUID(),
          type: "transfer",
          createdAt: new Date().toISOString(),
          ...data,
        },
        ...state.transactions,
      ],
    })),
}))
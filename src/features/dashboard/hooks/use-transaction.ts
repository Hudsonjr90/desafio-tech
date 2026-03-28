import { useQuery } from "@tanstack/react-query"
import { api } from "@/shared/lib/axios"
import type { Transaction } from "@/shared/types"

export function useTransactions() {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const response = await api.get<Transaction[]>("/transactions")
      return response.data
    },
  })
}
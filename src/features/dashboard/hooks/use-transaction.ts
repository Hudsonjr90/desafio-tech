import { useQuery } from "@tanstack/react-query"
import { mockTransactions } from "@/shared/mocks/transactions"

export function useTransactions() {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return mockTransactions
    },
  })
}
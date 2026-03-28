import axios from "axios"
import { mockTransactions } from "@/shared/mocks/transactions"

export const api = axios.create({
  baseURL: "/api",
  timeout: 5000,
})

// Intercepta requisições antes de chegar à rede e retorna dados mockados
api.interceptors.request.use((config) => {
  if (config.url?.includes("/transactions")) {
    config.adapter = async (adapterConfig) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return {
        data: mockTransactions,
        status: 200,
        statusText: "OK",
        headers: {},
        config: adapterConfig,
        request: {},
      }
    }
  }
  return config
})

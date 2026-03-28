export interface User {
  id: string
  name: string
  email: string
}

export interface Transaction {
  id: string
  type: 'transfer'
  recipient: string
  amount: number
  description?: string
  createdAt: string
}

export interface WalletState {
  balance: number
  transactions: Transaction[]
}
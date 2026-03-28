import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User } from "@/shared/types"

type AuthUser = User & {
  password: string
}

type RegisterPayload = {
  firstName: string
  lastName: string
  email: string
  password: string
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  users: AuthUser[]
  loginWithCredentials: (email: string, password: string) => { ok: boolean; message?: string }
  registerUser: (payload: RegisterPayload) => { ok: boolean; message?: string }
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      users: [],
      loginWithCredentials: (email, password) => {
        const normalizedEmail = email.trim().toLowerCase()
        const existingUser = get().users.find((registeredUser) => registeredUser.email === normalizedEmail)

        if (!existingUser) {
          return { ok: false, message: "Conta não encontrada. Faça seu cadastro primeiro." }
        }

        if (existingUser.password !== password) {
          return { ok: false, message: "Senha incorreta." }
        }

        set({
          isAuthenticated: true,
          user: {
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email,
          },
        })

        return { ok: true }
      },
      registerUser: ({ firstName, lastName, email, password }) => {
        const normalizedEmail = email.trim().toLowerCase()
        const alreadyExists = get().users.some((registeredUser) => registeredUser.email === normalizedEmail)

        if (alreadyExists) {
          return { ok: false, message: "Já existe uma conta com esse e-mail." }
        }

        const newUser: AuthUser = {
          id: crypto.randomUUID(),
          name: `${firstName.trim()} ${lastName.trim()}`.trim(),
          email: normalizedEmail,
          password,
        }

        set((state) => ({
          users: [...state.users, newUser],
        }))

        return { ok: true }
      },
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    {
      name: "onda-auth",
    }
  )
)
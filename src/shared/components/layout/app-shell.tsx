import type { PropsWithChildren } from "react"
import { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuthStore } from "@/features/auth/store/auth.store"
import { ThemeToggle } from "@/shared/components/layout/theme-toggle"

export function AppShell({ children }: PropsWithChildren) {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  const initials = useMemo(() => {
    if (!user?.name) {
      return "US"
    }

    const [firstName, lastName] = user.name.trim().split(/\s+/)
    const firstInitial = firstName?.[0] ?? "U"
    const lastInitial = lastName?.[0] ?? firstName?.[1] ?? "S"

    return `${firstInitial}${lastInitial}`.toUpperCase()
  }, [user?.name])

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card/60 backdrop-blur-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <p className="text-sm font-medium text-muted-foreground">Onda Finance</p>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-xs font-semibold text-foreground transition-colors hover:bg-muted cursor-pointer"
                  aria-label="Abrir menu do usuário"
                >
                  {initials}
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="py-2">
                  <p className="truncate text-sm font-medium">{user?.name ?? "Usuário"}</p>
                  <p className="truncate text-xs text-muted-foreground">{user?.email ?? ""}</p>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={handleLogout}>Sair</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-6 sm:py-8">{children}</main>
    </div>
  )
}
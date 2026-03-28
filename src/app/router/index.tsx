import { createBrowserRouter } from "react-router-dom"
import { ProtectedRoute } from "@/app/router/protected-route"
import { LoginPage } from "@/features/auth/pages/login-page"
import { RegisterPage } from "@/features/auth/pages/register-page"
import { DashboardPage } from "@/features/dashboard/pages/dashboard-page"
import { TransferPage } from "@/features/transfer/pages/transfer-page"

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
      {
        path: "/transfer",
        element: <TransferPage />,
      },
    ],
  },
])
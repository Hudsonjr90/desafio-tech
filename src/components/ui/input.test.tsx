import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Input } from "./input"

describe("Input", () => {
  it("mantém o botão de mostrar senha disponível após digitação e blur", async () => {
    const user = userEvent.setup()

    render(<Input aria-label="Senha" type="password" />)

    const passwordField = screen.getByLabelText(/senha/i, { selector: "input" })

    await user.type(passwordField, "123456")
    await user.tab()

    const toggleButton = screen.getByRole("button", { name: /mostrar senha/i })

    expect(toggleButton).toBeInTheDocument()

    await user.click(toggleButton)

    expect(passwordField).toHaveAttribute("type", "text")
    expect(screen.getByRole("button", { name: /ocultar senha/i })).toBeInTheDocument()
  })
})
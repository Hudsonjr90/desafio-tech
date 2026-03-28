import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { TransferForm } from "./transfer-form"

describe("TransferForm", () => {
  it("deve enviar uma transferência válida", async () => {
    const user = userEvent.setup()
    const onSubmitTransfer = vi.fn()

    render(
      <TransferForm balance={1000} onSubmitTransfer={onSubmitTransfer} />
    )

    await user.type(screen.getByLabelText(/destinatário/i), "João Silva")
    await user.clear(screen.getByLabelText(/valor/i))
    await user.type(screen.getByLabelText(/valor/i), "100")
    await user.type(screen.getByLabelText(/descrição/i), "Pagamento")

    await user.click(screen.getByRole("button", { name: /transferir/i }))

    expect(onSubmitTransfer).toHaveBeenCalled()
  })

  it("deve exibir erro se o valor for maior que o saldo", async () => {
    const user = userEvent.setup()
    const onSubmitTransfer = vi.fn()

    render(
      <TransferForm balance={100} onSubmitTransfer={onSubmitTransfer} />
    )

    await user.type(screen.getByLabelText(/destinatário/i), "João Silva")
    await user.clear(screen.getByLabelText(/valor/i))
    await user.type(screen.getByLabelText(/valor/i), "1000")

    await user.click(screen.getByRole("button", { name: /transferir/i }))

    expect(await screen.findByText(/saldo insuficiente/i)).toBeInTheDocument()
    expect(onSubmitTransfer).not.toHaveBeenCalled()
  })
})
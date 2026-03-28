# Onda Finance - Desafio Front-End

Aplicação web que simula um app bancário simples, desenvolvida como solução para o desafio técnico da Onda Finance.

## Demo

- Produção (Vercel): https://ondafinance-tech.vercel.app

## Tecnologias

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- shadcn/ui + Radix UI
- React Router
- Zustand
- React Hook Form + Zod
- React Query
- Sonner
- Axios
- Vitest + Testing Library

## Funcionalidades

- Cadastro mockado de usuário (nome, sobrenome, e-mail e senha)
- Login por credenciais cadastradas
- Persistência de sessão e usuários mockados com Zustand Persist
- Dashboard com saudação dinâmica usando o nome do usuário autenticado
- Listagem de transações mockadas
- Modal/Dialog com detalhes da transação ao clicar no item
- Fluxo de transferência com validações de formulário
- Atualização de saldo e transações no estado local
- Rotas protegidas
- Alternância de tema (dark/light)
- Layout responsivo para mobile e desktop

## Rotas

- `/login`: autenticação
- `/register`: cadastro de novo usuário
- `/`: dashboard (protegida)
- `/transfer`: nova transferência (protegida)

## Como rodar localmente

```bash
npm install
npm run dev
```

Aplicação disponível em `http://localhost:5173`.

## Scripts disponíveis

```bash
npm run dev      # ambiente de desenvolvimento
npm run build    # build de produção
npm run preview  # pré-visualização do build
npm run lint     # lint
npm run test     # testes com vitest
npm run test:ui  # interface gráfica do vitest
```

## Estrutura de pastas

```txt
src/
	app/
		providers/
		router/
	features/
		auth/
		dashboard/
		transfer/
		wallet/
	shared/
		components/
		lib/
		mocks/
		types/
	components/
		ui/
```

## Decisões técnicas

- Arquitetura feature-based para escalar por domínio de negócio.
- Zustand para estado global simples e previsível.
- Persistência local para simular autenticação sem backend.
- React Hook Form + Zod para validação tipada.
- shadcn/ui + Radix para acessibilidade e consistência de componentes.
- Tailwind CSS para estilização rápida e responsiva.

## Deploy na Vercel

Para evitar erro `404` ao dar refresh em rotas como `/login` e `/transfer`, o projeto usa rewrite SPA em `vercel.json`:

```json
{
	"rewrites": [
		{
			"source": "/(.*)",
			"destination": "/index.html"
		}
	]
}
```

## Segurança (conceitual)

Este projeto usa autenticação mockada para fins de desafio técnico. Em produção, as validações sensíveis devem estar no backend.

Boas práticas:

- Não expor segredos/chaves no frontend
- Validar autenticação e autorização no backend
- Usar HTTPS em todo o tráfego
- Evitar armazenamento de dados sensíveis no cliente
- Aplicar princípio do menor privilégio
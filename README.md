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

### Proteção contra engenharia reversa

- **Ofuscação e minificação**: o Vite já gera bundles minificados em produção, dificultando a leitura do código. Em cenários mais críticos, ferramentas como javascript-obfuscator podem ser aplicadas no pipeline de build.
- **Lógica sensível no backend**: regras de negócio, cálculos de saldo, validação de autenticação e geração de tokens devem residir exclusivamente no servidor — o cliente nunca deve ser fonte de verdade.
- **Variáveis de ambiente**: chaves de API e segredos ficam apenas em variáveis de ambiente server-side (`.env` nunca vai para o repositório nem para o bundle do cliente).
- **Code splitting e lazy loading**: reduz a superfície de código exposta por rota, dificultando análise estática do bundle completo.

### Proteção contra vazamento de dados

- **HTTPS obrigatório**: toda comunicação entre cliente e servidor deve ser criptografada via TLS.
- **Tokens com expiração curta**: JWTs ou session tokens devem ter TTL reduzido e refresh token rotativo, limitando a janela de exploração caso sejam comprometidos.
- **Nenhum dado sensível em localStorage/sessionStorage**: senhas, tokens de acesso e PII não devem ser persistidos em storage do browser sem criptografia adicional.
- **Content Security Policy (CSP)**: headers CSP no servidor impedem injeção de scripts externos e exfiltração de dados via XSS.
- **Sanitização de inputs**: todas as entradas do usuário são validadas via Zod antes de qualquer processamento, evitando injeção de dados maliciosos.
- **Princípio do menor privilégio**: cada endpoint de API deve verificar se o usuário autenticado tem permissão para acessar apenas os seus próprios dados.

## Melhorias futuras

- **Backend real**: substituir os mocks por uma API REST ou GraphQL com banco de dados, autenticação JWT e refresh token.
- **Paginação de transações**: carregar transações com cursor/infinite scroll via React Query para suportar históricos longos.
- **Extrato em PDF**: exportar o histórico de transações do dashboard.
- **Autenticação multifator (MFA)**: adicionar TOTP ou SMS OTP como segundo fator no login.
- **Notificações em tempo real**: usar WebSockets ou SSE para atualizar saldo e transações sem recarregar a página.
- **Internacionalização (i18n)**: suporte a múltiplos idiomas com `react-i18next`.
- **Testes end-to-end**: adicionar suite E2E com Playwright cobrindo os fluxos críticos de login e transferência.
- **Rate limiting e CAPTCHA**: proteger o formulário de login contra ataques de força bruta.
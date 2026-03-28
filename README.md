# Onda Finance - Desafio Front-End

Aplicação web que simula um app bancário simples, desenvolvida como solução para o desafio técnico da Onda Finance.

## Tecnologias utilizadas

- React + TypeScript
- Vite
- Tailwind CSS v4
- CVA
- shadcn/ui + Radix UI
- React Router
- React Query
- Zustand
- React Hook Form + Zod
- Axios
- Vitest + Testing Library

## Funcionalidades

- Login mockado com persistência de sessão
- Dashboard com exibição de saldo
- Listagem de transações mockadas
- Transferência com validação de formulário
- Atualização do saldo em tempo real
- Rotas protegidas

## Como rodar o projeto, testes e build

```bash
npm install
npm run dev
npm run test
npm run build
```



## Decisões técnicas adotadas

- Arquitetura feature-based: organização por domínio de negócio para facilitar escalabilidade e manutenção.
- Zustand: utilizado para estado global simples e previsível, com persistência de sessão.
- React Query: preparado para gerenciamento de dados assíncronos e cache.
- React Hook Form + Zod: validação tipada e integração fluida com formulários.
- shadcn/ui + Radix: componentes acessíveis, reutilizáveis e com boa base visual.
- Tailwind + CVA: estilização consistente e componível.

## Segurança (conceitual)
Como proteger contra engenharia reversa

Em uma aplicação real, o frontend nunca deve conter segredos, tokens privados ou regras críticas de negócio. Toda validação sensível deve ser feita no backend.

Boas práticas:

- Não expor chaves privadas no cliente
- Evitar lógica crítica exclusivamente no frontend
- Desabilitar source maps em produção, quando necessário
- Utilizar ofuscação apenas como camada complementar (não como segurança principal)
- Validar permissões e regras de negócio no backend

## Como proteger contra vazamento de dados

Em ambiente real, a proteção contra vazamento de dados exige uma combinação de segurança no transporte, armazenamento e controle de acesso.

Boas práticas:

- Utilizar HTTPS em todas as comunicações
- Preferir cookies HttpOnly e Secure para tokens reais
- Evitar armazenar dados sensíveis em localStorage
- Sanitizar e validar dados recebidos no backend
- Aplicar controle de acesso em rotas e endpoints
- Evitar logs com dados sensíveis
- Seguir o princípio do menor privilégio
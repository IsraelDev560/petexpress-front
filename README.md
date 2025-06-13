# PetExpress Frontend

A Next.js 15 project in TypeScript used for the final college assignment at Unimar. It serves as the front‑end for a veterinary clinic management system.

## 🇺🇸 English

### ⚠️ Important

This project depends on the [`petexpress-back`](https://github.com/IsraelDev560/petexpress-back) repository.  
To run the frontend locally, you must also clone and run the backend project, set up a PostgreSQL database, and create a user manually before logging in.  
More details can be found in the backend’s README.

## [Deploy](https://petexpress-front.vercel.app/)

#### This application is currently live at: https://petexpress-front.vercel.app/

- Login: UserTest
- Password: UserTest@123

### Requirements

- Node.js 18+
- [pnpm](https://pnpm.io/) 8+

### Setup

1. Clone the repository and install dependencies:
   ```bash
   git clone <https://github.com/IsraelDev560/petexpress-front>
   cd petexpress-front
   pnpm install ou npm install
   ```
2. Rename the `.env.example` file in the root directory to .env and set the API endpoints used by the proxy routes:

   ```env
   API_URL=https://localhost:8080
   NEXT_PUBLIC_API_FRONT=http://localhost:3000

   # .env example
   API_URL="https://youbackend.com"
   API_URL_DEV="http://localhost:8080"
   NEXT_PUBLIC_API_FRONT="https://youfrontend"
   NEXT_PUBLIC_API_FRONT_DEV="http://localhost:3000"
   ```
   > These variables are used in the `lib/ApiUrl.ts` file to dynamically set which endpoints the app will use depending on the environment. <br>
   If NODE_ENV is "production", the values from API_URL and NEXT_PUBLIC_API_FRONT will be used. <br>
   Otherwise, during development  (NODE_ENV="development"), the app will use API_URL_DEV and NEXT_PUBLIC_API_FRONT_DEV.

   ## lib/ApiUrl.ts
   ```ts
   const isProd = process.env.NODE_ENV === "production";

   export const API_URL = isProd
   ? process.env.API_URL
   : process.env.API_URL_DEV;

   export const NEXT_PUBLIC_API_FRONT = isProd
   ? process.env.NEXT_PUBLIC_API_FRONT
   : process.env.NEXT_PUBLIC_API_FRONT_DEV;
   ```
------

3. Start the development server with Turbopack:
   ```bash
   pnpm run dev
   ````

4. For a production build run:
   ```bash
   pnpm run build
   pnpm start
   ```
   Linting is available with `pnpm lint`.

### Folder structure

```
petexpress-front/
├── app/             # Next.js pages and proxy API routes
│   ├── api/         # endpoints that forward requests to the backend
│   └── petexpress/  # protected dashboard pages
├── components/
│   ├── table/       # data table helpers
│   ├── ui/          # shadcn/ui primitives styled with Tailwind
│   └── utils/       # small reusable pieces (loading, feedback...)
├── context/         # authentication provider
├── hooks/           # custom React hooks
├── lib/             # generic helpers like `apiClient.ts`
├── schemas/         # Zod schemas for forms and requests
├── service/
│   ├── client/      # CRUD functions for REST endpoints
│   └── server/      # server-side fetch utilities
├── types/           # shared TypeScript types
├── middleware.ts    # Next.js middleware for route protection
└── next.config.ts   # project configuration
```

### API routes

The `/app/api` directory exposes endpoints that act as a proxy to `${API_URL}`. Examples include:

- `POST /api/auth/login` and `POST /api/auth/logout` – authentication.
- `GET /api/animals/all`, `POST /api/animals`, `PATCH /api/animals/[id]`, `DELETE /api/animals/[id]` – animal management.
- `GET /api/tasks/all`, `POST /api/tasks`, `PATCH /api/tasks/[id]`, `DELETE /api/tasks/[id]` – tasks.
- `GET /api/tasks-type/all`, `POST /api/tasks-type`, `PATCH /api/tasks-type/[id]`, `DELETE /api/tasks-type/[id]` – task categories.
- `GET /api/users/all`, `POST /api/users`, `PATCH /api/users/[id]`, `DELETE /api/users/[id]` – user administration.

Authentication tokens are stored in cookies. The middleware (`middleware.ts`) redirects to `/` if the user is not logged in when visiting `//petexpress/**`.

---

## 🇧🇷 Português

## ⚠️ Importante

Este projeto depende do repositório [`petexpress-back`](https://github.com/IsraelDev560/petexpress-back).
Para rodar o frontend localmente, é necessário clonar e executar o backend, configurar um banco de dados e criar um usuário por lá.
Os detalhes completos estão no README do backend.

## [Deploy](https://petexpress-front.vercel.app/)

#### Atualmente essa aplicação se encontra em: https://petexpress-front.vercel.app/

- Login: UserTest
- Senha: UserTest@123

### Requisitos

- Node.js 18 ou superior
- [pnpm](https://pnpm.io/) 8 ou superior

### Configuração

1. Clone o repositório e instale as dependências:
   ```bash
   git clone <https://github.com/IsraelDev560/petexpress-front>
   cd petexpress-front
   pnpm install ou npm install
   ```
2. Renomeie o arquivo `.env.example` no diretório raiz para .env e defina os endpoints da API:
   ```env
   API_URL=https://localhost:8080
   NEXT_PUBLIC_API_FRONT=http://localhost:3000

   # .env exemplo

   API_URL="https://youbackend.com"
   API_URL_DEV="http://localhost:8080"
   NEXT_PUBLIC_API_FRONT="https://youfrontend"
   NEXT_PUBLIC_API_FRONT_DEV="http://localhost:3000"
   ```
   > Essas variáveis são utilizadas no arquivo lib/ApiUrl.ts para determinar dinamicamente quais endpoints serão usados pela aplicação. <br>
   Se o NODE_ENV estiver como "production", serão usadas as URLs API_URL e NEXT_PUBLIC_API_FRONT.<br>
   Durante o desenvolvimento (NODE_ENV="development"), serão utilizadas API_URL_DEV e NEXT_PUBLIC_API_FRONT_DEV.
   
   ## lib/ApiUrl.ts
   ```ts
   const isProd = process.env.NODE_ENV === "production";

   export const API_URL = isProd
   ? process.env.API_URL
   : process.env.API_URL_DEV;

   export const NEXT_PUBLIC_API_FRONT = isProd
   ? process.env.NEXT_PUBLIC_API_FRONT
   : process.env.NEXT_PUBLIC_API_FRONT_DEV;
   ```
-----

3. Inicie o servidor de desenvolvimento com Turbopack:
   ```bash
   pnpm run dev
   ```
4. Para gerar a versão de produção:
   ```bash
   pnpm run build
   pnpm start
   ```
   Utilize `pnpm lint` para executar os linters.

### Estrutura de pastas

```
petexpress-front/
├── app/             # páginas do Next.js e rotas de proxy
│   ├── api/         # endpoints que redirecionam para o backend
│   └── petexpress/  # páginas protegidas do painel
├── components/
│   ├── table/       # componentes de tabelas reutilizáveis
│   ├── ui/          # primitivos do shadcn/ui com Tailwind
│   └── utils/       # pequenos auxiliares (loading, feedback...)
├── context/         # provider de autenticação
├── hooks/           # hooks personalizados
├── lib/             # helpers genéricos como `apiClient.ts`
├── schemas/         # validações com Zod
├── service/
│   ├── client/      # funções CRUD para as rotas REST
│   └── server/      # utilidades para fetch no servidor
├── types/           # definições TypeScript compartilhadas
├── middleware.ts    # middleware do Next.js que protege rotas
└── next.config.ts   # configuração do projeto
```

### Rotas de API

O diretório `/app/api` expõe rotas que funcionam como proxy para `${API_URL}`. Exemplos:

- `POST /api/auth/login` e `POST /api/auth/logout` – autenticação.
- `GET /api/animals/all`, `POST /api/animals`, `PATCH /api/animals/[id]`, `DELETE /api/animals/[id]` – gestão de animais.
- `GET /api/tasks/all`, `POST /api/tasks`, `PATCH /api/tasks/[id]`, `DELETE /api/tasks/[id]` – tarefas.
- `GET /api/tasks-type/all`, `POST /api/tasks-type`, `PATCH /api/tasks-type/[id]`, `DELETE /api/tasks-type/[id]` – categorias de tarefa.
- `GET /api/users/all`, `POST /api/users`, `PATCH /api/users/[id]`, `DELETE /api/users/[id]` – administração de usuários.

O token de autenticação é armazenado em cookies. O arquivo `middleware.ts` redireciona para `/` caso o usuário não esteja logado ao acessar `//petexpress/**`.

# PetExpress Frontend

A Next.js 15 project in TypeScript used for the final college assignment at Unimar. It serves as the front‑end for a veterinary clinic management system.

## English

### Requirements
- Node.js 18+
- [pnpm](https://pnpm.io/) 8+

### Setup
1. Clone the repository and install dependencies:
   ```bash
   git clone <repo-url>
   cd petexpress-front
   pnpm install
   ```
2. Create a `.env.local` file in the root directory and define the API endpoints used by the proxy routes:
   ```env
   API_URL=https://api.example.com        # Backend base URL
   NEXT_PUBLIC_API_FRONT=http://localhost:3000
   ```
3. Start the development server with Turbopack:
   ```bash
   pnpm dev
   ```
4. For a production build run:
   ```bash
   pnpm build
   pnpm start
   ```
   Linting is available with `pnpm lint`.

### Folder structure
- `app/` – Next.js pages and API routes that forward requests to the backend.
- `components/` – Reusable React components and UI primitives (Radix UI + Tailwind).
- `context/` – User context provider used for authentication state.
- `hooks/` – Custom hooks such as `useIsMobile`.
- `service/` – Client and server utilities for interacting with the REST API.
  - `client/` – functions for CRUD operations on animals, tasks, users and task types.
  - `server/` – helper for server‑side fetches (`GetDatasService`).
- `schemas/` – Zod schemas that validate forms and request payloads.
- `lib/` – Generic helpers (`apiClient.ts`, `ApiUrl.ts`).
- `types/` – TypeScript types shared across the app.

### API routes
The `/app/api` directory exposes endpoints that act as a proxy to `${API_URL}`. Examples include:
- `POST /api/auth/login` and `POST /api/auth/logout` – authentication.
- `GET /api/animals/all`, `POST /api/animals`, `PATCH /api/animals/[id]`, `DELETE /api/animals/[id]` – animal management.
- `GET /api/tasks/all`, `POST /api/tasks`, `PATCH /api/tasks/[id]`, `DELETE /api/tasks/[id]` – tasks.
- `GET /api/tasks-type/all`, `POST /api/tasks-type` – task categories.
- `GET /api/users/all`, `POST /api/users` – user administration.

Authentication tokens are stored in cookies. The middleware (`middleware.ts`) redirects to `/` if the user is not logged in when visiting `/dashboard`.

---

## Português

### Requisitos
- Node.js 18 ou superior
- [pnpm](https://pnpm.io/) 8 ou superior

### Configuração
1. Clone o repositório e instale as dependências:
   ```bash
   git clone <repo-url>
   cd petexpress-front
   pnpm install
   ```
2. Crie um arquivo `.env.local` na raiz e defina os endpoints da API:
   ```env
   API_URL=https://api.exemplo.com       # URL base do backend
   NEXT_PUBLIC_API_FRONT=http://localhost:3000
   ```
3. Inicie o servidor de desenvolvimento com Turbopack:
   ```bash
   pnpm dev
   ```
4. Para gerar a versão de produção:
   ```bash
   pnpm build
   pnpm start
   ```
   Utilize `pnpm lint` para executar os linters.

### Estrutura de pastas
- `app/` – páginas e rotas API que fazem proxy para o backend.
- `components/` – componentes reutilizáveis (Radix UI + Tailwind).
- `context/` – provedor de contexto do usuário utilizado na autenticação.
- `hooks/` – hooks personalizados, como `useIsMobile`.
- `service/` – utilidades de comunicação REST.
  - `client/` – funções de CRUD para animais, tarefas, usuários e tipos de tarefa.
  - `server/` – auxiliar para requisições server side.
- `schemas/` – validações com Zod.
- `lib/` – helpers genéricos.
- `types/` – tipos TypeScript compartilhados.

### Rotas de API
O diretório `/app/api` expõe rotas que funcionam como proxy para `${API_URL}`. Exemplos:
- `POST /api/auth/login` e `POST /api/auth/logout` – autenticação.
- `GET /api/animals/all`, `POST /api/animals`, `PATCH /api/animals/[id]`, `DELETE /api/animals/[id]` – gestão de animais.
- `GET /api/tasks/all`, `POST /api/tasks`, `PATCH /api/tasks/[id]`, `DELETE /api/tasks/[id]` – tarefas.
- `GET /api/tasks-type/all`, `POST /api/tasks-type` – categorias de tarefa.
- `GET /api/users/all`, `POST /api/users` – administração de usuários.

O token de autenticação é armazenado em cookies. O arquivo `middleware.ts` redireciona para `/` caso o usuário não esteja logado ao acessar `/dashboard`.


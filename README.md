# Projeto guia de estudo para o ENEM

Este projeto utiliza o NestJS para criar uma API com autenticação via Google OAuth2, integração com o Prisma ORM para gerenciamento de dados do usuário e JWT para proteger as rotas.

## Tecnologias Utilizadas

- **NestJS**: Framework para construir APIs escaláveis e modulares.
- **Passport**: Middleware para autenticação no NestJS.
- **passport-google-oauth20**: Estratégia de autenticação com o Google.
- **JWT**: Para geração e verificação de tokens de autenticação.
- **Prisma**: ORM para interação com o banco de dados (SQLite neste caso).
- **SQLite**: Banco de dados utilizado no projeto.

## Funcionalidades

- Autenticação do usuário via Google OAuth2.
- Armazenamento e atualização dos dados do usuário no banco de dados (Google ID, email, nome, imagem de perfil).
- Proteção das rotas com JWT para garantir que apenas usuários autenticados possam acessar determinadas informações.
- Geração de tokens JWT após autenticação para garantir acesso seguro às rotas protegidas.

## Estrutura do Projeto

A estrutura do projeto segue os princípios do NestJS, com os módulos organizados por funcionalidades.

### Módulos

1. **Auth Module**:
   - Responsável pela autenticação com o Google.
   - Roteamento para login e callback do Google.
   - Proteção das rotas com JWT.
   - Geração de token JWT para autenticação futura.
2. **Prisma Service**:

   - Responsável pela interação com o banco de dados (SQLite).
   - Gerencia a criação, leitura e atualização dos dados do usuário no banco.

3. **Guards**:
   - **JwtAuthGuard**: Protege as rotas que exigem autenticação via JWT.

## Como Rodar o Projeto

### 1. Instalar as dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
GOOGLE_CLIENT_ID=seu-client-id
GOOGLE_CLIENT_SECRET=seu-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
APP_JWT_SECRET_KEY=seu-segredo-jwt
```

### 3. Rodar a aplicação

Para rodar o servidor em modo de desenvolvimento:

```bash
npm run start:dev
```

A aplicação estará disponível em `http://localhost:3000`.

## Endpoints

### 1. Autenticação com Google

- **GET** `/auth/google`

Inicia o processo de autenticação com o Google.

- **GET** `/auth/google/callback`

Recebe o retorno do Google após a autenticação. O usuário será autenticado e um token JWT será retornado.

### 2. Perfil do Usuário (Rota Protegida)

- **GET** `/auth/profile`

Retorna os dados do usuário autenticado. Esta rota é protegida por JWT e requer um token válido para acesso.

### 3. Possíveis Respostas

- **200 OK**: Retorno de sucesso com os dados do usuário ou o token JWT.
- **401 Unauthorized**: Quando o token JWT não for válido ou não for fornecido.

## Testando a Autenticação

1. Acesse `http://localhost:3000/auth/google` para iniciar o login com o Google.
2. Após o login, o Google redirecionará para o endpoint `/auth/google/callback`.
3. O token JWT será gerado e retornado ao usuário.

Para acessar o perfil do usuário, basta incluir o token JWT no cabeçalho da requisição para `/auth/profile`:

```bash
Authorization: Bearer <seu_token_jwt>
```

## Como Funciona

1. **Login com Google**: O usuário faz login usando a conta Google. O Google retorna um ID, email, nome e imagem do perfil.
2. **Criação/Atualização no Banco de Dados**: O sistema verifica se o usuário já existe no banco com base no `googleId`. Se não existir, cria um novo usuário. Caso contrário, atualiza os dados.
3. **Geração de JWT**: Após a autenticação bem-sucedida, um token JWT é gerado e retornado. Esse token será necessário para acessar rotas protegidas.
4. **Proteção com JWT**: O token gerado é utilizado para proteger rotas sensíveis, garantindo que apenas usuários autenticados possam acessar suas informações.

## Estrutura do Banco de Dados

O banco de dados utiliza SQLite e a tabela de `User` segue o seguinte modelo:

```prisma
model User {
  id            String   @id @default(uuid()) // ID único para cada usuário
  googleId      String   @unique // ID retornado pelo Google
  email         String   @unique // Email do usuário
  name          String?
  profileImage  String?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

## EM ATUALIZAÇÃO

# Plano Técnico: Back-end do App de Entregas

Este plano descreve os passos para implementar o serviço back-end da aplicação de entregas, aderindo às especificações fornecidas em `SPECIFICATION.md`.

### 1. Inicialização do Projeto e Configuração

*   **Inicializar Projeto:**
    *   Criar um novo diretório para o projeto (ex: `app-entregas-back`).
    *   Executar `npm init -y` para criar um arquivo `package.json`.
*   **Instalar Dependências:**
    *   **Core:** `npm install express cors`
    *   **TypeScript & Desenvolvimento:** `npm install --save-dev typescript @types/node @types/express @types/cors tsx`
        *   `tsx` será usado para `npm run dev` com hot-reloading.
*   **Configuração do TypeScript (`tsconfig.json`):**
    Criar um arquivo `tsconfig.json` com o seguinte conteúdo:
    ```json
    {
      "compilerOptions": {
        "rootDir": "src",
        "outDir": "dist",
        "target": "ES2022",
        "moduleResolution": "node",
        "module": "CommonJS",
        "esModuleInterop": true,
        "strict": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true
      },
      "include": ["src/**/*.ts"],
      "exclude": ["node_modules", "dist"]
    }
    ```
*   **Scripts do Package.json:**
    Adicionar os seguintes scripts ao `package.json`:
    ```json
    "scripts": {
      "dev": "tsx watch src/server.ts",
      "build": "tsc",
      "start": "node dist/server.js"
    }
    ```

### 2. Gerenciamento de Dados (Armazenamento em Memória)

*   **Estratégia:** Utilizar um padrão singleton ou exportação de módulo para um objeto central de armazenamento em memória. Este armazenamento conterá arrays para `users` (usuários) e `deliveries` (entregas).
*   **Diretório:** Criar `src/store/`.
*   **Implementação (`src/store/memoryStore.ts`):**
    *   Definir interfaces para a estrutura do armazenamento, ex: `MemoryStoreState`.
    *   Inicializar com dados fictícios conforme especificado:
        *   **Usuários:**
            *   `{ id: 'driver-carlos', name: 'Carlos Silva', email: 'carlos@entrega.com', password: '123' }`
            *   `{ id: 'driver-marcos', name: 'Marcos Souza', email: 'marcos@entrega.com', password: '123' }`
        *   **Entregas:**
            *   Para cada usuário: 5 entregas com status `PENDING` e 1 entrega com status `COMPLETED`. Popular com dados fictícios, mas plausíveis, para nome do cliente, endereços, preço e coordenadas.
    *   Exportar funções para acessar e manipular estes dados (ex: `getUsers`, `getDeliveries`, `addDelivery`, `updateDeliveryStatus`, `findDeliveryById`, `deleteDelivery`). Estas funções operarão diretamente nos arrays em memória.

### 3. Modelos de Dados (TypeScript)

*   **Diretório:** Criar `src/types/`.
*   **Interfaces (`src/types/index.ts`):**
    *   `Coordinate`:
        ```typescript
        interface Coordinate {
          lat: number;
          lng: number;
        }
        ```
    *   `RouteCoordinates`:
        ```typescript
        interface RouteCoordinates {
          pickup: Coordinate;
          delivery: Coordinate;
        }
        ```
    *   `User`:
        ```typescript
        interface User {
          id: string;
          name: string;
          email: string;
          password?: string; // For in-memory storage and auth checks
        }
        ```
    *   `DeliveryStatus`:
        ```typescript
        type DeliveryStatus = 'PENDING' | 'ACCEPTED' | 'DELIVERING' | 'COMPLETED';
        ```
    *   `Delivery`:
        ```typescript
        interface Delivery {
          id: string;
          driverId: string;
          clientName: string;
          pickupAddress: string;
          deliveryAddress: string;
          status: DeliveryStatus;
          price: number;
          coordinates: RouteCoordinates;
          createdAt: string; // ISO string format
          completedAt?: string; // ISO string format
        }
        ```

### 4. Design e Implementação da API

*   **Estrutura de Diretórios:**
    *   `src/controllers/`: Contém a lógica para o processamento das requisições.
    *   `src/routes/`: Define os endpoints da API e os mapeia para os controllers.
*   **Middleware:**
    *   Em `src/server.ts`, usar `cors()` para permitir requisições do front-end e `express.json()` para parsear corpos de requisição.
*   **Autenticação (`src/controllers/authController.ts`, `src/routes/authRoutes.ts`):**
    *   **Endpoint:** `POST /api/auth/login`
    *   **Lógica:** Recuperar usuários do armazenamento em memória. Validar email e senha. Se válidos, retornar o objeto do usuário (excluindo a senha) e um token de sessão fictício. Se inválidos, retornar 401.
*   **Entregas (`src/controllers/deliveryController.ts`, `src/routes/deliveryRoutes.ts`):**
    *   **Endpoint:** `GET /api/deliveries`
        *   **Lógica:** Recuperar todas as entregas do armazenamento. Opcionalmente, filtrar pelo parâmetro de query `driverId`.
    *   **Endpoint:** `GET /api/deliveries/:id`
        *   **Lógica:** Encontrar a entrega pelo ID no armazenamento. Retornar 404 se não for encontrada.
    *   **Endpoint:** `PATCH /api/deliveries/:id/status`
        *   **Payload:** `{ "status": DeliveryStatus }`
        *   **Lógica:** Encontrar a entrega pelo ID. Atualizar seu status. Se o status se tornar `COMPLETED`, definir `completedAt` para o timestamp atual. Retornar a entrega atualizada ou 400/404.
    *   **Endpoint:** `POST /api/deliveries`
        *   **Payload:** Dados da nova entrega.
        *   **Lógica:** Gerar um ID único (ex: usando o pacote `uuid` ou um contador incremental). Definir `createdAt` para o timestamp atual. Adicionar a nova entrega ao armazenamento.
    *   **Endpoint:** `PUT /api/deliveries/:id`
        *   **Payload:** Objeto completo de atualização.
        *   **Lógica:** Encontrar a entrega pelo ID. Atualizar suas propriedades com o payload fornecido.
    *   **Endpoint:** `DELETE /api/deliveries/:id`
        *   **Lógica:** Remover a entrega do armazenamento pelo ID.

### 5. Inicialização do Servidor

*   **Arquivo:** `src/server.ts`
*   **Lógica:**
    *   Importar `express`.
    *   Importar os middlewares `cors` e `express.json`.
    *   Importar as rotas.
    *   Criar uma instância da aplicação Express.
    *   Aplicar middlewares globais.
    *   Montar as rotas da API (ex: `/api/auth`, `/api/deliveries`).
    *   Definir uma porta (ex: `process.env.PORT || 3000`).
    *   Iniciar o servidor usando `app.listen()`.

### 6. Estrutura de Diretórios

A estrutura de diretórios sugerida é a seguinte:

```
.
├── dist/                  # Saída do código JavaScript compilado
├── node_modules/          # Dependências do projeto
├── src/
│   ├── controllers/       # Lógica de tratamento de requisições
│   ├── routes/            # Definições de rotas da API
│   ├── store/             # Armazenamento de dados em memória e dados fictícios
│   ├── types/             # Interfaces e tipos TypeScript
│   └── server.ts          # Configuração principal da aplicação Express
├── tsconfig.json          # Configuração do compilador TypeScript
├── package.json           # Manifesto do projeto e scripts
└── README.md              # Documentação do projeto (opcional, mas boa prática)
```

### 7. Fluxo de Trabalho de Desenvolvimento

*   **Servidor de Desenvolvimento (`npm run dev`):**
    *   Utiliza `tsx watch src/server.ts` para iniciar o servidor com hot-reloading. Mudanças nos arquivos de `src/` reiniciarão o servidor automaticamente.
*   **Build (`npm run build`):**
    *   Executa `tsc` para compilar o código TypeScript de `src/` para JavaScript em `dist/`.
*   **Início em Produção (`npm run start`):**
    *   Executa `node dist/server.js` para rodar o código JavaScript compilado.

Este plano fornece um roteiro técnico abrangente para a construção do back-end da aplicação de entregas, conforme especificado.
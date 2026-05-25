# Especificação Técnica: Back-end do App de Entregas (Em Memória)

Esta documentação especifica os requisitos para a criação de um serviço back-end independente, projetado para atender de forma imediata às necessidades de consumo de dados de uma aplicação front-end de entregas (focada no fluxo do entregador).

---

## 1. Scripts e Configurações de Ambiente

O arquivo package.json na raiz do projeto deve expor, no mínimo, os seguintes comandos operacionais:

* npm run dev: Inicialização do servidor em modo de desenvolvimento com hot-reload automático (utilizando tsx ou ts-node-dev).
* npm run build: Compilação estrita do código TypeScript para JavaScript nativo (utilizando tsc), direcionando a saída para o diretório dist/.
* npm run start: Execução do código compilado de produção (node dist/server.js).

O arquivo tsconfig.json deve mapear de forma explícita:
* "rootDir": "src"
* "outDir": "dist"
* "target": "ES2022" (ou superior)
* "moduleResolution": "node" (ou correspondente ao empacotador)

---

## 2. Entidades e Modelagem de Dados (TypeScript)

As seguintes interfaces de tipo devem ser declaradas dentro do escopo de tipos globais ou locais da aplicação (src/types/ ou correspondente):

### Usuário / Entregador (User)
interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
}

### Entrega / Corrida (Delivery)
interface Coordinate {
  lat: number;
  lng: number;
}

interface RouteCoordinates {
  pickup: Coordinate;
  delivery: Coordinate;
}

interface Delivery {
  id: string;
  driverId: string;
  clientName: string;
  pickupAddress: string;
  deliveryAddress: string;
  status: 'PENDING' | 'ACCEPTED' | 'DELIVERING' | 'COMPLETED';
  price: number;
  coordinates: RouteCoordinates;
  createdAt: string;
  completedAt?: string;
}

---

## 3. Estado Inicial em Memória (Mock State)

Para viabilizar testes imediatos de fluxo no front-end, o repositório de dados em memória deve ser inicializado estaticamente com a seguinte carga de dados fictícios:

### Usuários Pré-Cadastrados
1. Carlos Silva
   * ID: driver-carlos
   * E-mail: carlos@entrega.com
   * Senha: 123
2. Marcos Souza
   * ID: driver-marcos
   * E-mail: marcos@entrega.com
   * Senha: 123

### Volume de Entregas Mapeadas
Cada um dos dois entregadores acima deve iniciar obrigatoriamente com:
* 5 entregas com o status fixado em PENDING.
* 1 entrega com o status fixado em COMPLETED.

Nota: Os endereços de coleta/entrega, nomes de clientes, valores monetários (price) e coordenadas geográficas lat/lng devem ser populados com dados fictícios verossímeis.

---

## 4. Arquitetura de Endpoints da API (/api/...)

Todas as rotas devem responder sob o prefixo /api e utilizar obrigatoriamente os middlewares globais cors() (liberando requisições externas do front-end) e express.json() (parse de corpos de requisição em JSON).

### Autenticação (/api/auth)
* POST /api/auth/login
  * Payload: { "email": "...", "password": "..." }
  * Comportamento: Valida as credenciais contra a lista de usuários em memória.
  * Respostas: 
    * 200 OK: Retorna o objeto do usuário (removendo o campo sensível password) e um token/identificador de sessão fictício.
    * 401 Unauthorized: Caso as credenciais estejam incorretas.

### Fluxo de Operações do Entregador (/api/deliveries)
* GET /api/deliveries
  * Query Params: ?driverId=... (Opcional)
  * Comportamento: Retorna a listagem total de entregas. Se o parâmetro driverId for fornecido pelo front-end, filtra o array em memória retornando estritamente as entregas vinculadas ao entregador especificado (as 5 pendentes e a concluída).
* GET /api/deliveries/:id
  * Comportamento: Busca uma entrega em memória com base no ID fornecido na URL.
  * Respostas: 200 OK com o objeto completo ou 404 Not Found.
* PATCH /api/deliveries/:id/status
  * Payload: { "status": "ACCEPTED" | "DELIVERING" | "COMPLETED" }
  * Comportamento: Modifica diretamente o estado da propriedade status da entrega em memória. Se transicionado para COMPLETED, preenche automaticamente a propriedade completedAt com o timestamp atual.
  * Respostas: 200 OK com o objeto updated ou 400 Bad Request se o status enviado for inválido.

### CRUD de Gerenciamento e Apoio (/api/deliveries)
* POST /api/deliveries
  * Payload: Dados cadastrais da nova entrega.
  * Comportamento: Insere um novo objeto de entrega no array em memória, gerando automaticamente um ID único (ex: UUID ou string incremental) e definindo o createdAt. Útil para simular novas corridas surgindo dinamicamente.
* PUT /api/deliveries/:id
  * Payload: Objeto completo de atualização.
  * Comportamento: Atualiza os dados cadastrais estruturais de uma entrega ativa por ID.
* DELETE /api/deliveries/:id
  * Comportamento: Remove a entrega do array em memória por completo.

---

## 5. Organização de Diretórios Sugerida

A implementação deve seguir um padrão claro de separação de responsabilidades para garantir fácil manutenção:

* dist/ -> Código JavaScript compilado (gerado pelo build)
* node_modules/ -> Dependências locais do projeto
* src/controllers/ -> Lógica de controle e processamento das requisições
* src/routes/ -> Definição e mapeamento dos endpoints Express
* src/store/ -> Estados em memória (arrays de persistência síncrona)
* src/types/ -> Interfaces e definições de tipo TypeScript
* src/server.ts -> Arquivo central de inicialização e configuração do Express
* package.json -> Manifesto de dependências e scripts locais
* tsconfig.json -> Configuração do compilador TypeScript

---

## 6. API Security and Authentication

Todos os endpoints da API exigem autenticação via Bearer Token. O cliente deve enviar o cabeçalho `Authorization: Bearer <token>` em cada requisição. O backend validará este token contra uma chave secreta codificada, carregada da variável de ambiente `BEARER_TOKEN`. Caso o token esteja ausente ou seja inválido, o servidor deve responder com um status `401 Unauthorized`.

O endpoint `POST /api/auth/login` também estará protegido por este mecanismo de Bearer Token.

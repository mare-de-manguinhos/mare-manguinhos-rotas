# Maré Entregas — App de Entregas

Sistema de gerenciamento de entregas para entregadores do Complexo da Maré e Manguinhos, Rio de Janeiro.

---

## Visão Geral

Aplicação full-stack composta por:

- **`app-entregas-back`** — API REST em Node.js/Express/TypeScript com estado em memória
- **`app-entregas-front`** — Interface web em React/TypeScript/Tailwind CSS

O fluxo principal é voltado ao **entregador**: login, visualização de entregas pendentes, atualização de status, navegação via Google Maps e consulta do histórico.

---

## Estrutura do Projeto

```
mare-manguinhos-rotas/
├── app-entregas-back/   # Backend (API REST)
├── app-entregas-front/  # Frontend (SPA React)
└── docs/                # Documentação e especificações
```

---

## Backend (`app-entregas-back`)

### Tecnologias
- Node.js + Express 5
- TypeScript
- Estado em memória (sem banco de dados)
- Autenticação via Bearer Token fixo

### Configuração

```bash
cd app-entregas-back
cp .env.example .env
# Edite o .env e defina BEARER_TOKEN=uma_chave_secreta
npm install
npm run dev      # desenvolvimento com hot-reload
npm run build    # compilar para produção
npm run start    # executar build de produção
```

### Variáveis de Ambiente

| Variável       | Descrição                          | Exemplo         |
|----------------|------------------------------------|-----------------|
| `PORT`         | Porta do servidor (padrão: 3000)   | `3000`          |
| `BEARER_TOKEN` | Token fixo de autenticação da API  | `minha-chave`   |

### Endpoints

Todas as rotas exigem o header `Authorization: Bearer <BEARER_TOKEN>`.

#### Autenticação

| Método | Rota              | Descrição                  |
|--------|-------------------|----------------------------|
| POST   | `/api/auth/login` | Login do entregador        |

**Payload:** `{ "email": "carlos@entrega.com", "password": "123" }`

#### Entregas

| Método | Rota                          | Descrição                                         |
|--------|-------------------------------|---------------------------------------------------|
| GET    | `/api/deliveries`             | Lista todas as entregas (filtra por `X-User-ID`) |
| GET    | `/api/deliveries/pending`     | Entregas ativas (PENDENTE, SAIU_PARA_ENTREGA)    |
| GET    | `/api/deliveries/history`     | Entregas concluídas/terminadas                    |
| GET    | `/api/deliveries/:id`         | Detalhes de uma entrega                          |
| POST   | `/api/deliveries`             | Criar nova entrega                               |
| PUT    | `/api/deliveries/:id`         | Atualizar dados de uma entrega                   |
| PATCH  | `/api/deliveries/:id/status`  | Atualizar status de uma entrega                  |
| DELETE | `/api/deliveries/:id`         | Remover entrega                                  |

#### Status disponíveis

| Valor                    | Significado              |
|--------------------------|--------------------------|
| `PENDENTE`               | Aguardando retirada      |
| `SAIU_PARA_ENTREGA`      | Em rota                  |
| `ENTREGUE`               | Concluída com sucesso    |
| `ENDERECO_NAO_ENCONTRADO`| Endereço não localizado  |
| `CLIENTE_NAO_ENCONTRADO` | Cliente ausente          |
| `CANCELADA`              | Cancelada                |

### Dados Iniciais (Mock)

Dois entregadores pré-cadastrados, cada um com **5 entregas PENDENTE** + **1 ENTREGUE**:

| Nome          | E-mail              | Senha |
|---------------|---------------------|-------|
| Carlos Silva  | carlos@entrega.com  | 123   |
| Marcos Souza  | marcos@entrega.com  | 123   |

---

## Frontend (`app-entregas-front`)

### Tecnologias
- React 19 + TypeScript
- Vite + Tailwind CSS v4
- Zustand (gerenciamento de estado)
- Axios (requisições HTTP)
- React Router DOM v7

### Configuração

```bash
cd app-entregas-front
cp .env.example .env
# Configure as variáveis abaixo no .env
npm install
npm run dev      # servidor de desenvolvimento
npm run build    # build de produção
npm run preview  # preview do build
```

### Variáveis de Ambiente

| Variável            | Descrição                                | Exemplo                    |
|---------------------|------------------------------------------|----------------------------|
| `VITE_API_URL`      | URL base da API backend                  | `http://localhost:3000`    |
| `VITE_BEARER_TOKEN` | Token de acesso à API (mesmo do backend) | `minha-chave`              |

### Rotas da Aplicação

| Caminho          | Página              | Descrição                          |
|------------------|---------------------|------------------------------------|
| `/`              | Login               | Autenticação do entregador         |
| `/forgot-password` | Esqueci a senha   | Contato com suporte                |
| `/dashboard`     | Dashboard           | Lista de entregas ativas           |
| `/details/:id`   | Detalhes            | Informações e ações de uma entrega |
| `/history`       | Histórico           | Entregas concluídas e terminadas   |

### Funcionalidades

- Login com credenciais reais via API
- Listagem de entregas ativas com filtro e ordenação
- Detalhes da entrega: endereço, cliente, telefone
- Atualização de status diretamente pelo app
- Abertura da rota no Google Maps
- Cópia do endereço para área de transferência
- Histórico com filtro por tipo de conclusão
- Navegação inferior fixa (mobile-first)

---

## Como Rodar os Dois Juntos

**Terminal 1 — Backend:**
```bash
cd app-entregas-back
npm run dev
# API disponível em http://localhost:3000
```

**Terminal 2 — Frontend:**
```bash
cd app-entregas-front
npm run dev
# App disponível em http://localhost:5173
```

Certifique-se de que `VITE_BEARER_TOKEN` no frontend coincide com `BEARER_TOKEN` no backend.

---

## Testes

```bash
# Backend
cd app-entregas-back && npm run test

# Frontend
cd app-entregas-front && npm run test
```

---

## Desvios em Relação à Especificação Técnica

A implementação evoluiu além da especificação inicial (SDD) em alguns pontos:

| Item                   | SDD                            | Implementado                            |
|------------------------|--------------------------------|-----------------------------------------|
| Status de entrega      | PENDING / ACCEPTED / DELIVERING / COMPLETED | PENDENTE / SAIU_PARA_ENTREGA / ENTREGUE / ENDERECO_NAO_ENCONTRADO / CLIENTE_NAO_ENCONTRADO / CANCELADA |
| Endpoint de histórico  | Não especificado               | `GET /api/deliveries/history`           |
| Endpoint de pendentes  | Não especificado               | `GET /api/deliveries/pending`           |
| Filtragem por driver   | Query param `?driverId=`       | Header `X-User-ID` ou query param       |

---

## Autores

| Nome            | GitHub / Contato        |
|-----------------|-------------------------|
| Douglas Bolis   |                         |
| Gabriel Brito   |                         |
| Gustavo Laube   |                         |
| Jhovany Paulo   |                         |

---

## Licença

Projeto interno — Associação de Moradores do Complexo da Maré e Manguinhos.

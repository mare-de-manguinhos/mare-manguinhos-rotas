# Tasks para o Projeto Maré Manguinhos - App Entregas (Front-end)

## Dependências entre User Stories
As User Stories devem ser implementadas na seguinte ordem para garantir um fluxo de trabalho coerente, embora algumas tarefas possam ser paralelizadas dentro de cada história:

1.  **US1 (P1) - Login de Entregador**: Necessária para acessar todas as outras funcionalidades.
2.  **US1 (P1) - Visualizar Entregas Pendentes**: Depende do login.
3.  **US1 (P1) - Visualizar Detalhes da Entrega**: Depende da listagem de entregas.
4.  **US2 (P2) - Recuperação de Senha**: Independente do fluxo principal de entregas, mas depende do sistema de autenticação.
5.  **US2 (P2) - Ordenação das Entregas**: Depende da visualização de entregas pendentes.
6.  **US3 (P2) - Visualizar Informações do Cliente**: Depende do detalhe da entrega.
7.  **US1 (P1) - Abrir Rota no Google Maps**: Depende do detalhe da entrega.
8.  **US1 (P1) - Visualizar Histórico de Entregas**: Depende do login e da conclusão de entregas.
9.  **US2 (P2) - Filtrar/Ordenar Histórico**: Depende da visualização do histórico.
10. **US4 (P1) - Atualizar Status da Entrega**: Depende da visualização de detalhes da entrega.

## Exemplos de Execução Paralela
*   **Setup e Configuração Inicial**: Muitas tarefas da Fase 1 e 2 podem ser executadas em paralelo por diferentes desenvolvedores (ex: configuração do ambiente, criação da estrutura básica, instalação de dependências de teste).
*   **Dentro de User Stories**:
    *   **US1 (Autenticação)**: Testes unitários para o hook de autenticação e a store do Zustand podem ser escritos enquanto o componente de login é desenvolvido.
    *   **US1 (Listagem)**: Testes unitários para o serviço de API de entregas podem ser feitos enquanto o componente da lista de entregas é construído.

## Estratégia de Implementação
A abordagem será de entrega incremental, focando no MVP (Minimum Viable Product) primeiro, que engloba as User Stories de Prioridade P1. Cada User Story será desenvolvida, testada e validada de forma independente.

### MVP (Mínimo Produto Viável)
O MVP inicial se concentrará em:
*   **US1 - Login de Entregador**
*   **US1 - Visualizar Entregas Pendentes**
*   **US1 - Visualizar Detalhes da Entrega**
*   **US1 - Abrir Rota no Google Maps**

---

## Fase 1: Setup do Projeto (Project Setup)

- [ ] T001 Criar novo projeto React com Vite e TypeScript no diretório raiz do projeto.
- [ ] T002 Configurar TailwindCSS para foco mobile-first responsivo.
- [ ] T003 Instalar dependências de gerenciamento de estado (Zustand).
- [ ] T004 Instalar dependências de persistência de dados (localStorage, se necessário alguma lib específica ou abstração).
- [ ] T005 [P] Instalar dependências de teste: `vitest`, `@testing-library/react`, `@testing-library/jest-dom`.
- [ ] T006 [P] Configurar `.env` com a variável de ambiente `VITE_API_URL`.
- [X] T007 Criar estrutura de diretórios base (`src/components`, `src/pages`, `src/hooks`, `src/services`, `src/stores`, `src/utils`, `src/types`).
- [ ] T064 [US3] Adicionar botão 'Sair' na `DashboardPage` e implementar a lógica de logout.
- [ ] T065 [US3] Adicionar botão 'Sair' na `DeliveryDetailsPage` e implementar a lógica de logout.
- [ ] T066 [US3] Adicionar botão 'Sair' na `HistoryPage` e implementar a lógica de logout.
- [ ] T068 [US1] Incluir o ID do usuário no header 'X-User-ID' em todas as requisições de API.

---

## Fase 2: Fundacional (Foundational)

- [X] T008 [P] Criar serviço de API base (`src/services/api/base.ts`) para lidar com requisições HTTP e interceptadores, usando `VITE_API_URL`.
- [X] T009 [P] Criar tipo `User` e `AuthResponse` em `src/types/auth.ts`.
- [X] T010 [P] Criar store de autenticação com Zustand (`src/stores/authStore.ts`) para gerenciar o estado do usuário logado e token, com persistência via `localStorage`.
- [X] T011 [P] Criar hook customizado `useAuth` (`src/hooks/useAuth.ts`) para encapsular a lógica de autenticação.
- [X] T012 [P] Criar testes unitários para `src/services/api/base.ts`.
- [X] T013 [P] Criar testes unitários para `src/stores/authStore.ts`.
- [X] T014 [P] Criar testes unitários para `src/hooks/useAuth.ts`.

---

## Fase 3: User Story 1 (P1) - Login de Entregador

- [ ] T015 [US1] Criar componente `LoginPage` (`src/pages/LoginPage.tsx`) com formulário de login (usuário/senha).
- [X] T016 [US1] Integrar `LoginPage` com `useAuth` para realizar login.
- [X] T017 [US1] Implementar validação de formulário de login e exibição de mensagens de erro.
- [X] T018 [US1] Adicionar navegação para o dashboard após login bem-sucedido.
- [X] T019 [P] [US1] Criar testes de renderização e comportamento para `src/pages/LoginPage.tsx` (verificar entrada de dados, submissão, exibição de erros).

---

## Fase 4: User Story 1 (P1) - Visualizar Entregas Pendentes

- [X] T020 [P] [US1] Criar tipo `Delivery` em `src/types/delivery.ts` com atributos como ID, cliente, endereço resumido, status.
- [X] T021 [P] [US1] Criar serviço de API para buscar entregas pendentes (`src/services/api/deliveryService.ts`).
- [X] T022 [P] [US1] Criar hook customizado `usePendingDeliveries` (`src/hooks/usePendingDeliveries.ts`) para gerenciar o estado da lista de entregas e a lógica de Pull-to-refresh.
- [X] T023 [P] [US1] Criar testes unitários para `src/services/api/deliveryService.ts`.
- [X] T024 [P] [US1] Criar testes unitários para `src/hooks/usePendingDeliveries.ts`.
- [X] T025 [US1] Criar componente `DeliveryListItem` (`src/components/DeliveryListItem.tsx`) para exibir informações sucintas de uma entrega.
- [X] T026 [US1] Criar componente `DashboardPage` (`src/pages/DashboardPage.tsx`) que utiliza `usePendingDeliveries` para exibir a lista de `DeliveryListItem`s.
- [X] T027 [US1] Implementar funcionalidade de Pull-to-refresh em `DashboardPage` para atualizar a lista.
- [X] T028 [US1] Adicionar lógica para exibir "Nenhuma entrega pendente no momento" quando a lista estiver vazia.
- [X] T029 [P] [US1] Criar testes de renderização e comportamento para `src/pages/DashboardPage.tsx` (verificar carregamento, exibição de lista/mensagem vazia, Pull-to-refresh).

---

## Fase 5: User Story 1 (P1) - Visualizar Detalhes da Entrega & Abrir Rota no Google Maps

- [X] T030 [P] [US1] Atualizar tipo `Delivery` (`src/types/delivery.ts`) para incluir endereço completo, nome do cliente e telefone (opcional).
- [X] T031 [P] [US1] Adicionar função ao `deliveryService` (`src/services/api/deliveryService.ts`) para buscar detalhes de uma entrega específica por ID.
- [X] T032 [P] [US1] Criar hook customizado `useDeliveryDetails` (`src/hooks/useDeliveryDetails.ts`) para gerenciar o estado dos detalhes da entrega.
- [X] T033 [P] [US1] Criar testes unitários para a função de detalhes de entrega em `src/services/api/deliveryService.ts`.
- [X] T034 [P] [US1] Criar testes unitários para `src/hooks/useDeliveryDetails.ts`.
- [X] T035 [US1] Criar componente `DeliveryDetailsPage` (`src/pages/DeliveryDetailsPage.tsx`) que utiliza `useDeliveryDetails` para exibir todos os detalhes da entrega.
- [X] T036 [US1] Implementar botão/link "Abrir Rota no Maps" em `DeliveryDetailsPage` que abre o Google Maps com o endereço da entrega.
- [X] T037 [US1] Implementar exibição de informações de contato do cliente (nome, telefone clicável).
- [X] T038 [US1] Adicionar lógica para copiar o endereço para a área de transferência caso o Google Maps não possa ser aberto.
- [X] T039 [P] [US1] Criar testes de renderização e comportamento para `src/pages/DeliveryDetailsPage.tsx` (verificar exibição de detalhes, funcionalidade do botão "Abrir Rota").

---

## Fase 6: User Story 2 (P2) - Recuperação de Senha (Contato com Suporte)

- [X] T040 [US2] Criar componente `ForgotPasswordPage` (`src/pages/ForgotPasswordPage.tsx`).
- [X] T041 [US2] Implementar interface em `ForgotPasswordPage` para instruir o entregador a contatar o suporte.
- [X] T042 [US2] Adicionar link "Esqueci minha senha" na `LoginPage` que redireciona para `ForgotPasswordPage`.
- [X] T043 [P] [US2] Criar testes de renderização e comportamento para `src/pages/ForgotPasswordPage.tsx` (verificar exibição das instruções de contato).

---

## Fase 7: User Story 2 (P2) - Ordenação das Entregas (Listagem)

- [X] T044 [US2] Adicionar funcionalidade de ordenação à `usePendingDeliveries` (`src/hooks/usePendingDeliveries.ts`).
- [X] T045 [US2] Integrar opções de ordenação na `DashboardPage` (`src/pages/DashboardPage.tsx`) (ex: por horário, por status).
- [X] T046 [P] [US2] Criar testes de comportamento para `src/pages/DashboardPage.tsx` (verificar se a lista é reordenada corretamente).

---

## Fase 8: User Story 3 (P2) - Visualizar Histórico de Entregas

- [X] T047 [P] [US3] Criar serviço de API para buscar histórico de entregas (`src/services/api/historyService.ts`).
- [X] T048 [P] [US3] Criar hook customizado `useDeliveryHistory` (`src/hooks/useDeliveryHistory.ts`) para gerenciar o estado do histórico de entregas.
- [X] T049 [P] [US3] Criar testes unitários para `src/services/api/historyService.ts`.
- [X] T050 [P] [US3] Criar testes unitários para `src/hooks/useDeliveryHistory.ts`.
- [X] T051 [US3] Criar componente `HistoryPage` (`src/pages/HistoryPage.tsx`) que utiliza `useDeliveryHistory` para exibir a lista de entregas realizadas.
- [X] T052 [US3] Implementar exibição de mensagem "Nenhuma entrega realizada ainda" quando o histórico estiver vazio.
- [X] T053 [P] [US3] Criar testes de renderização e comportamento para `src/pages/HistoryPage.tsx` (verificar carregamento, exibição de lista/mensagem vazia).

---

## Fase 9: User Story 2 (P2) - Filtrar/Ordenar Histórico

- [X] T054 [US2] Adicionar funcionalidade de filtro e ordenação a `useDeliveryHistory` (`src/hooks/useDeliveryHistory.ts`).
- [X] T055 [US2] Integrar opções de filtro e ordenação na `HistoryPage` (`src/pages/HistoryPage.tsx`).
- [X] T056 [P] [US2] Criar testes de comportamento para `src/pages/HistoryPage.tsx` (verificar se o histórico é filtrado/ordenado corretamente).

---

## Fase Final: Polish & Cross-Cutting Concerns

- [X] T057 [P] Implementar layout responsivo e mobile-first para todas as páginas usando TailwindCSS.
- [X] T058 [P] Configurar roteamento com React Router (ou equivalente) para as diferentes páginas (`/`, `/dashboard`, `/details/:id`, `/forgot-password`, `/history`).
- [X] T059 [P] Implementar tratamento global de erros (ex: interceptadores de erro na API, Boundary Errors no React).
- [X] T060 [P] Revisar e refatorar código para aderência às diretrizes de qualidade (nomenclatura, documentação JSDoc, componentização).
- [X] T061 [P] Otimizar desempenho geral do aplicativo (se necessário, após testes de performance).
- [X] T062 [P] Garantir acessibilidade (ARIA attributes, semantic HTML) em todos os componentes de UI.

## Fase 10: Implementação de Movimentação de Status de Entrega

- [ ] T067 [US4] Implementar seletor de status na `DeliveryDetailsPage.tsx`.
- [ ] T069 [US4] Adicionar chamada de API no `deliveryService.ts` para atualizar o status da entrega.
- [ ] T070 [US4] Atualizar a UI da `DeliveryDetailsPage.tsx` após a confirmação da atualização do status.
- [ ] T071 [US4] Adicionar testes unitários para a funcionalidade de atualização de status em `DeliveryDetailsPage.tsx`.
- [ ] T072 [US4] Atualizar `deliveryService.test.ts` se necessário para cobrir o novo endpoint.

# Feature Specification: Histórico de Entregas Realizadas

**Feature Branch**: `004-historico-entregas-realizadas`

**Created**: May 17, 2026

**Status**: Draft

**Input**: User description: "Histórico de entregas realizadas"

## User Scenarios & Testing (mandatory)

### User Story 1 - Visualizar Histórico de Entregas (Priority: P1)

Como um entregador logado, eu quero poder acessar um histórico de todas as entregas que já realizei, para que eu possa revisar minhas atividades passadas, verificar comprovantes (se houver) e ter um registro do meu desempenho.

**Why this priority**: É essencial para o entregador ter rastreabilidade e controle sobre seu trabalho concluído.

**Independent Test**: Pode ser testado após o login, garantindo que uma lista de entregas concluídas seja exibida e que os detalhes possam ser acessados.

**Acceptance Scenarios**:

1. **Given** que o entregador está logado, **When** ele acessa a seção "Histórico de Entregas", **Then** uma lista de todas as suas entregas concluídas (ou que não estão mais como pendentes) é exibida.
2. **Given** que o entregador está visualizando seu histórico, **When** ele clica em uma entrega concluída, **Then** os detalhes dessa entrega específica são exibidos (endereço, cliente, status final, data/hora de conclusão, comprovante se aplicável).
3. **Given** que o entregador está logado e não possui entregas concluídas no histórico, **When** ele acessa a seção "Histórico de Entregas", **Then** uma mensagem indicando "Nenhuma entrega realizada ainda" é exibida.

---

### User Story 2 - Filtrar/Ordenar Histórico (Priority: P2)

Como um entregador, eu quero poder filtrar ou ordenar meu histórico de entregas (por data, por exemplo), para que eu possa encontrar rapidamente uma entrega específica ou analisar meu desempenho em um período.

**Why this priority**: Facilita a análise e a busca por informações específicas, mas a visualização básica do histórico é mais crítica.

**Acceptance Scenarios**:

1. **Given** que o entregador está visualizando seu histórico de entregas, **When** ele seleciona uma opção de filtro (ex: "Por Data") e define um critério (ex: "Últimos 7 dias"), **Then** a lista de entregas é atualizada para mostrar apenas aquelas que atendem ao critério.
2. **Given** que o entregador está visualizando seu histórico de entregas, **When** ele seleciona uma opção de ordenação (ex: "Mais Recentes Primeiro"), **Then** a lista é reorganizada de acordo.

---

### Edge Cases

- O que acontece se o histórico de entregas for muito longo? Implementar paginação ou carregamento infinito, similar à lista de pendentes.
- Como o sistema lida com dados de entregas concluídas que podem estar incompletos ou inconsistentes? Exibir o que estiver disponível e indicar informações ausentes.
- O que acontece se a conexão com a internet cair enquanto o histórico está sendo carregado? Exibir mensagem de erro e permitir tentativa de recarga.

## Requirements (mandatory)

### Functional Requirements

- **FR-001**: O sistema DEVE permitir que o entregador acesse uma lista de suas entregas concluídas/realizadas.
- **FR-002**: Cada item no histórico DEVE exibir informações básicas sobre a entrega (ex: cliente, endereço, status final, data de conclusão).
- **FR-003**: O sistema DEVE permitir a visualização dos detalhes completos de uma entrega concluída ao selecionar um item do histórico.

# Feature Specification: Listagem de Entregas Pendentes

**Feature Branch**: `002-listagem-entregas-pendentes`

**Created**: May 17, 2026

**Status**: Draft

**Input**: User description: "Listagem de entregas pendentes para o entregador logado"

## User Scenarios & Testing (mandatory)

### User Story 1 - Visualizar Entregas Pendentes (Priority: P1)

Como um entregador logado no app Maré Manguinhos, eu quero ver uma lista clara de todas as entregas que foram destinadas a mim, para que eu possa saber quais tarefas preciso realizar.

**Why this priority**: É a funcionalidade central do app para o entregador; sem ela, o app não cumpre seu propósito principal.

**Independent Test**: Pode ser testado independentemente, garantindo que a lista é exibida corretamente após o login e que os dados das entregas estão presentes.

**Acceptance Scenarios**:

1. **Given** que o entregador está logado e tem entregas pendentes, **When** ele acessa a tela principal/dashboard, **Then** uma lista de suas entregas pendentes é exibida.
2. **Given** que o entregador está logado e não tem entregas pendentes, **When** ele acessa a tela principal/dashboard, **Then** uma mensagem indicando "Nenhuma entrega pendente no momento" é exibida.
3. **Given** que o entregador está logado, **When** a lista de entregas é carregada, **Then** cada item da lista exibe informações essenciais como: Nome do cliente (ou identificador), Endereço resumido (ou bairro/CEP), e Status atual da entrega (se aplicável).

---

### User Story 2 - Ordenação das Entregas (Priority: P2)

Como um entregador, eu quero que minhas entregas pendentes sejam ordenadas de forma lógica (ex: por proximidade ou horário de coleta/entrega), para que eu possa otimizar minha rota e tempo.

**Why this priority**: A ordenação melhora a eficiência do entregador, mas a visualização da lista é o requisito mais crítico.

**Independent Test**: Pode ser testado garantindo que a lista é exibida em uma ordem coerente, mesmo que a lógica exata de ordenação (proximidade, tempo) seja definida posteriormente ou via backend.

**Acceptance Scenarios**:

1. **Given** que o entregador tem várias entregas pendentes, **When** a lista de entregas é exibida, **Then** as entregas estão ordenadas em uma sequência que facilita a navegação (ex: pela ordem que aparece no dashboard).

---

### Edge Cases

- O que acontece se a lista de entregas for muito longa? Implementar paginação ou carregamento infinito.
- Como o app lida com dados de entrega incompletos ou mal formatados? Exibir um indicador de erro ou omitir a informação com uma nota, dependendo da criticidade.
- O que acontece se a conexão com a internet cair enquanto a lista está sendo carregada? Exibir uma mensagem de erro de conexão e tentar recarregar.

## Requirements (mandatory)

### Functional Requirements

- **FR-001**: O sistema DEVE exibir uma lista de entregas destinadas ao entregador logado.
- **FR-002**: Cada item na lista DEVE conter informações sucintas sobre a entrega (ex: nome do cliente, endereço resumido, status).
- **FR-003**: O sistema DEVE permitir que o entregador veja detalhes completos de uma entrega ao selecionar um item da lista.
- **FR-004**: O sistema DEVE indicar visualmente se não há entregas pendentes para o entregador.
- **FR-005**: O sistema DEVE carregar a lista de entregas pendentes automaticamente após o login ou ao acessar a tela principal.
- **FR-006**: O sistema DEVE suportar carregamento de mais entregas caso a lista seja extensa (ex: paginação ou scroll infinito).
- **FR-007**: O sistema DEVE permitir que o entregador atualize a lista de entregas pendentes manualmente através de um gesto de Pull-to-refresh.

### Key Entities (include if feature involves data)

- **Entrega**: Representa uma tarefa de entrega. Atributos chave incluem: ID da entrega, ID do entregador associado, Nome do cliente, Endereço completo, Status da entrega (Pendente, Em Rota, Entregue, Não Encontrado, etc.), Horário previsto de entrega.
- **Entregador**: Já definido na feature anterior, com ID e credenciais.

## Success Criteria (mandatory)

### Measurable Outcomes

- **SC-001**: Entregadores conseguem visualizar sua lista de entregas pendentes em até 3 segundos após o login ou acesso ao dashboard.
- **SC-002**: A lista de entregas exibe corretamente as informações essenciais para pelo menos 98% das visualizações.
- **SC-003**: A funcionalidade de listagem de entregas está disponível 99.9% do tempo.
- **SC-004**: Entregadores conseguem identificar rapidamente o status e o destino de suas entregas pendentes.

## Assumptions

- O backend fornecerá um endpoint para listar as entregas pendentes associadas a um entregador específico.
- Os dados das entregas (endereço, nome do cliente, status) serão fornecidos pelo backend.
- A ordenação inicial da lista pode ser baseada na ordem em que as entregas são recebidas do backend, ou uma ordenação padrão simples.
- A UI/UX da lista será clara e intuitiva para uso em dispositivos móveis.

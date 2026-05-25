# Feature Specification: Detalhamento da Entrega com Integração de Rota e Google Maps

**Feature Branch**: `003-delivery-details-route-google-maps`

**Created**: May 17, 2026

**Status**: Draft

**Input**: User description: "Detalhamento da entrega com integração de rota e Google Maps"

## User Scenarios & Testing (mandatory)

### User Story 1 - Visualizar Detalhes da Entrega (Priority: P1)

Como um entregador logado, eu quero visualizar todos os detalhes de uma entrega selecionada (incluindo endereço completo e informações do cliente), para que eu saiba exatamente para onde ir e com quem falar.

**Why this priority**: É fundamental para que o entregador possa executar a entrega corretamente.

**Independent Test**: Pode ser testado selecionando uma entrega da lista e verificando se todos os detalhes aparecem corretamente.

**Acceptance Scenarios**:

1. **Given** que o entregador está na tela de listagem de entregas pendentes, **When** ele clica em uma entrega específica, **Then** uma tela de detalhes da entrega é exibida com o nome do cliente, endereço completo e quaisquer outras informações relevantes.
2. **Given** que a tela de detalhes da entrega está aberta, **When** as informações são carregadas, **Then** o endereço do cliente é exibido de forma clara e legível.

---

### User Story 2 - Abrir Rota no Google Maps (Priority: P1)

Como um entregador, eu quero ter um atalho fácil para abrir o endereço de entrega diretamente no aplicativo Google Maps, para que eu possa navegar até o local de forma eficiente e precisa.

**Why this priority**: A navegação é uma parte crucial da entrega; integrar com o Google Maps melhora significativamente a experiência e a eficiência.

**Independent Test**: Pode ser testado clicando no botão/link para abrir o Google Maps e verificando se o endereço correto é passado para o aplicativo de navegação.

**Acceptance Scenarios**:

1. **Given** que o entregador está visualizando os detalhes de uma entrega, **When** ele clica no botão "Abrir Rota no Maps", **Then** o aplicativo Google Maps é aberto com o endereço da entrega pré-preenchido como destino.
2. **Given** que o entregador está visualizando os detalhes de uma entrega, **When** o endereço de entrega é inválido ou incompleto (por parte do backend), **Then** uma mensagem informativa é exibida, indicando que a rota não pôde ser gerada e talvez sugerindo verificar com o suporte.

---

### User Story 3 - Visualizar Informações do Cliente (Priority: P2)

Como um entregador, eu quero ter acesso às informações do cliente (ex: nome e talvez um telefone de contato, se disponível), para que eu possa me comunicar se necessário e personalizar a entrega.

**Why this priority**: Embora o endereço seja o principal, informações do cliente podem ser úteis para a conclusão bem-sucedida da entrega.

**Independent Test**: Pode ser testado garantindo que o nome do cliente e outras informações de contato (se disponíveis no backend) são exibidos na tela de detalhes.

**Acceptance Scenarios**:

1. **Given** que o entregador está visualizando os detalhes de uma entrega, **When** as informações são carregadas, **Then** o nome do cliente é exibido claramente.
2. **Given** que o entregador está visualizando os detalhes de uma entrega, **When** o número de telefone do cliente está disponível no backend, **Then** um link ou botão para ligar para o cliente é exibido.

---

### Edge Cases

- O que acontece se o Google Maps não estiver instalado no dispositivo do entregador? O sistema deve lidar com essa situação graciosamente, talvez exibindo uma mensagem ou permitindo a cópia do endereço para que o usuário cole manualmente em outro app.
- Como o sistema lida com endereços mal formatados vindos do backend? O sistema deve tentar o melhor possível para interpretar o endereço para o Google Maps, ou exibir uma mensagem de erro clara.
- O que acontece se a rota para um endereço específico não puder ser encontrada pelo Google Maps? O app deve informar o usuário.

## Requirements (mandatory)

### Functional Requirements

- **FR-001**: O sistema DEVE exibir os detalhes completos de uma entrega selecionada, incluindo nome do cliente e endereço completo.
- **FR-002**: O sistema DEVE fornecer um atalho (botão/link) para abrir o endereço de entrega no aplicativo Google Maps.
- **FR-003**: O sistema DEVE passar o endereço completo da entrega como parâmetro para o Google Maps.
- **FR-004**: O sistema DEVE exibir informações de contato do cliente (nome, telefone, se disponível) na tela de detalhes.
- **FR-005**: O sistema DEVE exibir mensagens de erro claras caso o endereço seja inválido ou a integração com o Google Maps falhe.
- **FR-006**: O sistema DEVE permitir que o entregador copie o endereço para a área de transferência caso o Google Maps não possa ser aberto diretamente.

### Key Entities (include if feature involves data)

- **Entrega**: Atributos chave adicionais incluem: Endereço completo (rua, número, complemento, bairro, cidade, estado, CEP), Nome do cliente, Telefone do cliente (opcional).
- **Rota**: Representa a rota calculada para a entrega (informação possivelmente gerada pelo backend ou pelo Google Maps).

## Success Criteria (mandatory)

### Measurable Outcomes

- **SC-001**: Entregadores conseguem visualizar os detalhes de uma entrega em menos de 2 segundos.
- **SC-002**: Clicar no atalho do Google Maps abre o aplicativo de navegação com o endereço correto em mais de 99% das tentativas em dispositivos com Google Maps instalado.
- **SC-003**: As informações essenciais da entrega (nome, endereço) são exibidas de forma clara e utilizável para 100% das entregas carregadas.
- **SC-004**: A funcionalidade de detalhamento de entrega e o atalho para o Google Maps estão disponíveis 99.9% do tempo.

## Assumptions

- O backend fornecerá o endereço completo da entrega em um formato estruturado que possa ser facilmente utilizado pelo Google Maps.
- O backend pode fornecer um número de telefone do cliente, mas isso não é garantido para todas as entregas.
- O aplicativo principal (front-end) é capaz de invocar aplicativos externos como o Google Maps.
- O Google Maps estará disponível e instalado na maioria dos dispositivos dos entregadores.
- A API do Google Maps para geocodificação ou abertura de rotas não exige autenticação específica do usuário final para esta funcionalidade básica (ou será tratada pelo sistema operacional/app do Google Maps).

## Status Management

### User Story 4 - Atualizar Status da Entrega (Priority: P1)

Como um entregador, eu quero poder atualizar o status de uma entrega diretamente da tela de detalhes (ex: "Saiu para entrega", "Entregue", "Endereço não encontrado"), para que o sistema reflita o progú o mais preciso possível do andamento da entrega.

**Why this priority**: Manter o status da entrega atualizado é crucial para o acompanhamento do fluxo logístico e para a comunicação com a plataforma/gerência.

**Independent Test**: Pode ser testado selecionando um novo status, confirmando a ação e verificando se o status é atualizado na tela de detalhes e na lista de entregas (se aplicável).

**Acceptance Scenarios**:

1. **Given** que o entregador está visualizando os detalhes de uma entrega, **When** ele seleciona um novo status válido (ex: "Saiu para entrega") em um seletor/botão, **Then** a tela de detalhes é atualizada para exibir o novo status, e o backend é notificado da mudança.
2. **Given** que o entregador está visualizando os detalhes de uma entrega, **When** ele tenta atualizar o status para um estado inválido ou em conflito com o fluxo (ex: marcar como "Entregue" antes de "Saiu para entrega"), **Then** uma mensagem de erro apropriada é exibida, e o status não é alterado.
3. **Given** que o entregador está visualizando os detalhes de uma entrega, **When** ele atualiza o status, **Then** a requisição para o endpoint de atualização de status é enviada com o novo status da entrega.

### Functional Requirements

- **FR-007**: O sistema DEVE exibir um controle (dropdown, botões) na tela de detalhes da entrega para permitir a seleção de um novo status.
- **FR-008**: O sistema DEVE validar as transições de status permitidas (ex: "Saiu para entrega" pode seguir para "Entregue" ou "Endereço não encontrado", mas não voltar para "Não iniciada").
- **FR-009**: Ao selecionar um novo status, o sistema DEVE enviar uma requisição ao endpoint de atualização de entrega, contendo o ID da entrega e o novo status.
- **FR-010**: Após a confirmação bem-sucedida da atualização pelo backend, o status da entrega DEVE ser atualizado na tela de detalhes.

### Key Entities

- **Entrega**: Atributos chave adicionais incluem:
    - `status`: Enumeração ou string representando o estado atual da entrega (ex: 'PENDENTE', 'EM_TRANSITO', 'ENTREGUE', 'NAO_ENCONTRADO', 'CLIENTE_NAO_ENCONTRADO', 'CANCELADA').
    - `status_options`: (Opcional, se a lógica de transição for exibida no front) Uma lista de status válidos para transição a partir do estado atual.

### Success Criteria

- **SC-005**: Entregadores conseguem atualizar o status de uma entrega em menos de 3 segundos após a confirmação da ação.
- **SC-006**: As atualizações de status são refletidas na interface do usuário e confirmadas pelo backend em mais de 99.5% das tentativas.

# Plano do Projeto

## Tecnologias
- **Frontend:** React com Vite, TypeScript
- **Estilização:** TailwindCSS (com foco mobile-first responsivo)
- **Gerenciamento de Estado:** Zustand
- **Persistência de Dados:** localStorage

## Arquitetura
- Componentes funcionais
- Hooks customizados

## API
- Consumo de API REST externa
- Variável de Ambiente: `VITE_API_URL` para a URL do backend
- Isolamento de chamadas de API em `services/api`

- **Gerenciamento de Variáveis de Ambiente e Segurança**:
  - API Keys e URLs de serviços serão gerenciados via variáveis de ambiente usando o sistema de `dotenv` integrado ao Vite (`import.meta.env`).
  - A chave de autenticação (`VITE_BEARER_TOKEN`) e a URL base da API (`VITE_API_URL`) devem ser configuradas em arquivos `.env` (ex: `.env.local`) e garantidas como não commitadas.
  - Todas as requisições de API incluirão o header `Authorization: Bearer <VITE_BEARER_TOKEN>` quando `VITE_BEARER_TOKEN` estiver definido.


## Inclusão do User ID nos Cabeçalhos das Requisições

- **Objetivo**: Facilitar a identificação e rastreamento das requisições de API associando-as ao ID do usuário logado.
- **Implementação**: Adicionar o `user.id` ao header `X-User-ID` em todas as requisições de saída.
- **Localização da Lógica**: A lógica será implementada no interceptador de requisições do Axios em `src/services/api/base.ts`.
- **Fonte de Dados**: O `user.id` será obtido do estado global gerenciado pelo Zustand (`useAuthStore`).
- **Atualizações de Documentação**: Registrar esta alteração em `plan.md`, `tasks.md` e `specs/001-autenticacao-login/spec.md`.
3.  **Padrões de Nomenclatura Semanticamente Claros**:
    *   **Componentes**: `PascalCase` (ex: `MeuComponente`, `BotaoPrimario`).
    *   **Funções/Variáveis**: `camelCase` (ex: `minhaFuncao`, `valorTotal`).
    *   **Constantes Globais**: `UPPER_CASE` (ex: `API_BASE_URL`).
    *   **Tipagem**: Assinaturas de função e variáveis devem ser fortemente tipadas com TypeScript.
4.  **Documentação Inline Clara**: Funções complexas, hooks customizados e componentes reutilizáveis devem ser documentados usando JSDoc para explicar propósito, parâmetros, retornos e efeitos colaterais.

## Estratégia de Testes Automatizados

O projeto deve seguir a seguinte estratégia de testes automatizados:

1.  **Ferramentas de Teste**: Utilizar Vitest como test runner e React Testing Library para testar componentes React.
2.  **Testes Unitários Abrangentes**: Cada hook customizado, store do Zustand e serviço de API DEVE ter um arquivo de teste unitário correspondente (ex: `meuHook.test.ts`, `minhaStore.test.ts`, `apiService.test.ts`).
3.  **Testes de Componentes de UI**: Os componentes principais da interface do usuário DEVERÃO ter testes de renderização e comportamento para verificar a interação do usuário e a resposta esperada (ex: `expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument(); fireEvent.click(loginButton);`).
4.  **Instalação de Dependências**: As seguintes dependências de teste DEVERÃO ser instaladas antes do início da codificação:
    *   `vitest`
    *   `@testing-library/react`
    *   `@testing-library/jest-dom`

## Implementação de Movimentação de Status de Entrega

-   **Objetivo**: Permitir que entregadores atualizem o status de uma entrega diretamente da tela de detalhes.
-   **Frontend**:
    -   Modificar `DeliveryDetailsPage.tsx` para incluir um seletor (dropdown/botões) para status.
    -   Integrar com `deliveryService.ts` para chamar o endpoint de atualização.
    -   Atualizar a exibição do status na tela de detalhes após a confirmação.
-   **Backend Integration**:
    -   Garantir que `deliveryService.ts` possua um método para atualizar o status da entrega.
    -   Verificar se o endpoint de atualização na API suporta a modificação do status e valida as transições.
-   **Testes**:
    -   Adicionar testes unitários para `DeliveryDetailsPage.tsx` cobrindo a atualização de status.
    -   Atualizar `deliveryService.test.ts` se necessário.

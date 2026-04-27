# Documentação de Produto e Arquitetura: Maré de Manguinhos (PescApp)

## 1. Visão Geral do Projeto
A plataforma "Maré de Manguinhos" (conhecida como o "iFood da Maré" ) é uma solução tecnológica de impacto social voltada para a Associação de Pescadores local. O objetivo é criar um ecossistema de delivery hiperlocal de pescados frescos, conectando o barco diretamente ao consumidor final sem a presença de atravessadores.

## 2. Dores e Desafios (Motivadores do Sistema)
O sistema foi idealizado para resolver gargalos críticos da comunidade:
* **Modelo de Venda Atual:** A dependência de vendas presenciais ("na hora") desvaloriza o pescado e prejudica a receita.
* **Sustentabilidade Financeira:** A associação possui contas atrasadas e precisa de previsibilidade de caixa para manter a sede física.
* **Transparência Institucional:** A ONG financiadora "Rede Cidadania" exige relatórios rigorosos de prestação de contas, inviabilizados pelo modelo atual baseado em dinheiro vivo.
* **Limitações do Usuário (Pescador):** O público produtor possui baixa escolaridade média (ensino fundamental) e rejeita aplicativos complexos de gestão de estoque.
* **Limitações Físicas e de Conectividade:** Telas sensíveis ao toque não funcionam bem com as mãos molhadas de água do mar. Além disso, os pescadores passam de 2 a 3 dias em alto mar sem sinal de internet, e o peixe dura até 3 dias no gelo após a captura.

## 3. Arquitetura do Sistema (Módulos Principais)
A plataforma é dividida em três frentes de interação:

### 3.1. Módulo Pescador (Input de Dados - WhatsApp)
Para contornar a rejeição a novos aplicativos e a dificuldade com telas sensíveis, o backoffice do pescador será invisível e operado 100% via WhatsApp.
* **Entrada de Dados:** Assim que o barco entra em área de cobertura, o pescador envia uma foto e um áudio (ex: "Janjão, peguei 10kg de robalo") para um Chatbot.
* **Processamento de IA:** Um sistema de Inteligência Artificial processa o áudio, transcreve os dados, identifica as espécies e quantidades, e faz o vínculo das fotos ao perfil do pescador.
* **Notificações:** O pescador recebe alertas de vendas através deste mesmo bot amigável.

### 3.2. Módulo Cliente (Vitrine e Checkout - App/Web)
Aplicativo no estilo "iFood" voltado exclusivamente para a comunidade local.
* **Vitrine Viva:** O catálogo digital é atualizado em tempo real assim que os dados do WhatsApp são processados pela IA.
* **Funcionalidades de Compra:** Permite o agendamento de entregas e a personalização do produto, como escolha de cortes (inteiro, limpo, filé).
* **Pagamento:** Integração com meios de pagamento digital diretamente no aplicativo.

### 3.3. Módulo Gestão (Desktop)
Painel de controle utilizado pela administração da Associação (ex: "Janjão") na sede física.
* **Acompanhamento Financeiro:** Visualização do fluxo de caixa e custos fixos.
* **Prestação de Contas:** Emissão de relatórios automatizados e incontestáveis de vendas e quitação de dívidas para envio à ONG Rede Cidadania.
* **Configurações:** Parametrização de regras do sistema, como sazonalidade de preços.

## 4. Regras de Negócio e Engenharia Financeira
* **Taxa Associativa Variável:** O sistema deve reter um percentual de cada venda apenas até que a cota fixa mensal do pescador com a Associação seja atingida.
* **Lucro Integral:** Após atingir o teto da cota mensal para pagar contas da associação, a taxa do aplicativo zera e o pescador passa a receber 100% do valor de suas vendas subsequentes.
* **Centralização de Pagamentos:** Todos os pagamentos digitais devem cair em uma "Conta Centralizada" da Associação, que se encarregará de fazer a retenção das taxas e o repasse aos pescadores.
* **Liquidez Física:** O pescador tem o direito de solicitar o saque do seu acerto em dinheiro físico ao final do dia, diretamente na sede da Associação.
* **Custo de Logística:** O valor pago aos motoboys parceiros deve ser repassado integralmente (100%) ao cliente final no momento do checkout, garantindo custo zero de logística para o projeto.

## 5. Público-Alvo e Mercado [cite: 47]
* **B2C Local:** Foco em famílias e idosos moradores de Manguinhos que buscam peixe fresco e comodidade.
* **B2C Ticket Alto:** Moradores de condomínios da região de Laranjeiras dispostos a pagar um valor premium pela conveniência e origem rastreável do pescado.
* **B2B Empresarial:** Restaurantes da região interessados em negociar volume, fazer reservas programadas e ter a garantia de procedência local.

## 6. Roadmap de Implementação [cite: 75]
* **Mês 1 (Prototipação):** Foco em prototipar e validar o produto junto aos clientes.
* **Mês 2 (MVP):** Lançamento exclusivo do Bot de WhatsApp[cite: 81, 82]. Realização de testes de captura de imagem e áudio com um grupo focado de 5 pescadores.
* **Mês 3 (Onboarding):** Cadastro oficial de 25 pescadores ativos na base de dados da Associação. Configuração das regras de sazonalidade de preços no painel de administração.
* **Mês 4 (Lançamento B2C e B2B):** Abertura oficial do aplicativo B2C com campanhas de marketing direcionadas para moradores locais e condomínios de Laranjeiras Expansão do módulo empresarial (B2B) para a captação de restaurantes da região para compras recorrentes em volume.
# Documentação de Requisitos - Módulo de Rotas e Logística

Este documento descreve os requisitos funcionais, não funcionais e as regras de negócio exclusivas para o módulo de rotas, logística e rastreamento do aplicativo de venda de pescado.

## 1. Requisitos Funcionais (RF)

Os Requisitos Funcionais definem as ações específicas que o módulo de rotas deve ser capaz de executar.

* RF01 - Cálculo de Rota Otimizada: O sistema deve calcular a rota mais eficiente entre o ponto de coleta (porto, mercado ou residência do pescador) e o destino final (cliente), considerando a possibilidade de otimização para múltiplos pontos de entrega em uma mesma viagem.

* RF02 - Geocodificação de Endereços: O sistema deve converter endereços textuais fornecidos por usuários e pescadores em coordenadas geográficas precisas (latitude e longitude) para plotagem no mapa.

* RF03 - Estimativa de Tempo de Chegada (ETA): O sistema deve calcular e fornecer ao cliente uma estimativa de tempo para a entrega, baseando-se na distância, no modal de transporte utilizado e nas condições de tráfego atuais (se a API de mapas suportar).

* RF04 - Rastreamento em Tempo Real: O sistema deve fornecer uma interface de mapa (no app do cliente) que permita visualizar o deslocamento do entregador/pescador em tempo real, desde o momento em que o pedido "Saiu para Entrega" até a sua conclusão.

* RF05 - Cálculo Dinâmico de Frete: O sistema deve calcular automaticamente o valor da taxa de entrega baseado na distância percorrida entre o ponto de origem e o destino final, aplicando tarifas baseadas em quilometragem.

* RF06 - Notificação por Geofencing (Cerca Virtual): O sistema deve disparar uma notificação push automática para o dispositivo do cliente quando as coordenadas do entregador entrarem em um raio pré-definido (ex: 500 metros) do local de entrega.

* RF07 - Atribuição de Entregador por Proximidade: Caso exista uma frota de entregadores independentes, o sistema deve sugerir ou despachar pedidos prioritariamente para os entregadores que estiverem geograficamente mais próximos do ponto de coleta.

## 2. Requisitos Não Funcionais (RNF)

Os Requisitos Não Funcionais definem os critérios de qualidade, desempenho e restrições tecnológicas do módulo de rotas.

* RNF01 - Latência de Atualização de GPS: Para garantir uma experiência de rastreamento fluida, as coordenadas do entregador devem ser enviadas e atualizadas na interface do cliente com um intervalo máximo de 2 segundos.

* RNF02 - Precisão de Localização: O módulo deve consumir a API de localização nativa do dispositivo móvel (Android/iOS) garantindo uma precisão mínima de 15 metros para validar entregas e calcular rotas corretamente.

* RNF03 - Integração com Provedores de Mapas: O módulo deve ser obrigatoriamente integrado a uma API de serviços de mapas consolidada (como Google Maps Platform, Mapbox ou OSRM) para renderização visual, roteamento e geocodificação.

* RNF04 - Tolerância a Falhas de Conexão (Modo Offline Parcial): O aplicativo do entregador deve armazenar localmente (cache) as coordenadas da rota e os dados do pedido. Caso haja perda de sinal de internet durante o trajeto, o app deve continuar operando com o cache e sincronizar os dados de rastreamento e status de entrega com o servidor assim que a conexão for restabelecida.

## 3. Regras de Negócio (RN)

As Regras de Negócio estabelecem as restrições e lógicas específicas que governam as operações de entrega de pescado, garantindo a qualidade do produto e a segurança da operação.

* RN01 - Limite de Raio de Entrega (Garantia de Frescor): A plataforma não deve permitir a conclusão de pedidos cujas rotas de entrega ultrapassem um raio máximo de X quilômetros (ex: 15km ou 20km) a partir do ponto de origem. Esta regra é crucial para garantir a qualidade e o frescor do peixe durante o transporte.

* RN02 - Priorização de Entrega por Perecibilidade: Em cenários de rotas com múltiplas paradas (um entregador com vários pedidos), o algoritmo de roteamento deve priorizar a entrega dos pedidos contendo itens marcados como mais sensíveis à temperatura ou que estão aguardando coleta há mais tempo.

* RN03 - Restrição de Rotas em Áreas de Risco: O sistema de roteamento deve ser capaz de evitar o traçado de rotas que passem por zonas previamente mapeadas como "áreas de risco" ou vias inacessíveis para o modal de transporte (ex: vias exclusivas para carros quando a entrega for de moto).

* RN04 - Validação de Entrega por Geoproximidade: Para evitar fraudes, o aplicativo do entregador só deve permitir que um pedido seja marcado com o status "Entregue" se as coordenadas atuais do dispositivo (GPS) coincidirem com um raio de segurança de 50 metros do endereço de destino cadastrado pelo cliente.
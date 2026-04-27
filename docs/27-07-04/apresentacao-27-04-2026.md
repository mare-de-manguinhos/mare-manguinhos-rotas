---
marp: true
theme: default
class: invert
paginate: true
style: |
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Syne:wght@400;600;800&display=swap');

  :root {
    --bg: #0a0d12;
    --surface: #111620;
    --border: #1e2d45;
    --accent: #00c6ff;
    --accent2: #0080ff;
    --success: #00e5a0;
    --warning: #ffb830;
    --danger: #ff4f6d;
    --text: #d4dff0;
    --muted: #5a6a85;
    --code-bg: #0d1520;
  }

  section {
    background: var(--bg);
    color: var(--text);
    font-family: 'Syne', sans-serif;
    padding: 36px 52px 44px;
    border: none;
    overflow: hidden;
  }

  section::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 60% 40% at 80% 10%, rgba(0,198,255,0.05) 0%, transparent 60%),
      radial-gradient(ellipse 40% 50% at 10% 90%, rgba(0,128,255,0.04) 0%, transparent 60%);
    pointer-events: none;
  }

  h1 {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 2.2rem;
    color: #ffffff;
    letter-spacing: -0.03em;
    line-height: 1.1;
    margin: 0 0 0.35em;
  }

  h2 {
    font-family: 'Syne', sans-serif;
    font-weight: 600;
    font-size: 1.2rem;
    color: var(--accent);
    letter-spacing: -0.01em;
    margin: 0 0 0.6rem;
    border-bottom: 1px solid var(--border);
    padding-bottom: 0.4rem;
  }

  h3 {
    font-family: 'Syne', sans-serif;
    font-weight: 600;
    font-size: 0.78rem;
    color: var(--success);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin: 0.5rem 0 0.3rem;
  }

  p {
    font-size: 0.82rem;
    line-height: 1.6;
    color: var(--text);
    margin: 0.3rem 0;
  }

  ul, ol {
    font-size: 0.8rem;
    line-height: 1.7;
    padding-left: 1.1em;
    margin: 0.3rem 0;
  }

  li { color: var(--text); margin: 0.1rem 0; }
  li::marker { color: var(--accent); }

  code {
    font-family: 'JetBrains Mono', monospace;
    background: var(--code-bg);
    color: var(--accent);
    padding: 0.08em 0.35em;
    border-radius: 3px;
    font-size: 0.78em;
    border: 1px solid var(--border);
  }

  pre {
    background: var(--code-bg) !important;
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 0.7rem 1rem;
    margin: 0.4rem 0;
    overflow: hidden;
    position: relative;
  }

  pre::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--accent2), var(--accent), var(--success));
  }

  pre code {
    background: none;
    border: none;
    padding: 0;
    font-size: 0.62rem;
    color: #c9d8f0;
    line-height: 1.45;
  }

  table {
    font-size: 0.75rem;
    border-collapse: collapse;
    width: 100%;
    margin: 0.4rem 0;
  }
  th {
    background: var(--surface);
    color: var(--accent);
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    padding: 0.4rem 0.6rem;
    border-bottom: 1px solid var(--border);
    text-align: left;
  }
  td {
    padding: 0.35rem 0.6rem;
    border-bottom: 1px solid var(--border);
    color: var(--text);
  }
  tr:last-child td { border-bottom: none; }

  .chip {
    display: inline-block;
    background: rgba(0,198,255,0.1);
    border: 1px solid rgba(0,198,255,0.3);
    color: var(--accent);
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.63rem;
    padding: 0.18em 0.65em;
    border-radius: 20px;
    letter-spacing: 0.05em;
  }
  .tag-success { background: rgba(0,229,160,0.1); border-color: rgba(0,229,160,0.3); color: var(--success); }
  .tag-warning { background: rgba(255,184,48,0.1); border-color: rgba(255,184,48,0.3); color: var(--warning); }
  .tag-danger  { background: rgba(255,79,109,0.1);  border-color: rgba(255,79,109,0.3);  color: var(--danger);  }

  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0.9rem; margin: 0.4rem 0; }
  .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.7rem; margin: 0.4rem 0; }

  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 0.55rem 0.8rem;
  }
  .card-accent  { border-color: rgba(0,198,255,0.3); border-left: 3px solid var(--accent); }
  .card-success { border-color: rgba(0,229,160,0.3); border-left: 3px solid var(--success); }
  .card-warning { border-color: rgba(255,184,48,0.3); border-left: 3px solid var(--warning); }
  .card-danger  { border-color: rgba(255,79,109,0.3);  border-left: 3px solid var(--danger); }

  .label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.6rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--muted);
    margin-bottom: 0.15rem;
  }
  .value { font-size: 0.78rem; color: var(--text); line-height: 1.4; }

  .flow-row { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; margin: 0.3rem 0; }
  .arrow { color: var(--muted); font-size: 0.8rem; }

  section.cover { display: flex; flex-direction: column; justify-content: center; }
  section.cover h1 { font-size: 2.8rem; }

  .subtitle {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    color: var(--muted);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-top: 0.3rem;
  }

  .divider {
    height: 1px;
    background: linear-gradient(90deg, var(--accent2), transparent);
    margin: 0.7rem 0;
    width: 60%;
  }

  section[data-marpit-pagination]::after {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.6rem;
    color: var(--muted);
    bottom: 16px;
    right: 52px;
  }

  .highlight-line {
    background: rgba(0,198,255,0.07);
    border-left: 2px solid var(--accent);
    padding: 0.4rem 0.7rem;
    border-radius: 0 5px 5px 0;
    font-size: 0.76rem;
    margin: 0.35rem 0;
  }

  .note {
    font-size: 0.64rem;
    color: var(--muted);
    margin-top: 0.3rem;
    line-height: 1.5;
  }
---

<!-- _class: cover -->
<!-- _paginate: false -->

<div class="chip">MARÉ DE MANGUINHOS · MÓDULO DE ROTEIRIZAÇÃO</div>

# Google Maps Platform
# para Entregas de Pescado

<div class="divider"></div>

<div class="subtitle">APIS · ROTEAMENTO · RASTREAMENTO · CASO PRÁTICO</div>

<br>

<div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
  <span class="chip">Routes API</span>
  <span class="chip">Geocoding API</span>
  <span class="chip">Distance Matrix</span>
  <span class="chip tag-success">Realtime GPS</span>
  <span class="chip tag-warning">Geofencing</span>
</div>

---

## Visão Geral: Ecossistema de APIs

O Google Maps Platform é organizado em **três famílias de produtos**. Para o módulo de roteirização do PescApp, utilizamos as três.

<div class="grid-3">
<div class="card card-accent">
<div class="label">Maps</div>
<div class="value">Renderização visual de mapas interativos no app do cliente e no painel de gestão</div>
</div>
<div class="card card-success">
<div class="label">Routes</div>
<div class="value">Cálculo de rotas, otimização de múltiplas paradas e estimativa de chegada (ETA)</div>
</div>
<div class="card card-warning">
<div class="label">Places & Geocoding</div>
<div class="value">Conversão de endereços textuais em coordenadas geográficas para o checkout</div>
</div>
</div>

<div class="highlight-line">
🔑 Todas as APIs exigem uma <strong>API Key</strong> com as permissões corretas ativadas no Google Cloud Console. Uma única chave pode habilitar múltiplas APIs do mesmo projeto.
</div>

---

## Arquitetura de Integração

Como cada módulo do PescApp consome as APIs:

<div class="flow-row">
  <span class="chip tag-success">Pescador (WhatsApp Bot)</span>
  <span class="arrow">──</span>
  <span style="font-size:0.72rem; color:var(--muted)">sem uso direto de Maps</span>
</div>
<div class="flow-row">
  <span class="chip">App Cliente</span>
  <span class="arrow">→</span>
  <span class="chip">Maps JS API</span>
  <span class="arrow">+</span>
  <span class="chip">Geocoding</span>
  <span class="arrow">+</span>
  <span class="chip tag-warning">Rastreamento RT</span>
</div>
<div class="flow-row">
  <span class="chip tag-danger">Backend (Node.js)</span>
  <span class="arrow">→</span>
  <span class="chip">Routes API</span>
  <span class="arrow">+</span>
  <span class="chip">Distance Matrix</span>
  <span class="arrow">+</span>
  <span class="chip">Geofencing</span>
</div>
<div class="flow-row">
  <span class="chip">Painel Gestão</span>
  <span class="arrow">→</span>
  <span class="chip">Maps JS API</span>
  <span class="arrow">+</span>
  <span class="chip tag-success">Fleet Tracking</span>
</div>

<div class="card card-accent" style="margin-top:0.6rem">
<div class="label">Princípio de segurança</div>
<div class="value">Chamadas com dados sensíveis (frete, despacho) devem ser feitas no <strong>backend</strong> — nunca expor a API Key no código frontend.</div>
</div>

---

## RF02 — Geocodificação de Endereços

Converte o endereço do checkout em <code>{lat, lng}</code> para plotagem e cálculo de frete.

```javascript
// backend/services/geocoding.service.js
const axios = require('axios');

async function geocodeAddress(address) {
  const { data } = await axios.get(
    'https://maps.googleapis.com/maps/api/geocode/json',
    {
      params: {
        address: `${address}, Manguinhos, Rio de Janeiro, BR`,
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
    }
  );

  if (data.status !== 'OK') throw new Error(`Geocoding falhou: ${data.status}`);

  const { lat, lng } = data.results[0].geometry.location;
  return {
    lat,
    lng,
    formattedAddress: data.results[0].formatted_address,
  };
}

module.exports = { geocodeAddress };
```

<div class="highlight-line">
Resposta: <code>{ lat: -22.9285, lng: -43.1826, formattedAddress: "R. Alice, 10 - Laranjeiras, RJ" }</code>
</div>

---

## RF05 — Cálculo Dinâmico de Frete

Calcula o valor da entrega via Distance Matrix com bloqueio por raio máximo **(RN01)**.

```javascript
// backend/services/freight.service.js
const TARIFF = { BASE_FEE: 3.00, PRICE_PER_KM: 1.50, FREE_KM: 2, MAX_KM: 15 };

async function calculateFreight(origin, destination) {
  const { data } = await axios.get(
    'https://maps.googleapis.com/maps/api/distancematrix/json',
    {
      params: {
        origins:      `${origin.lat},${origin.lng}`,
        destinations: `${destination.lat},${destination.lng}`,
        mode: 'driving',
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
    }
  );

  const el = data.rows[0].elements[0];
  if (el.status !== 'OK') throw new Error('Rota não encontrada');

  const distKm = el.distance.value / 1000;
  const durMin = Math.ceil(el.duration.value / 60);

  // RN01 — Bloquear pedidos além do raio de frescor (15 km)
  if (distKm > TARIFF.MAX_KM)
    throw new Error(`Fora da área: ${distKm.toFixed(1)}km > ${TARIFF.MAX_KM}km`);

  const extraKm = Math.max(0, distKm - TARIFF.FREE_KM);
  const freight = parseFloat((TARIFF.BASE_FEE + extraKm * TARIFF.PRICE_PER_KM).toFixed(2));

  return { distKm: distKm.toFixed(2), durMin, freight };
}
```

---

## RF01 — Rota Otimizada com Múltiplas Paradas

Routes API v2 reordena as paradas automaticamente; RN02 pré-ordena por perecibilidade.

```javascript
// backend/services/routing.service.js
async function computeOptimizedRoute(origin, waypoints, destination) {
  // RN02 — itens mais perecíveis entram primeiro na lista
  const sorted = [...waypoints].sort((a, b) => b.perishabilityScore - a.perishabilityScore);

  const { data } = await axios.post(
    'https://routes.googleapis.com/directions/v2:computeRoutes',
    {
      origin:        { location: { latLng: origin } },
      destination:   { location: { latLng: destination } },
      intermediates: sorted.map(wp => ({ location: { latLng: wp } })),
      travelMode:             'TWO_WHEELER',
      optimizeWaypointOrder:  true,
      routingPreference:      'TRAFFIC_AWARE',
      languageCode:           'pt-BR',
    },
    {
      headers: {
        'X-Goog-Api-Key':   process.env.GOOGLE_MAPS_API_KEY,
        'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.optimizedIntermediateWaypointIndex',
      },
    }
  );

  const r = data.routes[0];
  return {
    totalKm:        (r.distanceMeters / 1000).toFixed(2),
    totalMin:       Math.ceil(parseInt(r.duration) / 60),
    optimizedOrder: r.optimizedIntermediateWaypointIndex,
  };
}
```

---

## RF04 — Rastreamento em Tempo Real

App do motoboy envia posição a cada 2 s (RNF01). Cliente consome via WebSocket.

```javascript
// app-entregador — React Native (Expo)
import * as Location from 'expo-location';
import { socket } from '../services/socket';

export function useGPSTracker(orderId, isActive) {
  useEffect(() => {
    if (!isActive) return;
    let watcher;
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      // RNF01: intervalo ≤ 2 s  |  RNF02: precisão ≤ 15 m
      watcher = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 2000, distanceInterval: 5 },
        ({ coords }) => {
          if (coords.accuracy > 15) return;
          socket.emit('gps:update', { orderId, lat: coords.latitude, lng: coords.longitude });
        }
      );
    })();
    return () => watcher?.remove();
  }, [isActive, orderId]);
}
```

```javascript
// app-cliente — consome updates em tempo real
socket.on('gps:update', ({ lat, lng }) => {
  deliveryMarker.setPosition({ lat, lng });
  map.panTo({ lat, lng });
});
```

---

## RF06 — Geofencing & RN04 — Anti-Fraude

Dois usos da fórmula **Haversine** — sem custo de API, 100% no backend.

```javascript
// Haversine: distância em metros entre dois pontos lat/lng
function haversineDistance({ lat: lat1, lng: lng1 }, { lat: lat2, lng: lng2 }) {
  const R = 6371e3, rad = d => d * Math.PI / 180;
  const dLat = rad(lat2 - lat1), dLng = rad(lng2 - lng1);
  const a = Math.sin(dLat/2)**2
          + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// RF06 — push quando entregador entra no raio de 500 m
async function checkGeofence(coords, order) {
  if (haversineDistance(coords, order.destination) <= 500 && !order.geofenceNotified) {
    await order.update({ geofenceNotified: true });
    await sendPush(order.clientFcmToken, { title: '🐟 Chegando!', body: 'Menos de 500m!' });
  }
}

// RN04 — entregador só confirma "Entregue" estando a ≤ 50 m do destino
async function validateDelivery(deviceCoords, order) {
  const dist = haversineDistance(deviceCoords, order.destination);
  if (dist > 50) throw new Error(`GPS fora do raio: ${dist.toFixed(0)}m (máx 50m)`);
  await api.patch(`/orders/${order.id}/status`, { status: 'DELIVERED', proofLocation: deviceCoords });
}
```

---

## RF07 — Despacho por Proximidade

Seleciona o motoboy online mais próximo do porto no momento do pedido.

```javascript
// backend/services/dispatch.service.js
async function assignNearestDeliverer(order) {
  const available = await Deliverer.findAll({
    where: { status: 'ONLINE', activeOrders: { [Op.lt]: 3 } },
  });

  const ranked = available
    .map(d => ({
      ...d.toJSON(),
      dist: haversineDistance(
        { lat: d.currentLat, lng: d.currentLng },
        { lat: order.pickupLat,  lng: order.pickupLng }
      ),
    }))
    .sort((a, b) => a.dist - b.dist);

  const nearest = ranked[0];

  if (!nearest || nearest.dist > 5000) {
    await order.update({ status: 'WAITING_DELIVERER' });
    await notifyAdmin(order);
    return null;
  }

  await order.update({ delivererId: nearest.id, status: 'ASSIGNED' });
  await sendPush(nearest.fcmToken, {
    title: '📦 Novo pedido!',
    body: `Coleta a ${nearest.dist < 1000
      ? `${nearest.dist.toFixed(0)}m`
      : `${(nearest.dist/1000).toFixed(1)}km`} — ${order.fishSpecies}`,
  });
  return nearest;
}
```

---

## Caso de Teste: Pedido Completo

Simulação end-to-end — **3 kg de robalo**, Porto de Manguinhos → Laranjeiras.

<div class="grid-2">
<div>

```javascript
// Entrada
const order = {
  clientAddress: "Rua Alice, 10, Laranjeiras, RJ",
  pickupCoords:  { lat: -22.8621, lng: -43.2298 },
  items: [{ species: 'Robalo', weight: 3, cut: 'filé' }],
};
```

```json
// Saída esperada
{
  "geocoding": { "lat": -22.9285, "lng": -43.1826 },
  "freight":   { "distKm": "11.40", "durMin": 28, "value": 19.10 },
  "deliverer": { "name": "Carlos Moto", "dist": "620m" }
}
```

</div>
<div>

<div class="card card-accent" style="margin-bottom:0.4rem">
<div class="label">① Geocoding API</div>
<div class="value">Endereço → <code>lat:-22.9285</code> <code>lng:-43.1826</code></div>
</div>
<div class="card card-success" style="margin-bottom:0.4rem">
<div class="label">② Distance Matrix</div>
<div class="value">11,4 km → R$ 19,10 · 28 min estimado</div>
</div>
<div class="card card-success" style="margin-bottom:0.4rem">
<div class="label">③ RN01 — Raio OK</div>
<div class="value">11,4 km &lt; 15 km ✅ entrega liberada</div>
</div>
<div class="card card-warning" style="margin-bottom:0.4rem">
<div class="label">④ RF07 — Despacho</div>
<div class="value">Carlos Moto a 620 m do porto · selecionado</div>
</div>
<div class="card" style="margin-bottom:0.4rem">
<div class="label">⑤ GPS Loop 2 s</div>
<div class="value">Rastreamento ativo · geofence 500 m armado</div>
</div>
<div class="card card-danger">
<div class="label">⑥ RN04 — Entrega</div>
<div class="value">GPS valida ≤ 50 m → status <code>DELIVERED</code></div>
</div>

</div>
</div>

---

## Custos e Boas Práticas

<div class="grid-2">
<div>

### SKUs — faixa gratuita/mês

| API | Gratuito | Excedente |
|---|---|---|
| Maps JS | 28.000 loads | $7 / 1k |
| Geocoding | 40.000 req | $5 / 1k |
| Distance Matrix | 100.000 elem | $5 / 1k |
| Routes API | 10.000 req | $10 / 1k |
| Maps Static | 100.000 req | $2 / 1k |

<div class="note">* Google concede $200/mês de crédito. Com 25 pescadores no MVP, custo estimado: <strong style="color:var(--success)">$0/mês</strong>.</div>

</div>
<div>

### Economia e segurança

<div class="card card-success" style="margin-bottom:0.4rem">
<div class="label">Cache de geocoding</div>
<div class="value">Salvar <code>lat/lng</code> no banco após a 1ª chamada — evita reprocessamento</div>
</div>
<div class="card card-success" style="margin-bottom:0.4rem">
<div class="label">Distance Matrix no backend</div>
<div class="value">Nunca chamar direto do app — centralizar e cachear por par origem/destino</div>
</div>
<div class="card card-warning">
<div class="label">Restrição de API Key</div>
<div class="value">Limitar a chave frontend ao domínio via <em>HTTP Referrer</em> no Cloud Console</div>
</div>

</div>
</div>

---

<!-- _paginate: false -->
<!-- _class: cover -->

## Resumo das Integrações

<div class="grid-3">
<div class="card card-accent">
<div class="label">Geocoding API</div>
<div style="font-family:'Syne',sans-serif;font-weight:800;font-size:1.6rem;color:var(--accent);line-height:1;margin:0.2rem 0">RF02</div>
<div class="value">Checkout → coordenadas para frete e mapa</div>
</div>
<div class="card card-success">
<div class="label">Distance Matrix</div>
<div style="font-family:'Syne',sans-serif;font-weight:800;font-size:1.6rem;color:var(--success);line-height:1;margin:0.2rem 0">RF05</div>
<div class="value">Cálculo dinâmico de frete por km + RN01</div>
</div>
<div class="card card-warning">
<div class="label">Routes API v2</div>
<div style="font-family:'Syne',sans-serif;font-weight:800;font-size:1.6rem;color:var(--warning);line-height:1;margin:0.2rem 0">RF01</div>
<div class="value">Otimização multi-parada + RN02 perecibilidade</div>
</div>
<div class="card">
<div class="label">Maps JS API</div>
<div style="font-family:'Syne',sans-serif;font-weight:800;font-size:1.6rem;color:var(--text);line-height:1;margin:0.2rem 0">RF04</div>
<div class="value">Mapa interativo de rastreamento em tempo real</div>
</div>
<div class="card card-danger">
<div class="label">GPS + Haversine</div>
<div style="font-family:'Syne',sans-serif;font-weight:800;font-size:1.6rem;color:var(--danger);line-height:1;margin:0.2rem 0">RN04</div>
<div class="value">Anti-fraude na confirmação de entrega</div>
</div>
<div class="card card-success">
<div class="label">Geofencing</div>
<div style="font-family:'Syne',sans-serif;font-weight:800;font-size:1.6rem;color:var(--success);line-height:1;margin:0.2rem 0">RF06</div>
<div class="value">Push automático a 500 m do destino</div>
</div>
</div>

<div class="divider" style="margin-top:0.8rem"></div>
<div class="subtitle" style="font-size:0.65rem">MARÉ DE MANGUINHOS · DO BARCO AO PRATO · TECNOLOGIA A SERVIÇO DA COMUNIDADE</div>
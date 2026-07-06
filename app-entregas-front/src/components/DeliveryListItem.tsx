import React from 'react';
import type { Delivery, DeliveryStatus } from '../types/delivery';

interface DeliveryListItemProps {
  delivery: Delivery;
  onClick?: (deliveryId: string) => void;
}

const statusConfig: Record<DeliveryStatus, { label: string; bg: string; text: string }> = {
  PENDENTE: { label: 'Pendente', bg: 'bg-amber-100', text: 'text-amber-700' },
  SAIU_PARA_ENTREGA: { label: 'Em rota', bg: 'bg-blue-100', text: 'text-blue-700' },
  ENTREGUE: { label: 'Entregue', bg: 'bg-emerald-100', text: 'text-emerald-700' },
  ENDERECO_NAO_ENCONTRADO: { label: 'End. não encontrado', bg: 'bg-red-100', text: 'text-red-700' },
  CLIENTE_NAO_ENCONTRADO: { label: 'Cliente não encontrado', bg: 'bg-red-100', text: 'text-red-700' },
  CANCELADA: { label: 'Cancelada', bg: 'bg-slate-100', text: 'text-slate-600' },
};

const ChevronRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

const MapPinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const DeliveryListItem: React.FC<DeliveryListItemProps> = ({ delivery, onClick }) => {
  const config = statusConfig[delivery.status] ?? { label: delivery.status, bg: 'bg-slate-100', text: 'text-slate-600' };

  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 mb-3 cursor-pointer active:scale-[0.98] transition-transform"
      onClick={() => onClick?.(delivery.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.(delivery.id)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
              {config.label}
            </span>
          </div>
          <h3 className="text-slate-800 font-semibold text-base leading-snug truncate">
            {delivery.clientName}
          </h3>
          <div className="flex items-start gap-1 mt-1">
            <MapPinIcon />
            <p className="text-slate-500 text-sm leading-snug line-clamp-2">
              {delivery.addressSummary || delivery.deliveryAddress}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <span className="text-slate-400">
            <ChevronRight />
          </span>
        </div>
      </div>
    </div>
  );
};

export default DeliveryListItem;

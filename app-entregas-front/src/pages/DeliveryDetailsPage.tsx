import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDeliveryDetails } from '../hooks/useDeliveryDetails';
import { deliveryService } from '../services/api/deliveryService';
import type { DeliveryStatus } from '../types/delivery';

const statusOptions: { value: DeliveryStatus; label: string }[] = [
  { value: 'PENDENTE', label: 'Pendente' },
  { value: 'SAIU_PARA_ENTREGA', label: 'Saiu para entrega' },
  { value: 'ENTREGUE', label: 'Entregue' },
  { value: 'ENDERECO_NAO_ENCONTRADO', label: 'Endereço não encontrado' },
  { value: 'CLIENTE_NAO_ENCONTRADO', label: 'Cliente não encontrado' },
  { value: 'CANCELADA', label: 'Cancelada' },
];

const statusConfig: Record<string, { bg: string; text: string }> = {
  PENDENTE: { bg: 'bg-amber-100', text: 'text-amber-700' },
  SAIU_PARA_ENTREGA: { bg: 'bg-blue-100', text: 'text-blue-700' },
  ENTREGUE: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  ENDERECO_NAO_ENCONTRADO: { bg: 'bg-red-100', text: 'text-red-700' },
  CLIENTE_NAO_ENCONTRADO: { bg: 'bg-red-100', text: 'text-red-700' },
  CANCELADA: { bg: 'bg-slate-100', text: 'text-slate-600' },
};

const ArrowLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12 19 5 12 12 5"/>
  </svg>
);

const MapIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 11 22 2 13 21 11 13 3 11"/>
  </svg>
);

const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
  </svg>
);

const DeliveryDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { delivery, loading, error, refetchDelivery } = useDeliveryDetails(id ?? '');

  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    if (delivery?.status && !selectedStatus) {
      setSelectedStatus(delivery.status);
    }
  }, [delivery, selectedStatus]);

  const handleUpdateStatus = async () => {
    if (!selectedStatus || !delivery) return;
    setIsUpdating(true);
    setUpdateError(null);
    try {
      await deliveryService.updateDeliveryStatus(delivery.id, selectedStatus as DeliveryStatus);
      await refetchDelivery();
      setSelectedStatus('');
    } catch (err: any) {
      setUpdateError(err.message || 'Erro ao atualizar o status.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCopyAddress = async () => {
    if (!delivery) return;
    try {
      await navigator.clipboard.writeText(delivery.deliveryAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback silent
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-500 text-sm">Carregando detalhes...</p>
      </div>
    );
  }

  if (error || !delivery) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 gap-4">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center max-w-sm w-full">
          <p className="text-red-600 font-medium mb-4">{error ?? 'Entrega não encontrada.'}</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-6 rounded-lg transition text-sm"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  const config = statusConfig[delivery.status] ?? { bg: 'bg-slate-100', text: 'text-slate-600' };
  const statusLabel = statusOptions.find(o => o.value === delivery.status)?.label ?? delivery.status;
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(delivery.deliveryAddress)}`;
  const statusChanged = selectedStatus && selectedStatus !== delivery.status;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-indigo-700 text-white px-4 pt-12 pb-5">
        <div className="max-w-lg mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-indigo-300 hover:text-white text-sm mb-3 transition"
            type="button"
          >
            <ArrowLeftIcon />
            Voltar
          </button>
          <h1 className="text-white text-xl font-bold">Detalhes da entrega</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 pt-5 pb-8 space-y-4">
        {/* Client card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-wide mb-0.5">Cliente</p>
              <h2 className="text-slate-800 font-bold text-xl">{delivery.clientName}</h2>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 ${config.bg} ${config.text}`}>
              {statusLabel}
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-wide mb-0.5">Endereço de entrega</p>
              <p className="text-slate-700 text-sm leading-relaxed">{delivery.deliveryAddress}</p>
            </div>

            {delivery.clientPhone && (
              <div>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wide mb-0.5">Telefone</p>
                <a
                  href={`tel:${delivery.clientPhone}`}
                  className="inline-flex items-center gap-1.5 text-indigo-600 font-medium text-sm hover:text-indigo-700"
                >
                  <PhoneIcon />
                  {delivery.clientPhone}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-3">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold py-3 px-4 rounded-xl transition text-sm"
          >
            <MapIcon />
            Abrir no Maps
          </a>
          <button
            onClick={handleCopyAddress}
            type="button"
            className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 active:bg-slate-100 border border-slate-200 text-slate-700 font-semibold py-3 px-4 rounded-xl transition text-sm"
          >
            <CopyIcon />
            {copied ? 'Copiado!' : 'Copiar end.'}
          </button>
        </div>

        {/* Status update */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
          <h3 className="text-slate-800 font-semibold mb-4">Atualizar status</h3>
          <div className="space-y-3">
            <select
              value={selectedStatus}
              onChange={(e) => { setSelectedStatus(e.target.value); setUpdateError(null); }}
              disabled={isUpdating}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-slate-700 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 cursor-pointer"
            >
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            {updateError && (
              <p className="text-red-500 text-sm">{updateError}</p>
            )}

            <button
              onClick={handleUpdateStatus}
              disabled={isUpdating || !statusChanged}
              type="button"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition text-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isUpdating ? 'Atualizando...' : 'Confirmar status'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DeliveryDetailsPage;

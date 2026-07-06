import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeliveryHistory } from '../hooks/useDeliveryHistory';
import DeliveryListItem from '../components/DeliveryListItem';
import NavBar from '../components/NavBar';
import type { FilterBy, SortBy } from '../types/delivery';

const RefreshIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10"/>
    <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/>
  </svg>
);

const HistoryPage: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortBy>('none');
  const [filterBy, setFilterBy] = useState<FilterBy>('TODAS');
  const { history, loading, error, fetchDeliveryHistory } = useDeliveryHistory(sortBy, filterBy);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-500 text-sm">Carregando histórico...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 gap-4">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center max-w-sm w-full">
          <p className="text-red-600 font-medium mb-4">{error}</p>
          <button
            onClick={fetchDeliveryHistory}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-6 rounded-lg transition text-sm"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-indigo-700 text-white px-4 pt-12 pb-5">
        <div className="max-w-lg mx-auto">
          <p className="text-indigo-300 text-xs font-medium uppercase tracking-wide mb-0.5">Registros</p>
          <h1 className="text-white text-xl font-bold">Histórico de entregas</h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-lg mx-auto px-4 pt-5 pb-24">
        {/* Title + refresh */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-slate-800 font-bold text-lg">Entregas concluídas</h2>
            <p className="text-slate-500 text-sm">
              {history.length === 0
                ? 'Nenhum registro'
                : `${history.length} entrega${history.length > 1 ? 's' : ''}`}
            </p>
          </div>
          <button
            onClick={fetchDeliveryHistory}
            className="flex items-center gap-1.5 text-indigo-600 hover:text-indigo-700 text-sm font-medium py-2 px-3 rounded-lg hover:bg-indigo-50 transition"
            type="button"
          >
            <RefreshIcon />
            Atualizar
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1 -mx-4 px-4">
          <div className="flex flex-col gap-0.5 shrink-0">
            <label className="text-slate-500 text-xs font-medium">Ordenar</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
              className="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-700 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="none">Padrão</option>
              <option value="status">Status</option>
              <option value="clientName">Cliente</option>
            </select>
          </div>
          <div className="flex flex-col gap-0.5 shrink-0">
            <label className="text-slate-500 text-xs font-medium">Filtrar</label>
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value as FilterBy)}
              className="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-700 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="TODAS">Todas</option>
              <option value="ENTREGUE">Entregues</option>
              <option value="ENDERECO_NAO_ENCONTRADO">End. não encontrado</option>
              <option value="CLIENTE_NAO_ENCONTRADO">Cliente não encontrado</option>
            </select>
          </div>
        </div>

        {/* List */}
        {history.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-3">🕐</div>
            <p className="text-slate-600 font-medium">Sem histórico ainda</p>
            <p className="text-slate-400 text-sm mt-1">As entregas concluídas aparecerão aqui</p>
          </div>
        ) : (
          <div>
            {history.map((delivery) => (
              <DeliveryListItem
                key={delivery.id}
                delivery={delivery}
                onClick={(id) => navigate(`/details/${id}`)}
              />
            ))}
          </div>
        )}
      </main>

      <NavBar />
    </div>
  );
};

export default HistoryPage;

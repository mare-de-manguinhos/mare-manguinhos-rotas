import React, { useState } from 'react';
import { useDeliveryHistory } from '../hooks/useDeliveryHistory';
import DeliveryListItem from '../components/DeliveryListItem';
import { useNavigate } from 'react-router-dom';
import type { FilterBy, SortBy } from '../types/delivery';
import { useAuth } from '../hooks/useAuth'; // Import useAuth hook

const HistoryPage: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortBy>('none');
  const [filterBy, setFilterBy] = useState<FilterBy>('TODAS');
  const { history, loading, error, fetchDeliveryHistory } = useDeliveryHistory(sortBy, filterBy);
  const navigate = useNavigate();
  const { signOut } = useAuth(); // Get signOut function from useAuth hook

  const handleDeliveryClick = (deliveryId: string) => {
    navigate(`/details/${deliveryId}`); // Assuming details page can also show history details
  };

  const handleRefreshHistory = () => {
    fetchDeliveryHistory();
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value as SortBy);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterBy(event.target.value as FilterBy);
  };

  // Handle logout
  const handleLogout = async () => {
    await signOut();
    navigate('/'); // Redirect to login page
  };

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6'>
        <p className='text-gray-600'>Carregando histórico de entregas...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 sm:p-6'>
        <p className='text-red-500 mb-4'>Erro: {error}</p>
        <button
          onClick={handleRefreshHistory}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-100 p-4 sm:p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold text-gray-800'>Histórico de Entregas</h1>
        <button
          onClick={handleLogout}
          className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        >
          Sair
        </button>
      </div>

      <div className='flex flex-wrap justify-center items-center mb-4 px-4 sm:px-6 gap-4'>
        <button
          onClick={handleRefreshHistory}
          className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        >
          Atualizar Histórico
        </button>

        <div className='flex items-center'>
          <label htmlFor='sortBy' className='mr-2 text-gray-700 font-semibold'>Ordenar por:</label>
          <select
            id='sortBy'
            value={sortBy}
            onChange={handleSortChange}
            className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
          >
            <option value='none'>Nenhum</option>
            <option value='status'>Status</option>
            <option value='clientName'>Nome do Cliente</option>
          </select>
        </div>

        <div className='flex items-center'>
          <label htmlFor='filterBy' className='mr-2 text-gray-700 font-semibold'>Filtrar por Status:</label>
          <select
            id='filterBy'
            value={filterBy}
            onChange={handleFilterChange}
            className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
          >
            <option value='TODAS'>Todos</option>
            <option value='ENTREGUE'>Entregue</option>
            <option value='ENDERECO_NAO_ENCONTRADO'>Endereço Não Encontrado</option>
            <option value='CLIENTE_NAO_ENCONTRADO'>Cliente Não Encontrado</option>
          </select>
        </div>
      </div>

      {history.length === 0 ? (
        <div className='text-center text-gray-600 mt-8'>
          <p>Nenhuma entrega realizada ainda.</p>
        </div>
      ) : (
        <div className='max-w-md mx-auto'>
          {history.map((delivery) => (
            <DeliveryListItem key={delivery.id} delivery={delivery} onClick={handleDeliveryClick} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;

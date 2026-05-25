import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDeliveryDetails } from '../hooks/useDeliveryDetails';
import useAuthStore from '../stores/authStore.ts';
import { deliveryService } from '../services/api/deliveryService'; // Assuming this function exists

// Define possible delivery statuses and their display names
const deliveryStatusOptions = [
  { value: 'PENDENTE', label: 'Pendente' },
  { value: 'SAIU_PARA_ENTREGA', label: 'Saiu para entrega' },
  { value: 'ENTREGUE', label: 'Entregue' },
  { value: 'ENDERECO_NAO_ENCONTRADO', label: 'Endereço não encontrado' },
  { value: 'CLIENTE_NAO_ENCONTRADO', label: 'Cliente não encontrado' },
  { value: 'CANCELADA', label: 'Cancelada' },
];

const DeliveryDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { delivery, loading, error, refetchDelivery } = useDeliveryDetails(id || ''); // Added refetchDelivery to refresh data after status update
  // const user = useAuthStore((state) => state.user);

  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState<boolean>(false);
  const [statusUpdateError, setStatusUpdateError] = useState<string | null>(null);

  // Handle logout
  const handleLogout = async () => {
    useAuthStore.getState().logout();
    navigate('/');
  };

  // Handle status change
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
    setStatusUpdateError(null); // Clear previous errors on new selection
  };

  // Handle status update submission
  const handleUpdateStatus = async () => {
    if (!selectedStatus || !delivery) return;

    setIsUpdatingStatus(true);
    setStatusUpdateError(null);

    try {
      // Assuming updateDeliveryStatus returns the updated delivery object or throws an error
      await deliveryService.updateDeliveryStatus(delivery.id, selectedStatus as any);
      alert(`Status da entrega atualizado para: ${deliveryStatusOptions.find(opt => opt.value === selectedStatus)?.label}`);
      // Refresh delivery details to show the updated status
      await refetchDelivery(); // Use refetchDelivery to update local state
      setSelectedStatus(''); // Reset selection after successful update
    } catch (err: any) {
      console.error('Falha ao atualizar status:', err);
      setStatusUpdateError(err.message || 'Ocorreu um erro ao atualizar o status.');
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Determine available statuses based on current delivery status (optional, for future validation)
  // For now, we show all options and rely on backend validation.
  // const availableStatuses = deliveryStatusOptions.filter(status => ...);

  // Set initial selectedStatus if delivery is loaded and status is available
  React.useEffect(() => {
    if (delivery && delivery.status && !selectedStatus) {
      setSelectedStatus(delivery.status);
    }
  }, [delivery, selectedStatus]);

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6'>
        <p className='text-gray-600'>Carregando detalhes da entrega...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 sm:p-6'>
        <p className='text-red-500 mb-4'>Erro: {error}</p>
        <button
          onClick={() => navigate(-1)} // Go back to previous page
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        >
          Voltar
        </button>
      </div>
    );
  }

  if (!delivery) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6'>
        <p className='text-gray-600'>Entrega não encontrada.</p>
        <button
          onClick={() => navigate(-1)} // Go back to previous page
          className='ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        >
          Voltar
        </button>
      </div>
    );
  }

  // Helper to format status for display
  const formatStatus = (status: string) => {
    const option = deliveryStatusOptions.find(opt => opt.value === status);
    return option ? option.label : status.replace(/[-_]/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // Determine badge class based on status
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'PENDENTE': return 'bg-yellow-100 text-yellow-800';
      case 'SAIU_PARA_ENTREGA': return 'bg-blue-100 text-blue-800';
      case 'ENTREGUE': return 'bg-green-100 text-green-800';
      case 'ENDERECO_NAO_ENCONTRADO': return 'bg-red-100 text-red-800';
      case 'CLIENTE_NAO_ENCONTRADO': return 'bg-red-100 text-red-800';
      case 'CANCELADA': return 'bg-gray-200 text-gray-800';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 p-4 sm:p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold text-gray-800'>Detalhes da Entrega</h1>
        <button
          onClick={handleLogout}
          className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        >
          Sair
        </button>
      </div>
      <div className='bg-white p-6 sm:p-8 rounded-lg shadow-lg max-w-md mx-auto mb-8'>
        <div className='mb-4'>
          <p className='text-gray-700 font-semibold'>Cliente:</p>
          <p className='text-gray-900'>{delivery.clientName}</p>
        </div>
        <div className='mb-4'>
          <p className='text-gray-700 font-semibold'>Endereço:</p>
          <p className='text-gray-900'>{delivery.deliveryAddress}</p>
        </div>
        {delivery.clientPhone && (
          <div className='mb-4'>
            <p className='text-gray-700 font-semibold'>Telefone:</p>
            <a href={`tel:${delivery.clientPhone}`} className='text-blue-500 hover:underline'>
              {delivery.clientPhone}
            </a>
          </div>
        )}
        <div className='mb-4'>
          <p className='text-gray-700 font-semibold'>Status Atual:</p>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass(delivery.status)}`}
          >
            {formatStatus(delivery.status)}
          </span>
        </div>

        {/* Status Update Section */} 
        <div className='mt-6 border-t pt-6 border-gray-200'>
          <h2 className='text-xl font-bold text-gray-800 mb-4'>Atualizar Status</h2>
          <div className='flex flex-col sm:flex-row gap-4 items-end'>
            <div className='flex-grow w-full'>
              <label htmlFor='status-select' className='block text-gray-700 font-semibold mb-2'>
                Novo Status
              </label>
              <select
                id='status-select'
                value={selectedStatus}
                onChange={handleStatusChange}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                disabled={isUpdatingStatus || !delivery}
              >
                {deliveryStatusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleUpdateStatus}
              disabled={isUpdatingStatus || !selectedStatus || selectedStatus === delivery.status}
              className={`bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto ${ (isUpdatingStatus || !selectedStatus || selectedStatus === delivery.status) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isUpdatingStatus ? 'Atualizando...' : 'Atualizar Status'}
            </button>
          </div>
          {statusUpdateError && (
            <p className='text-red-500 text-sm mt-2'>{statusUpdateError}</p>
          )}
        </div>

        <button
          onClick={() => {
            // TODO trazer link direto do back
            const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(delivery.deliveryAddress)}`;
            window.open(googleMapsUrl, '_blank');
          }}
          className='mt-6 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full'
        >
          Abrir Rota no Maps
        </button>
        <button
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(delivery.deliveryAddress);
              alert(`"${delivery.deliveryAddress}" copiado para a área de transferência!`);
            } catch (err) {
              console.error('Falha ao copiar o endereço:', err);
              alert('Não foi possível copiar o endereço. Por favor, copie manualmente.');
            }
          }}
          className='mt-2 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full'
        >
          Copiar Endereço
        </button>
        <button
          onClick={() => navigate(-1)}
          className='mt-6 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full'
        >
          Voltar para o Dashboard
        </button>
      </div>
    </div>
  );
};

export default DeliveryDetailsPage;

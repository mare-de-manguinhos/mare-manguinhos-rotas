import React from 'react';
import type { Delivery } from '../types/delivery';

interface DeliveryListItemProps {
  delivery: Delivery;
  onClick?: (deliveryId: string) => void;
}

const DeliveryListItem: React.FC<DeliveryListItemProps> = ({ delivery, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(delivery.id);
    }
  };

  return (
    <div
      className='bg-white p-4 rounded-lg shadow-md mb-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200'
      onClick={handleClick}
    >
      <div className='flex justify-between items-center mb-2'>
        <h3 className='text-lg font-semibold text-gray-800'>{delivery.clientName}</h3>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${delivery.status === 'PENDENTE' ? 'bg-yellow-100 text-yellow-800' : delivery.status === 'SAIU_PARA_ENTREGA' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}
        >
          {delivery.status.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}
        </span>
      </div>
      <p className='text-gray-600 text-sm mb-2'>{delivery.addressSummary}</p>
      {/* Add more details as needed for a summary view */}
    </div>
  );
};

export default DeliveryListItem;

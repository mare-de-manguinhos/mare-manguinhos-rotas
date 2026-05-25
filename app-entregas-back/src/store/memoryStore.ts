import { v4 as uuidv4 } from 'uuid';
import {
  User,
  Delivery,
  DeliveryStatus,
  Coordinate,
  RouteCoordinates,
} from '../types';

interface MemoryStoreState {
  users: User[];
  deliveries: Delivery[];
}

// --- Mock Data Initialization ---

const initialUsers: User[] = [
  {
    id: 'driver-entregador',
    name: 'Entregador Lima',
    email: 'entrega@mail.com',
    password: '123',
  }
];

// Helper to create mock deliveries
const createMockDeliveries = (driverId: string, count: number): Delivery[] => {
  const deliveries: Delivery[] = [];
  const statuses: DeliveryStatus[] = Object.values(DeliveryStatus);

  for (let i = 0; i < count; i++) {
    const status = i < count - 1 ? statuses[Math.floor(Math.random() * (statuses.length - 1))] : DeliveryStatus.COMPLETED; // Ensure one is COMPLETED
    const pickupLat = -20.1896 + Math.random() * 0.1;
    const pickupLng = -40.1913 + Math.random() * 0.1;
    const deliveryLat = -20.1979 + Math.random() * 0.1;
    const deliveryLng = -40.2177 + Math.random() * 0.1;
    const clientNumber = Math.round(Math.random() * 1000);

    deliveries.push({
      id: uuidv4(),
      driverId: driverId,
      clientName: `Cliente ${clientNumber}`,
      pickupAddress: `Endereço ${clientNumber} de Coleta`,
      deliveryAddress: `Av. dos Sabiás, ${clientNumber} - Morada de Laranjeiras, Serra - ES`,
      status: status as DeliveryStatus,
      price: 50.0 + Math.random() * 50.0,
      coordinates: {
        pickup: { lat: pickupLat, lng: pickupLng },
        delivery: { lat: deliveryLat, lng: deliveryLng },
      },
      createdAt: new Date(Date.now() - Math.random() * 100000000).toISOString(),
      ...(status === DeliveryStatus.COMPLETED && { completedAt: new Date().toISOString() }),
    });
  }
  return deliveries;
};

const initialDeliveries: Delivery[] = [
  ...createMockDeliveries('driver-entregador', 6), // 3 PENDING, 1 COMPLETED
];

// Ensure the fixed COMPLETED delivery has its completedAt timestamp if it was randomly assigned
initialDeliveries.forEach(delivery => {
  if (delivery.status === DeliveryStatus.COMPLETED && !delivery.completedAt) {
    delivery.completedAt = new Date().toISOString();
  }
});

// --- State Management ---

let store: MemoryStoreState = {
  users: initialUsers,
  deliveries: initialDeliveries,
};

// --- Public API for Store Access ---

const getUsers = (): User[] => store.users;

const findUserByEmail = (email: string): User | undefined => {
  return store.users.find(user => user.email === email);
};

const getDeliveries = (driverId?: string): Delivery[] => {
  if (driverId) {
    return store.deliveries.filter(delivery => delivery.driverId === driverId);
  }
  return store.deliveries;
};

const findDeliveryById = (id: string): Delivery | undefined => {
  return store.deliveries.find(delivery => delivery.id === id);
};

const getFirstDelivery = (): Delivery | undefined => {
  return store.deliveries[0];
};

const addDelivery = (deliveryData: Omit<Delivery, 'id' | 'createdAt' | 'status' | 'completedAt'>): Delivery => {
  const newDelivery: Delivery = {
    ...deliveryData,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    status: DeliveryStatus.PENDING,
    completedAt: undefined,
  };
  store.deliveries.push(newDelivery);
  return newDelivery;
};

const updateDeliveryStatus = (id: string, newStatus: DeliveryStatus): Delivery | undefined => {
  const delivery = findDeliveryById(id);
  if (!delivery) {
    return undefined;
  }

  delivery.status = newStatus;
  if (newStatus === DeliveryStatus.COMPLETED) {
    delivery.completedAt = new Date().toISOString();
  } else {
    delivery.completedAt = undefined; // Clear completion date if status changes from COMPLETED
  }

  return delivery;
};

const updateDelivery = (id: string, updatedData: Partial<Omit<Delivery, 'id' | 'createdAt' | 'completedAt' | 'status'>>): Delivery | undefined => {
  const delivery = findDeliveryById(id);
  if (!delivery) {
    return undefined;
  }

  // Merge provided data, but do not allow changing id, createdAt, completedAt, or status directly via this method
  // Status changes should use updateDeliveryStatus
  // completedAt is set by updateDeliveryStatus
  // createdAt is immutable
  Object.assign(delivery, updatedData);

  // Re-apply status logic if it was potentially changed indirectly, though ideally it shouldn't be.
  // If 'status' is in updatedData, it's a potential conflict. We prioritize updateDeliveryStatus for explicit status changes.
  // For simplicity here, we assume 'status' won't be part of the Partial<Omit<...>> for this method.

  return delivery;
};


const deleteDelivery = (id: string): boolean => {
  const initialLength = store.deliveries.length;
  store.deliveries = store.deliveries.filter(delivery => delivery.id !== id);
  return store.deliveries.length < initialLength;
};

export {
  getUsers,
  findUserByEmail,
  getDeliveries,
  findDeliveryById,
  getFirstDelivery,
  addDelivery,
  updateDeliveryStatus,
  updateDelivery,
  deleteDelivery,
  User,
  Delivery,
  DeliveryStatus,
  Coordinate,
  RouteCoordinates,
  MemoryStoreState // Export for potential future use or testing
};

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

const initialUsers: User[] = [
  {
    id: 'driver-carlos',
    name: 'Carlos Silva',
    email: 'carlos@entrega.com',
    password: '123',
  },
  {
    id: 'driver-marcos',
    name: 'Marcos Souza',
    email: 'marcos@entrega.com',
    password: '123',
  },
];

const carlosDeliveries: Delivery[] = [
  {
    id: uuidv4(),
    driverId: 'driver-carlos',
    clientName: 'Ana Paula Santos',
    pickupAddress: 'Rua Timbó, 120 - Bonsucesso, Espírito Santo - ES',
    deliveryAddress: 'Rua Nova Holanda, 328 - Complexo da Maré, Espírito Santo - ES',
    status: DeliveryStatus.PENDING,
    price: 18.5,
    coordinates: {
      pickup: { lat: -22.8610, lng: -43.2540 },
      delivery: { lat: -22.8560, lng: -43.2510 },
    },
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: uuidv4(),
    driverId: 'driver-carlos',
    clientName: 'José Roberto Lima',
    pickupAddress: 'Av. Brasil, 4365 - Manguinhos, Espírito Santo - ES',
    deliveryAddress: 'Rua Rubens Vaz, 45 - Complexo da Maré, Espírito Santo - ES',
    status: DeliveryStatus.PENDING,
    price: 22.0,
    coordinates: {
      pickup: { lat: -22.8740, lng: -43.2390 },
      delivery: { lat: -22.8570, lng: -43.2520 },
    },
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: uuidv4(),
    driverId: 'driver-carlos',
    clientName: 'Maria Clara Oliveira',
    pickupAddress: 'Rua Leopoldo Bulhões, 1480 - Manguinhos, Espírito Santo - ES',
    deliveryAddress: 'Rua da Bela Vista, 78 - Complexo da Maré, Espírito Santo - ES',
    status: DeliveryStatus.PENDING,
    price: 15.0,
    coordinates: {
      pickup: { lat: -22.8745, lng: -43.2385 },
      delivery: { lat: -22.8555, lng: -43.2500 },
    },
    createdAt: new Date(Date.now() - 10800000).toISOString(),
  },
  {
    id: uuidv4(),
    driverId: 'driver-carlos',
    clientName: 'Pedro Henrique Costa',
    pickupAddress: 'Av. Dom Hélder Câmara, 1500 - Manguinhos, Espírito Santo - ES',
    deliveryAddress: 'Rua Itamarati, 150 - Benfica, Espírito Santo - ES',
    status: DeliveryStatus.PENDING,
    price: 28.0,
    coordinates: {
      pickup: { lat: -22.8738, lng: -43.2392 },
      delivery: { lat: -22.8600, lng: -43.2480 },
    },
    createdAt: new Date(Date.now() - 14400000).toISOString(),
  },
  {
    id: uuidv4(),
    driverId: 'driver-carlos',
    clientName: 'Fernanda Souza',
    pickupAddress: 'Rua Gravatai, 23 - Bonsucesso, Espírito Santo - ES',
    deliveryAddress: 'Av. Rio de Janeiro, 500 - Complexo da Maré, Espírito Santo - ES',
    status: DeliveryStatus.PENDING,
    price: 20.5,
    coordinates: {
      pickup: { lat: -22.8615, lng: -43.2545 },
      delivery: { lat: -22.8565, lng: -43.2515 },
    },
    createdAt: new Date(Date.now() - 18000000).toISOString(),
  },
  {
    id: uuidv4(),
    driverId: 'driver-carlos',
    clientName: 'Ricardo Alves',
    pickupAddress: 'Av. Suburbana, 1200 - Del Castilho, Espírito Santo - ES',
    deliveryAddress: 'Rua Nova Holanda, 89 - Complexo da Maré, Espírito Santo - ES',
    status: DeliveryStatus.COMPLETED,
    price: 35.0,
    coordinates: {
      pickup: { lat: -22.8680, lng: -43.2460 },
      delivery: { lat: -22.8550, lng: -43.2505 },
    },
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    completedAt: new Date(Date.now() - 82800000).toISOString(),
  },
];

const marcosDeliveries: Delivery[] = [
  {
    id: uuidv4(),
    driverId: 'driver-marcos',
    clientName: 'Claudia Ferreira',
    pickupAddress: 'Rua Timbó, 250 - Bonsucesso, Espírito Santo - ES',
    deliveryAddress: 'Rua Rubens Vaz, 120 - Complexo da Maré, Espírito Santo - ES',
    status: DeliveryStatus.PENDING,
    price: 19.0,
    coordinates: {
      pickup: { lat: -22.8612, lng: -43.2542 },
      delivery: { lat: -22.8562, lng: -43.2512 },
    },
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: uuidv4(),
    driverId: 'driver-marcos',
    clientName: 'Marcelo Rodrigues',
    pickupAddress: 'Av. Brasil, 5200 - Manguinhos, Espírito Santo - ES',
    deliveryAddress: 'Rua da Bela Vista, 150 - Complexo da Maré, Espírito Santo - ES',
    status: DeliveryStatus.PENDING,
    price: 24.0,
    coordinates: {
      pickup: { lat: -22.8742, lng: -43.2388 },
      delivery: { lat: -22.8558, lng: -43.2508 },
    },
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: uuidv4(),
    driverId: 'driver-marcos',
    clientName: 'Tatiana Barbosa',
    pickupAddress: 'Rua Leopoldo Bulhões, 900 - Manguinhos, Espírito Santo - ES',
    deliveryAddress: 'Av. Rio de Janeiro, 780 - Complexo da Maré, Espírito Santo - ES',
    status: DeliveryStatus.PENDING,
    price: 17.5,
    coordinates: {
      pickup: { lat: -22.8743, lng: -43.2387 },
      delivery: { lat: -22.8567, lng: -43.2517 },
    },
    createdAt: new Date(Date.now() - 10800000).toISOString(),
  },
  {
    id: uuidv4(),
    driverId: 'driver-marcos',
    clientName: 'Eduardo Gomes',
    pickupAddress: 'Av. Dom Hélder Câmara, 800 - Manguinhos, Espírito Santo - ES',
    deliveryAddress: 'Rua Nova Holanda, 450 - Complexo da Maré, Espírito Santo - ES',
    status: DeliveryStatus.PENDING,
    price: 31.0,
    coordinates: {
      pickup: { lat: -22.8736, lng: -43.2394 },
      delivery: { lat: -22.8554, lng: -43.2504 },
    },
    createdAt: new Date(Date.now() - 14400000).toISOString(),
  },
  {
    id: uuidv4(),
    driverId: 'driver-marcos',
    clientName: 'Simone Pereira',
    pickupAddress: 'Rua Gravatai, 78 - Bonsucesso, Espírito Santo - ES',
    deliveryAddress: 'Rua Rubens Vaz, 200 - Complexo da Maré, Espírito Santo - ES',
    status: DeliveryStatus.PENDING,
    price: 21.0,
    coordinates: {
      pickup: { lat: -22.8617, lng: -43.2547 },
      delivery: { lat: -22.8568, lng: -43.2518 },
    },
    createdAt: new Date(Date.now() - 18000000).toISOString(),
  },
  {
    id: uuidv4(),
    driverId: 'driver-marcos',
    clientName: 'Bruno Nascimento',
    pickupAddress: 'Av. Suburbana, 600 - Del Castilho, Espírito Santo - ES',
    deliveryAddress: 'Rua Itamarati, 300 - Benfica, Espírito Santo - ES',
    status: DeliveryStatus.COMPLETED,
    price: 38.0,
    coordinates: {
      pickup: { lat: -22.8682, lng: -43.2462 },
      delivery: { lat: -22.8602, lng: -43.2482 },
    },
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    completedAt: new Date(Date.now() - 82800000).toISOString(),
  },
];

let store: MemoryStoreState = {
  users: initialUsers,
  deliveries: [...carlosDeliveries, ...marcosDeliveries],
};

const TERMINAL_STATUSES: DeliveryStatus[] = [
  DeliveryStatus.COMPLETED,
  DeliveryStatus.ADDRESS_NOT_FOUND,
  DeliveryStatus.CLIENT_NOT_FOUND,
  DeliveryStatus.CANCELED,
];

const getUsers = (): User[] => store.users;

const findUserByEmail = (email: string): User | undefined =>
  store.users.find(user => user.email === email);

const getDeliveries = (driverId?: string): Delivery[] => {
  if (driverId) {
    return store.deliveries.filter(d => d.driverId === driverId);
  }
  return store.deliveries;
};

const getDeliveryHistory = (driverId?: string): Delivery[] => {
  const deliveries = getDeliveries(driverId);
  return deliveries.filter(d => TERMINAL_STATUSES.includes(d.status));
};

const getPendingDeliveries = (driverId?: string): Delivery[] => {
  const deliveries = getDeliveries(driverId);
  return deliveries.filter(d => !TERMINAL_STATUSES.includes(d.status));
};

const findDeliveryById = (id: string): Delivery | undefined =>
  store.deliveries.find(d => d.id === id);

const getFirstDelivery = (): Delivery | undefined => store.deliveries[0];

const addDelivery = (
  deliveryData: Omit<Delivery, 'id' | 'createdAt' | 'status' | 'completedAt'>
): Delivery => {
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
  if (!delivery) return undefined;

  delivery.status = newStatus;
  if (TERMINAL_STATUSES.includes(newStatus)) {
    delivery.completedAt = new Date().toISOString();
  } else {
    delivery.completedAt = undefined;
  }

  return delivery;
};

const updateDelivery = (
  id: string,
  updatedData: Partial<Omit<Delivery, 'id' | 'createdAt' | 'completedAt' | 'status'>>
): Delivery | undefined => {
  const delivery = findDeliveryById(id);
  if (!delivery) return undefined;
  Object.assign(delivery, updatedData);
  return delivery;
};

const deleteDelivery = (id: string): boolean => {
  const initial = store.deliveries.length;
  store.deliveries = store.deliveries.filter(d => d.id !== id);
  return store.deliveries.length < initial;
};

export {
  getUsers,
  findUserByEmail,
  getDeliveries,
  getDeliveryHistory,
  getPendingDeliveries,
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
  MemoryStoreState,
};

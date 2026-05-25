interface Coordinate {
  lat: number;
  lng: number;
}

interface RouteCoordinates {
  pickup: Coordinate;
  delivery: Coordinate;
}

interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // For in-memory storage and auth checks
}

enum DeliveryStatus {
  PENDING = 'PENDENDTE',
  DELIVERING = 'SAIU_PARA_ENTREGA',
  COMPLETED = 'ENTREGUE',
  ADDRESS_NOT_FOUND = 'ENDERECO_NAO_ENCONTRADO',
  CLIENT_NOT_FOUND = 'CLIENTE_NAO_ENCONTRADO',
  CANCELED = 'CANCELADA',
}

interface Delivery {
  id: string;
  driverId: string;
  clientName: string;
  pickupAddress: string;
  deliveryAddress: string;
  status: DeliveryStatus;
  price: number;
  coordinates: RouteCoordinates;
  createdAt: string; // ISO string format
  completedAt?: string; // ISO string format
}

export {
  Coordinate,
  RouteCoordinates,
  User,
  DeliveryStatus,
  Delivery,
};

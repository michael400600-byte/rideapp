export const APP_NAME = 'RideApp';
export const API_BASE_URL = 'http://localhost:3000/api';
export const SOCKET_URL = 'http://localhost:3000';

export const DEFAULT_LOCATION = {
  latitude: 19.4326,
  longitude: -99.1332,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export const RIDE_TYPES = {
  ECONOMY: { id: 'economy', name: 'Economico', icon: 'car-outline', multiplier: 1.0, description: '4 pasajeros', eta: '3-5 min' },
  COMFORT: { id: 'comfort', name: 'Comfort', icon: 'car-sport-outline', multiplier: 1.4, description: '4 pasajeros - AC', eta: '5-8 min' },
  PREMIUM: { id: 'premium', name: 'Premium', icon: 'car-sport', multiplier: 2.0, description: '4 pasajeros - Lujo', eta: '8-12 min' },
  XL: { id: 'xl', name: 'XL', icon: 'bus-outline', multiplier: 1.8, description: '6 pasajeros', eta: '5-10 min' },
};

export const PRICING = { baseFare: 25, perKm: 8, perMinute: 2, minimumFare: 35, bookingFee: 10, negotiationRange: 0.3 };

export const PAYMENT_METHODS = {
  CASH: { id: 'cash', name: 'Efectivo', icon: 'cash-outline' },
  CARD: { id: 'card', name: 'Tarjeta', icon: 'card-outline' },
  WALLET: { id: 'wallet', name: 'Billetera', icon: 'wallet-outline' },
};

import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const api = axios.create({ baseURL: API_BASE_URL, timeout: 15000, headers: { 'Content-Type': 'application/json' } });

let authToken = null;
export const setAuthToken = (token) => { authToken = token; if (token) { api.defaults.headers.common['Authorization'] = `Bearer ${token}`; } else { delete api.defaults.headers.common['Authorization']; } };

api.interceptors.response.use((response) => response.data, (error) => { if (error.response?.status === 401) setAuthToken(null); return Promise.reject({ status: error.response?.status || 0, message: error.response?.data?.message || 'Error de conexion' }); });

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data),
};

export const ridesAPI = {
  requestRide: (data) => api.post('/rides', data),
  acceptRide: (rideId) => api.put(`/rides/${rideId}/accept`),
  counterOffer: (rideId, data) => api.put(`/rides/${rideId}/counter-offer`, data),
  startRide: (rideId) => api.put(`/rides/${rideId}/start`),
  completeRide: (rideId, data) => api.put(`/rides/${rideId}/complete`, data),
  cancelRide: (rideId, data) => api.put(`/rides/${rideId}/cancel`, data),
  rateRide: (rideId, data) => api.post(`/rides/${rideId}/rate`, data),
  getHistory: (params) => api.get('/rides/history', { params }),
  getNearbyDrivers: (params) => api.get('/rides/nearby-drivers', { params }),
};

export default api;

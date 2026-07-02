import { io } from 'socket.io-client';
import { SOCKET_URL } from '../utils/constants';

class SocketService {
  constructor() { this.socket = null; }
  connect(userId, role) { this.socket = io(SOCKET_URL, { transports: ['websocket'], query: { userId, role } }); return this.socket; }
  disconnect() { if (this.socket) { this.socket.disconnect(); this.socket = null; } }
  goOnline(driverId, location) { this.socket?.emit('driver:online', { driverId, location }); }
  goOffline() { this.socket?.emit('driver:offline'); }
  updateLocation(location, rideId) { this.socket?.emit('driver:location_update', { location, rideId }); }
  acceptRide(rideId, driver, eta) { this.socket?.emit('ride:accept', { rideId, driver, eta }); }
  sendCounterOffer(rideId, driverId, driverName, counterPrice, originalPrice) { this.socket?.emit('ride:counter_offer', { rideId, driverId, driverName, counterPrice, originalPrice }); }
  requestRide(data) { this.socket?.emit('ride:request', data); }
  cancelRide(rideId, cancelledBy, reason) { this.socket?.emit('ride:cancel', { rideId, cancelledBy, reason }); }
  sendMessage(rideId, senderId, message) { this.socket?.emit('chat:message', { rideId, senderId, message }); }
  onNewRequest(cb) { this.socket?.on('ride:new_request', cb); }
  onRideAccepted(cb) { this.socket?.on('ride:accepted', cb); }
  onCounterOffer(cb) { this.socket?.on('ride:counter_offer_received', cb); }
  onDriverLocation(cb) { this.socket?.on('ride:driver_location', cb); }
  onRideStarted(cb) { this.socket?.on('ride:started', cb); }
  onRideCompleted(cb) { this.socket?.on('ride:completed', cb); }
  onRideCancelled(cb) { this.socket?.on('ride:cancelled', cb); }
  onNewMessage(cb) { this.socket?.on('chat:new_message', cb); }
  off(event) { this.socket?.off(event); }
}

export default new SocketService();

import axios from 'axios';
const API_URL = 'http://localhost:5000/api';
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});
// Auth API
export const login = async (email: string, password: string) => {
  return api.post('/login', {
    email,
    password
  });
};
// User API
export const getUserProfile = async (userId: number) => {
  return api.get(`/users/${userId}`);
};
export const updateUserProfile = async (userId: number, userData: any) => {
  return api.put(`/users/${userId}`, userData);
};
// Routes API
export const getAllRoutes = async () => {
  return api.get('/routes');
};
export const getRouteById = async (routeId: string) => {
  return api.get(`/routes/${routeId}`);
};
// Trip History API
export const getUserTrips = async (userId: number) => {
  return api.get(`/users/${userId}/trips`);
};
// Notifications API
export const getUserNotifications = async (userId: number) => {
  return api.get(`/users/${userId}/notifications`);
};
// Forum API
export const getForumChannels = async () => {
  return api.get('/forum/channels');
};
export const getChannelMessages = async (channelId: string) => {
  return api.get(`/forum/channels/${channelId}/messages`);
};
export const sendChannelMessage = async (channelId: string, userId: number, text: string) => {
  return api.post(`/forum/channels/${channelId}/messages`, {
    userId,
    text
  });
};
export const getForumUsers = async () => {
  return api.get('/forum/users');
};
// Payment Methods API
export const getUserPaymentMethods = async (userId: number) => {
  return api.get(`/users/${userId}/payment-methods`);
};
export const addUserPaymentMethod = async (userId: number, paymentData: any) => {
  return api.post(`/users/${userId}/payment-methods`, paymentData);
};
// Top-up API
export const topUpUserBalance = async (userId: number, amount: number) => {
  return api.post(`/users/${userId}/topup`, {
    amount
  });
};
export default api;
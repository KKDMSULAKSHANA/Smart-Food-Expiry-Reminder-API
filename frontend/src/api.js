import axios from 'axios';

const api = axios.create({
  // No need for full URL since we use proxy in Vite config
  baseURL: '/api',
});

// Food APIs
export const fetchFoods = () => api.get('/food/getfoods');
export const createFood = (foodData) => api.post('/food/createfood', foodData);
export const updateFood = (id, foodData) => api.put(`/food/updatefood/${id}`, foodData);
export const deleteFood = (id) => api.delete(`/food/deletefood/${id}`);
export const fetchExpiringFoods = () => api.get('/food/expiring');

// User APIs
export const fetchUsers = () => api.get('/user/getallusers');
export const createUser = (userData) => api.post('/user/create', userData);

export default api;

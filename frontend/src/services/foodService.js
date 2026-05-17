import api from '../api/axios';

const foodService = {
  getAllFoods: async () => {
    const response = await api.get('/food/getfoods');
    return response.data;
  },
  
  createFood: async (foodData) => {
    const response = await api.post('/food/createfood', foodData);
    return response.data;
  },
  
  updateFood: async (id, foodData) => {
    const response = await api.put(`/food/updatefood/${id}`, foodData);
    return response.data;
  },
  
  deleteFood: async (id) => {
    const response = await api.delete(`/food/deletefood/${id}`);
    return response.data;
  },
  
  getExpiringFoods: async () => {
    const response = await api.get('/food/expiring');
    return response.data;
  }
};

export default foodService;

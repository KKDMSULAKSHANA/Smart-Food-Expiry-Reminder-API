import api from '../api/axios';

const userService = {
  getAllUsers: async () => {
    const response = await api.get('/user/getallusers');
    return response.data;
  },
  
  createUser: async (userData) => {
    const response = await api.post('/user/create', userData);
    return response.data;
  },
  
  updateUser: async (id, userData) => {
    const response = await api.put(`/user/updateuser/${id}`, userData);
    return response.data;
  },
  
  deleteUser: async (id) => {
    const response = await api.delete(`/user/deleteuser/${id}`);
    return response.data;
  }
};

export default userService;

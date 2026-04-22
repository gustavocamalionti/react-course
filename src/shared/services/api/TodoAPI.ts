import axios from 'axios';

const axiosInstance = axios.create();

export const TodoAPI = {
  async getAll() {
    const response = await axiosInstance.get('/api/todos');
    return response.data.todos;
  },

  async create() {
    const response = await axiosInstance.post('/api/todos', {
      id: 1,
      label: 'Teste Axios',
      complete: true,
    });
    return response.data;
  },

  async find(id: string) {
    const response = await axiosInstance.get('/api/todos/' + id);
    return response.data;
  },

  async update(id: string) {
    const response = await axiosInstance.put('/api/todos/' + id, {
      label: 'Teste Nome Alterado',
      complete: true,
    });
    return response.data;
  },

  async delete(id: String) {
    const response = await axiosInstance.delete('/api/todos/' + id);

    return response.data;
  },
};

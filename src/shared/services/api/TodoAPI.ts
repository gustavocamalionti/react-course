import axios from 'axios';

const axiosInstance = axios.create();

interface ITodo {
  id: string;
  label: string;
  complete: boolean;
}

interface ITodoWithoutId {
  label: string;
  complete: boolean;
}

export const TodoAPI = {
  async getAll() {
    const response = await axiosInstance.get('/api/todos');
    return response.data.todos as ITodo[];
  },

  async create(data: ITodoWithoutId) {
    const response = await axiosInstance.post('/api/todos', data);
    return response.data as ITodo[];
  },

  async findById(id: string) {
    const response = await axiosInstance.get('/api/todos/' + id);
    return response.data as ITodo[];
  },

  async updateById(id: string, data: Partial<ITodoWithoutId>) {
    await axiosInstance.put('/api/todos/' + id, data);
    return;
  },

  async deleteById(id: String) {
    await axiosInstance.delete('/api/todos/' + id);

    return;
  },
};

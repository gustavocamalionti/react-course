import { createServer, Model } from 'miragejs';

createServer({
  models: {
    todos: Model,
  },
  seeds(server) {
    const todosAsString = localStorage.getItem('MOCK_TODOS');
    if (todosAsString == null) return;

    const todos = JSON.parse(todosAsString);

    todos.models.forEach((todo: {}) => {
      server.schema.create('todos', todo);
    });
  },

  routes() {
    this.namespace = 'api';

    this.get('/todos', (schema) => {
      return schema.all('todos');
    });

    this.get('/todos/:id', (schema, request) => {
      const id = request.params.id;
      return schema.find('todos', id);
    });

    this.post('/todos', (schema, request) => {
      const data = JSON.parse(request.requestBody);
      const todo = schema.create('todos', data);

      const todos = schema.all('todos');
      localStorage.setItem('MOCK_TODOS', JSON.stringify(todos));
      return todo;
    });

    this.put('/todos/:id', (schema, request) => {
      const id = request.params.id;
      const data = JSON.parse(request.requestBody);
      const todo = schema.find('todos', id);
      todo?.update(data);
      const todos = schema.all('todos');
      localStorage.setItem('MOCK_TODOS', JSON.stringify(todos));
      return {};
    });

    this.delete('/todos/:id', (schema, request) => {
      const id = request.params.id;
      const todo = schema.find('todos', id);
      todo?.destroy();
      const todos = schema.all('todos');
      localStorage.setItem('MOCK_TODOS', JSON.stringify(todos));
      return {};
    });
  },
});

import { createServer, Model } from 'miragejs';

createServer({
  models: {
    todos: Model,
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
      return todo;
    });

    this.put('/todos/:id', (schema, request) => {
      const id = request.params.id;
      const data = JSON.parse(request.requestBody);
      const todo = schema.find('todos', id);
      todo?.update(data);
      return {};
    });

    this.delete('/todos/:id', (schema, request) => {
      const id = request.params.id;
      const todo = schema.find('todos', id);
      todo?.destroy();
      return {};
    });
  },
});

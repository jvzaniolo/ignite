import faker from 'faker';
import { Factory, Model, Server } from 'miragejs';

type User = {
  name: string;
  email: string;
  created_at: string;
};

export default function makeServer({ environment = 'development' } = {}) {
  return new Server({
    environment,

    models: {
      user: Model.extend<Partial<User>>({}),
    },

    factories: {
      user: Factory.extend({
        name: () => faker.name.firstName(),
        email: () => faker.internet.email().toLowerCase(),
        createdAt: () => faker.date.recent(10),
      }),
    },

    seeds(server) {
      server.createList('user', 20);
    },

    routes() {
      this.timing = 750;
      this.namespace = 'api';

      this.get('/users');
      this.post('/users');

      this.namespace = '';
      this.passthrough();
    },
  });
}

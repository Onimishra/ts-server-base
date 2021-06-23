import Hapi from '@hapi/hapi';
//@ts-expect-error Blipp does not have types
import Blipp from 'blipp';

import './container';
import routes from './delivery/hapi/index';

const initRestServer = async () => {
  // Create server
  const server = new Hapi.Server({
    host: 'localhost',
    port: 3030,
  });

  // Register plugins
  await server.register({ plugin: Blipp, options: { showAuth: true } });

  // Register routes
  server.route(routes);

  // Start server
  await server.start();
  console.log('Server started');
}

const init = async () => {
  await initRestServer();
}

init();
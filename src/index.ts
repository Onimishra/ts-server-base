import dotenv from 'dotenv';
dotenv.config();

import restServerFactory from './restServer';
import socketServerFactory from './socketServer';

const init = async () => {
  const server = await restServerFactory();
  await socketServerFactory(server);
}

init();
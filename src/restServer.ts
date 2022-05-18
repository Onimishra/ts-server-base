import { AsyncLocalStorage } from 'async_hooks';

import Hapi from '@hapi/hapi';
//@ts-expect-error Blipp does not have types
import Blipp from 'blipp';
import ShortUniqueId from 'short-unique-id';

import container from './container';
import routes from './delivery/hapi/index';
import Logger, { LoggerToken } from './domain/contract/Logger';


const restServerFactory = async () => {
  // Create server
  const server = new Hapi.Server({
    host: 'localhost',
    port: 3030,
  });

  const shortUuid = new ShortUniqueId();
  const logger = container.resolve<Logger>(LoggerToken);

  server.ext('onRequest', (request, h) => {
    // TODO: Get requestId from header, to track acorss services :mvi 2021-02-12
    container.resolve(AsyncLocalStorage).enterWith({ requestId: shortUuid() });
    logger.debug('Starting request');
    return h.continue;
  });

  // Request and error log on top level
  server.events.on('response', (request: Hapi.Request) => {
    // Unfortunately, this event is dispatched at a point where the requestId wrapper no longer applies :mvi
    const { statusCode } = request.response as Hapi.ResponseObject;

    // @ts-expect-error Hapi does not have a way to access the thrown error - this is the only way I could find.
    const error = request.response._error as Boom; // eslint-disable-line

    const traceMessage = `${request.info.remoteAddress} - ${request.method.toUpperCase()} - ${request.url.pathname} : ${statusCode}`;

    if (statusCode >= 500) {
      logger.error(`${traceMessage}\n`, error);
    } else if (statusCode >= 300) {
      logger.warn(`${traceMessage}\n`, error);
    } else {
      logger.trace(traceMessage);
    }
  });

  // Register plugins
  await server.register({ plugin: Blipp, options: { showAuth: true } });

  // Register routes
  server.route(routes);

  // Start server
  await server.start();
  logger.info('Server started');

  return server;
}

export default restServerFactory;
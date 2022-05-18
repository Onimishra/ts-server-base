import Hapi from '@hapi/hapi';
import { Server, Socket } from 'socket.io';

import container from './container';
import socketHandlerFactory from './delivery/socketio/index';
import Logger, { LoggerToken } from './domain/contract/Logger';

export type SocketHandler<T = any> = (event: T, socket: Socket, io: Server) => void;

const socketServerFactory = async (server: Hapi.Server) => {
  const logger: Logger = container.resolve(LoggerToken);

  logger.info('Creating Socket.io service');
  const io = new Server();

  logger.info('Starting WebSocket with loose CORS');
  io.listen(server.listener, {
    cors: {
      origin: '*',
    },
    path: '/ws',
  });

  io.on('connect', (socket) => {
    const handlers = socketHandlerFactory();
    Object.entries(handlers).forEach(([eventName, handler]) => {
      socket.on(eventName, (event: any) => handler(event, socket, io));
    })
  })

  return io;
}

export default socketServerFactory;
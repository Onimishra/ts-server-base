import { SocketHandler } from '../../socketServer';

import ExampleController from './ExampleController';

const socketHandlerFactory = (): Record<string, SocketHandler> => {
  const exampleController = new ExampleController();

  return {
    'example:hello': exampleController.hello,
  };
}

export default socketHandlerFactory;
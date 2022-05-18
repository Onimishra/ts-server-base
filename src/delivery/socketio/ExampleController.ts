import Socketio from 'socket.io';

interface HelloDto {
  target: string;
}

class ExampleController {
  public hello(event: HelloDto, socket: Socketio.Socket) {
    console.log('HELLO', event.target);
  }
}

export default ExampleController;
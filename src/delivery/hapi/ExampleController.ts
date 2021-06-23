import { Request } from '@hapi/hapi';
import { Controller, controller, get } from 'hapi-decorators';
import Container from '../../container';
import ExampleAction from '../../domain/action/ExampleAction';

interface ExampleDto {
  message: string;
  target: string;
}

@controller('/example')
class ExampleController {

  @get('/hello/{target}')
  async sayHello(request: Request): Promise<ExampleDto> {
    const response = await Container.resolve(ExampleAction).go(request.params['target']);

    return {
      message: response,
      target: 'everyone',
    };
  }

}

interface ExampleController extends Controller { }
export default ExampleController;
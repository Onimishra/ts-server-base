import { inject, injectable } from 'tsyringe';
import Logger, { LoggerToken } from '../contract/Logger';

@injectable()
class ExampleAction {
  constructor(@inject(LoggerToken) private logger: Logger) { }

  public async go(target: string): Promise<string> {
    this.logger.info('We are doing work here');
    return 'Hello ' + target;
  }
}

export default ExampleAction;

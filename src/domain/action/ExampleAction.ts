import { injectable } from 'tsyringe';

@injectable()
class ExampleAction {
  public async go(target: string): Promise<string> {
    return 'Hello ' + target;
  }
}

export default ExampleAction;

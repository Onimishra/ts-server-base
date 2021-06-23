/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AsyncLocalStorage } from 'async_hooks';

import { injectable, inject } from 'tsyringe';
import stringifySafe from 'json-stringify-safe';
import chalk from 'chalk';

import Logger from '../domain/contract/Logger';

@injectable()
class ConsoleLogger implements Logger {
  constructor(
    @inject(AsyncLocalStorage) private readonly asyncStorage: AsyncLocalStorage<{ requestId: string | undefined }>,
  ) { }

  private write(func: Console['log'], message: string, e?: any) {
    const requestId = this.asyncStorage.getStore()?.requestId ?? '-CONST-';

    const finalMessage = `${new Date().toISOString()} ${requestId.padStart(7, ' ')} ${message}`;
    if (e) {
      func(finalMessage, e instanceof Error ? e : stringifySafe(e, undefined, 2));
    } else func(finalMessage);
  }

  metric(message: string): void {
    this.write(console.log, `${chalk.white('METRICS')}: ${message}`);
  }

  // This should only be for local development, while developing.
  // The text will get highlighted in the terminal, to make it easier to read
  test(message: string, e?: any): void {
    this.write(console.log, `${chalk.cyanBright('TEST')}:  ${message}`, e);
  }

  debug(message: string, e?: any): void {
    this.write(console.log, `${chalk.gray('DEBUG')}: ${message}`, e);
  }

  trace(message: string, e?: any): void {
    this.write(console.log, `${chalk.green('TRACE')}: ${message}`, e);
  }

  info(message: string, e?: any): void {
    this.write(console.log, `${chalk.blue('INFO')}:  ${message}`, e);
  }

  warn(message: string, e?: any): void {
    this.write(console.warn, `${chalk.yellow('WARN')}:  ${message}`, e);
  }

  error(message: string, e?: any): void {
    this.write(console.error, `${chalk.red('ERROR')}: ${message}`, e);
  }
}

export default ConsoleLogger;

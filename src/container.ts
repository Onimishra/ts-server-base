/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import { AsyncLocalStorage } from 'async_hooks';

import { container } from 'tsyringe';

import config, { ConfigToken } from './config';
import { LoggerToken } from './domain/contract/Logger';
import ConsoleLogger from './external/ConsoleLogger';

// Make contract bindings here
container.registerInstance(ConfigToken, config);
container.registerInstance(AsyncLocalStorage, new AsyncLocalStorage());

container.registerSingleton(LoggerToken, ConsoleLogger);

// End bindings

declare type constructor<T> = { new (...args: any[]): T; };
declare type InjectionToken<T = any> = constructor<T> | string | symbol;
const Container: { resolve<T>(token: InjectionToken<T>): T } = container;

export default Container;
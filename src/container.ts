/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import { container } from 'tsyringe';

// Make contract bindings here

// End bindings

declare type constructor<T> = { new (...args: any[]): T; };
declare type InjectionToken<T = any> = constructor<T> | string | symbol;
const Container: { resolve<T>(token: InjectionToken<T>): T } = container;

export default Container;
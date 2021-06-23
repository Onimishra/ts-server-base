/* eslint-disable @typescript-eslint/no-explicit-any */

interface Logger {
  metric: (message: string) => void;
  test: (message: string, e?: any) => void;
  debug: (message: string, e?: any) => void;
  trace: (message: string, e?: any) => void;
  info: (message: string, e?: any) => void;
  warn: (message: string, e?: any) => void;
  error: (message: string, e?: any) => void;
}

export default Logger;
export const LoggerToken = 'LOGGER_TOKEN';

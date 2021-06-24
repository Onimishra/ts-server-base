const config = {
  env: process.env.APP_ENV ?? 'local',
  logging: {
    levels: process.env.LOG_LEVELS?.split(',').map((level) => level.trim()) ?? [ 'debug', 'trace', 'info', 'warn', 'error' ],
  },
};

export const ConfigToken = 'CONFIG_TOKEN';
export type Config = typeof config;
export default config;
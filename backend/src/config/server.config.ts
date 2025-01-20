export const ServerConfig = {
  port: process.env.PORT || 3000,
  version: process.env.VERSION || '1.0.0',
  env: process.env.ENV || 'dev',
};

export const DbConfig = {
  url: process.env.DB_URL,
};

export const MemoryDbConfig = {
  host: process.env.MEMORY_DB_HOST || 'localhost',
  port: process.env.MEMORY_DB_PORT || 6379,
  password: process.env.MEMORY_DB_PASSWORD || 'admin',
};

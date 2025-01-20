export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  version: process.env.VERSION || '1.0.0',
  env: process.env.ENV || 'dev',
  jwtSecret: process.env.JWT_SECRET || 'secret',
  db: {
    url: process.env.DB_URL || 'mongodb://admin:admin@localhost:27017',
  },
  memoryDb: {
    host: process.env.MEMORY_DB_HOST || 'localhost',
    port: parseInt(process.env.MEMORY_DB_PORT) || 6379,
    password: process.env.MEMORY_DB_PASSWORD || 'admin',
  },
});

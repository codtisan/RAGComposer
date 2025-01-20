import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ServerConfig } from './config/server.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(ServerConfig.port);
}
bootstrap();

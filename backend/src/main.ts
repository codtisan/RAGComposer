import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import ServerConfig from './config/server.config';
import { MongoService } from './database/mongodb';

async function SetupServer() {
  try {
    const mongoService = new MongoService();
    await mongoService.connectAndSetup();
  } catch (error) {
    throw new Error(`Error setting up server: ${error}`);
  }
}

async function bootstrap() {
  await SetupServer();
  const app = await NestFactory.create(AppModule);
  await app.listen(ServerConfig().port);
}
bootstrap();

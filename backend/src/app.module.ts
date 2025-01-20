import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongoService } from './database/mongodb';
import ServerConfig from './config/server.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ServerConfig],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, MongoService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongoService } from './database/mongodb';
import ServerConfig from './config/server.config';
import { RedisService } from './database/redis';
import { UserModule } from './api/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ServerConfig],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, MongoService, RedisService],
})
export class AppModule {}

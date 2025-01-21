import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongoService } from './database/mongodb';
import ServerConfig from './config/server.config';
import { RedisService } from './database/redis';
import { UserModule } from './api/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { FaqModule } from './api/faq/faq.module';
import { ChatModule } from './api/chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ServerConfig],
    }),
    JwtModule.register({
      global: true,
      secret: ServerConfig().jwtSecret,
      signOptions: { expiresIn: '600s' },
    }),
    UserModule,
    FaqModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService, MongoService, RedisService],
})
export class AppModule {}

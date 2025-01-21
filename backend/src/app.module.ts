import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { AuditLogMiddleware } from './middleware/audit-log.middleware';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { SearchService } from './database/elasticsearch';

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
    ElasticsearchModule.register({
      node: [ServerConfig().es.url],
    }),
    UserModule,
    FaqModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService, MongoService, RedisService, SearchService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuditLogMiddleware).forRoutes('*');
  }
}

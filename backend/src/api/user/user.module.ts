import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongoService } from 'src/database/mongodb';
import { RedisService } from 'src/database/redis';

@Module({
  controllers: [UserController],
  providers: [UserService, MongoService, RedisService],
})
export class UserModule {}

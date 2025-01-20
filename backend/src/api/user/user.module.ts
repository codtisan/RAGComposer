import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongoService } from 'src/database/mongodb';

@Module({
  controllers: [UserController],
  providers: [UserService, MongoService],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { MongoService } from 'src/database/mongodb';

@Module({
  providers: [ChatGateway, ChatService, MongoService],
  exports: [ChatService],
})
export class ChatModule {}

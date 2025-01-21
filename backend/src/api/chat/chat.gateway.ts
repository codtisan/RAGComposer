import { WebSocketGateway, SubscribeMessage } from '@nestjs/websockets';
import { ChatService } from './chat.service';

@WebSocketGateway()
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('createChat')
  create() {
    return this.chatService.create();
  }
}

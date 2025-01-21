import { WebSocketGateway, SubscribeMessage, ConnectedSocket } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Socket } from 'dgram';

@WebSocketGateway()
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('StartChat')
  async create(@ConnectedSocket() client: Socket) {
    const answer = await this.chatService.getAnswer();
    client.emit('StartChat', answer);
  }
}

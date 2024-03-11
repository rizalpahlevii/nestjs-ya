import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketService } from './socket.service';

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private readonly socketService: SocketService) {}

  @SubscribeMessage('message')
  async handleMessage(client: Socket, payload: any): Promise<void> {
    this.server.emit('message', payload);
  }

  handleConnection(socket: Socket): void {
    console.log('Client connected :', socket.id);
    this.socketService.handleConnection(socket);
  }
}

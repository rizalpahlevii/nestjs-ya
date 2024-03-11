import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class SocketService {
  private readonly connectedClients: Map<string, Socket> = new Map();

  handleConnection(socket: Socket) {
    const clientId = socket.id;
    this.connectedClients.set(clientId, socket);

    socket.on('disconnect', () => {
      this.connectedClients.delete(clientId);
    });

    socket.on('message', (data) => {
      console.log(data);
    });
  }

  sendMessageToClient(clientEmail: string, message: string) {
    const client = this.connectedClients.get(clientEmail);
    console.log(clientEmail, message, client);
    if (client) {
      client.emit('message', message);
      console.log('Message sent to client');
    }
  }
}

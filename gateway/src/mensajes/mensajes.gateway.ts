import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsResponse,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ cors: { origin: '*' }, namespace: '/' })
export class MensajesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('MensajesGateway');

  // Manejar cuando un cliente se conecta
  handleConnection(client: Socket) {
    this.logger.log(`Cliente conectado: ${client.id}`);
  }

  // Manejar cuando un cliente se desconecta
  handleDisconnect(client: Socket) {
    this.logger.log(`Cliente desconectado: ${client.id}`);
  }

  // Escuchar un mensaje de tipo 'chatMessage'
  @SubscribeMessage('chatMessage')
  handleChatMessage(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket,
  ): WsResponse<string> {
    this.logger.log(`Mensaje recibido: ${message}`);
    // Emitir el mensaje a todos los clientes conectados
    client.broadcast.emit('chatMessage', message);
    return { event: 'chatMessage', data: message };
  }
}

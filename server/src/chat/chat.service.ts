import { Logger } from "@nestjs/common";
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { MessageDto } from "src/dto/message.dto";
import { MessageService } from "src/message/message.service";


@WebSocketGateway()
export class ChatGatewayService implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(private readonly messageService: MessageService) {}

  @WebSocketServer() 
  server: Server;

  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('getAllMessages')
  handleMessage1(@MessageBody() {userId, senderId}): void {
    const messages = this.messageService.getAllUserMessages(userId, senderId);
    this.server.emit('allMessages', messages);
  }
  
  @SubscribeMessage('sendMessage')
  handleMessage(@MessageBody() messageDto: MessageDto): void {
    const message = this.messageService.sendMessage(messageDto)
    this.server.emit('sendedMessage', message);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
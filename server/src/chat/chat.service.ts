// import { Logger } from "@nestjs/common";
// import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
// import { Server, Socket } from "socket.io";
// import { MessageDto } from "src/dto/message.dto";
// import { MessageService } from "src/message/message.service";


// @WebSocketGateway()
// export class ChatGatewayService implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

//   constructor(private readonly messageService: MessageService) { }

//   @WebSocketServer()
//   server: Server;

//   private logger: Logger = new Logger('AppGateway');

//   @SubscribeMessage('getAllMessages')
//   async handleMessage1(@MessageBody() { userId, senderId }): Promise<void> {
//     const messages = await this.messageService.getAllUserMessages(userId, senderId);
//     this.server.emit('allMessages', messages);
//   }

//   @SubscribeMessage('sendMessage')
//   async handleMessage(@MessageBody() messageDto: MessageDto): Promise<void> {
//     const message = await this.messageService.sendMessage(messageDto);
//     const messages = await this.messageService.getAllUserMessages(messageDto.receivedId, messageDto.senderId);
//     this.server.emit('allMessages', messages);
//   }

//   afterInit(server: Server) {
//     this.logger.log('Init');
//   }

//   handleDisconnect(client: Socket) {
//     this.logger.log(`Client disconnected: ${client.id}`);
//   }

//   handleConnection(client: Socket, ...args: any[]) {
//     this.logger.log(`Client connected: ${client.id}`);
//   }
// }
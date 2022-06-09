import { Logger, UseGuards } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import {
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    WebSocketGateway,
    WebSocketServer,
    MessageBody,
} from '@nestjs/websockets'
import { Server } from 'socket.io'
import { JwtAuthGuard } from 'src/components/auth/jwt.auth.guard'
import { MessageService } from 'src/components/message/message.service'
import { MessageDto } from 'src/dto/message.dto'

@WebSocketGateway({ cors: true })
export class ChatGatewayService implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor(private readonly messageService: MessageService, private jwtService: JwtService) {}

    @WebSocketServer()
    server: Server

    private logger: Logger = new Logger('AppGateway')

    @UseGuards(JwtAuthGuard)
    @SubscribeMessage('chat')
    async handleMessage(@MessageBody() messageDto: MessageDto): Promise<void> {
        await this.messageService.sendMessage(messageDto)
        const messages = await this.messageService.findMessages(messageDto.senderId, messageDto.receivedId)
        this.server.emit('chat', messages)
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    afterInit(server: any) {
        this.logger.log('Init')
    }

    handleDisconnect(client: any) {
        this.logger.log(`Client disconnected: ${client.id}`)
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleConnection(client: any, ...args: any[]) {
        this.logger.log(`Client connected: ${client.id}`)
    }
}

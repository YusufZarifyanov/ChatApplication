import { Controller, Delete, Get, Param, Query, Req, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../auth/jwt.auth.guard'
import { MessageService } from './message.service'
import { Request } from 'express'

@UseGuards(JwtAuthGuard)
@Controller('message')
export class MessageController {
    constructor(private readonly messageService: MessageService) {}

    @Get()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async findUserMessages(@Query() { friendId }: any, @Req() request: Request) {
        const { userId }: any = request.user

        return await this.messageService.findMessages(userId, friendId)
    }

    @Get('chat-list')
    public async getUserChatListData(@Req() request: Request) {
        const { userId }: any = request.user

        return await this.messageService.getUserChatListData(userId)
    }

    @Delete(':id')
    public async deleteMessage(@Param('id') id: number) {
        return await this.messageService.deleteMessage(id)
    }
}

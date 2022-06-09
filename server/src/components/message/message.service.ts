import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { MessageDto } from 'src/dto/message.dto'
import { Message } from 'src/entities/message.entity'
import { ChatItemInterface } from 'src/interfaces/chatItemInterface'
import { MessageRepository } from 'src/repositories/message.repository'
import { UserService } from '../user/user.service'

@Injectable()
export class MessageService {
    constructor(private readonly messageRepository: MessageRepository, private readonly userService: UserService) {}

    async findMessages(userId: number, senderId: number): Promise<Message[]> {
        return this.messageRepository.getAllUserMessages(userId, senderId)
    }

    async findMessageById(id: number): Promise<Message> {
        const message = await this.messageRepository.findOne({ id })
        if (!message) {
            throw new HttpException('Сообщения с таким id нет', HttpStatus.NOT_FOUND)
        }

        return message
    }

    async createMessage(messageDto: MessageDto): Promise<Message> {
        const newMessage = this.messageRepository.create(messageDto)
        await this.messageRepository.save(newMessage)

        return newMessage
    }

    async deleteMessage(id: number): Promise<Message> {
        const message = await this.findMessageById(id)
        await this.messageRepository.delete(id)

        return message
    }

    async sendMessage(messageDto: MessageDto): Promise<Message> {
        const { senderId, receivedId } = messageDto

        if (senderId === receivedId) {
            throw new HttpException('Id отправителя и получателя должны отличаться', HttpStatus.NOT_FOUND)
        }

        const newMessage = await this.createMessage(messageDto)

        return newMessage
    }

    async getUserChatListData(userId: number) {
        const messages: Message[] = await this.messageRepository.getMessagesWithCurrentUser(userId)

        const response: ChatItemInterface[] = []

        for (const message of messages) {
            const { senderId, receivedId, text } = message

            //handle sender
            const checkUniqSender = response.find((el) => el.friendId === senderId)

            if (!checkUniqSender && senderId !== userId) {
                const user = await this.userService.findUserById(senderId)
                response.push({
                    friendId: senderId,
                    name: user.name,
                    text,
                    image: user.image,
                })
            }

            //handle received
            const checkUniqReceived = response.find((el) => el.friendId === receivedId || receivedId === userId)

            if (!checkUniqReceived && receivedId !== userId) {
                const user = await this.userService.findUserById(receivedId)
                response.push({
                    friendId: receivedId,
                    name: user.name,
                    text,
                    image: user.image,
                })
            }
        }

        return response
    }
}

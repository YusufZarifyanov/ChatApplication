import { Injectable } from "@nestjs/common";
import { MessageDto } from "src/dto/message.dto";
import { MessageRepository } from "src/repositories/message.repository";

@Injectable()
export class MessageService {
    constructor(
        private readonly messageRepository: MessageRepository
    ) { }

    async sendMessage(messageDto: MessageDto) {
        const message = this.messageRepository.create(messageDto);
        await this.messageRepository.save(message);
        return message;
    }

    async getAllUserMessages(userId: number, senderId: number) {
        console.log(await this.messageRepository.getAllUserMessages(userId, senderId))
        return await this.messageRepository.getAllUserMessages(userId, senderId);
    }
}
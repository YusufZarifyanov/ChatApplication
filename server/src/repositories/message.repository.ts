import { MessageEntity } from "src/entities/message.entity";
import { EntityRepository, Repository } from "typeorm";


@EntityRepository(MessageEntity)
export class MessageRepository extends Repository<MessageEntity> {
   async getAllUserMessages(userId: number, senderId: number) {
        return await this.find({where: {receivedId: userId, senderId}});
    }
}


import { MessageEntity } from "src/entities/message.entity";
import { EntityRepository, Repository } from "typeorm";


@EntityRepository(MessageEntity)
export class MessageRepository extends Repository<MessageEntity> {
    getAllUserMessages(userId: number, senderId: number) {
        return this.createQueryBuilder('message')
            .select('message.senderId', 'senderId')
            .addSelect('message.text', 'text')
            .addSelect('message.receivedId', 'receivedId')
            .where(`("senderId" =:userId and "receivedId" = :senderId) or ("senderId" =:senderId and "receivedId" = :userId)`, { userId, senderId })
            .orderBy("created_at")
            .getRawMany()
    }
}


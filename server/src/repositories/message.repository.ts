import { Message } from 'src/entities/message.entity'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(Message)
export class MessageRepository extends Repository<Message> {
    getAllUserMessages(userId: number, senderId: number) {
        return this.createQueryBuilder('message')
            .select('message.senderId', 'senderId')
            .addSelect('message.text', 'text')
            .addSelect('message.receivedId', 'receivedId')
            .where(
                `("senderId" =:userId and "receivedId" = :senderId) or ("senderId" =:senderId and "receivedId" = :userId)`,
                { userId, senderId },
            )
            .orderBy('created_at')
            .getRawMany()
    }

    getMessagesWithCurrentUser(userId: number) {
        return this.createQueryBuilder('message')
            .select('message.senderId', 'senderId')
            .addSelect('message.text', 'text')
            .addSelect('message.receivedId', 'receivedId')
            .addSelect('message.created_at', 'createdAt')
            .where(
                `
                "senderId" =:userId or "receivedId" =:userId
            `,
                { userId },
            )
            .orderBy('created_at', "DESC")
            .getRawMany()
    }
}

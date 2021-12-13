import { HttpException, HttpStatus } from "@nestjs/common";
import { FriendDto } from "src/dto/friend.dto";
import { FriendEntity } from "src/entities/friends.entity";
import { EntityRepository, Repository } from "typeorm";


@EntityRepository(FriendEntity)
export class FriendRepository extends Repository<FriendEntity> {
    async addFriendToUser(userId: number, friendId: number): Promise<FriendDto> {
        const friend = await this.findOne({userId, friendId});
        if (friend) {
            throw new HttpException("У вас уже есть такой друг", HttpStatus.NOT_FOUND);
        }
        return await this.save({userId, friendId});
    }
}


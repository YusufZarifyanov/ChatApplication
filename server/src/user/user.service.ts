import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserDto } from "src/dto/user.dto";
import { FriendRepository } from "src/repositories/friend.repository";
import { UserRepository } from "src/repositories/user.repository";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly friendRepository: FriendRepository
    ) { }

    async create(createUserDto: UserDto) {
        const newUser = this.userRepository.create(createUserDto);
        await this.userRepository.save(newUser);
        return newUser;
    }

    async findOneByEmail(email: string) {
        const user = await this.userRepository.findOne({ email });
        if (!user) {
            throw new HttpException("Пользователь с таким email не существует", HttpStatus.NOT_FOUND);
        }
        return user;
    }

    async findOneById(id: number) {
        const user = await this.userRepository.findOne({ id });
        if (!user) {
            throw new HttpException("Пользователь с таким id не существует", HttpStatus.NOT_FOUND);
        }
        return user
    }

    async addFriendToUser(userId: number, friendEmail: string) {
        const friendUser = await this.findOneByEmail(friendEmail);

        if (userId === friendUser.id) {
            throw new HttpException("Некорректные данные", HttpStatus.NOT_FOUND);
        }

        const friend = await this.friendRepository.addFriendToUser(userId, friendUser.id);

        const { name, email } = await this.findOneById(friend.friendId);

        return { name, email };
    }

    async getAllUserFriends(userId: number) {
        const friends = await this.friendRepository.find({ userId });
        console.log(friends)
        return await Promise.all(
            friends.map(async friend => {
                const { name, email } = await this.findOneById(friend.friendId);
                return {
                    name, email
                }
            })
        )
    }
}
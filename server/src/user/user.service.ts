import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserDto } from "src/dto/user.dto";
import { UserRepository } from "src/repositories/user.repository";

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository
    ) { }

    async create(createUserDto: UserDto) {
        const newUser = await this.userRepository.create(createUserDto);
        await this.userRepository.save(newUser);
        return newUser;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({ email });
        if (!user) {
            throw new HttpException("Пользователь с таким email не существует", HttpStatus.NOT_FOUND);
        }
        return user;
    }
}
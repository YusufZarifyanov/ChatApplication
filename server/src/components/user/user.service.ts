import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateUserDto } from 'src/dto/user/create-user.dto'
import { UpdateUserDto } from 'src/dto/user/update-user.dto'
import { User } from 'src/entities/user.entity'
import { UserRepository } from 'src/repositories/user.repository'

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async findUsers(): Promise<User[]> {
        return this.userRepository.find()
    }

    async findUserById(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ id })
        if (!user) {
            throw new HttpException('Пользователь с таким id не существует', HttpStatus.NOT_FOUND)
        }

        return user
    }

    async findUserByPhone(phone: string): Promise<User> {
        const user = await this.userRepository.findOne({ phone })
        if (!user) {
            throw new HttpException('Пользователь с таким телефоном не существует', HttpStatus.NOT_FOUND)
        }

        return user
    }

    async createUser(userDto: CreateUserDto): Promise<User> {
        const newUser = this.userRepository.create(userDto)
        await this.userRepository.save(newUser)

        return newUser
    }

    async updateUser(id, userDto: UpdateUserDto): Promise<User> {
        await this.userRepository.update(id, userDto)
        const user = await this.findUserById(id)
        return user
    }

    async deleteUser(id: number): Promise<User> {
        const user = await this.findUserById(id)
        await this.userRepository.delete(id)

        return user
    }
}

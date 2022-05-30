import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from 'src/components/user/user.service'
import * as bcrypt from 'bcryptjs'
import { TokenPayloadInterface } from 'src/interfaces/tokenPayload.interface'
import { CreateUserDto } from 'src/dto/user/create-user.dto'
import { User } from 'src/entities/user.entity'

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

    async register(registrationData: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(registrationData.password, 10)

        try {
            return await this.userService.createUser({
                ...registrationData,
                password: hashedPassword,
            })
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async login(phone: string, password: string) {
        const user = await this.userService.findUserByPhone(phone)

        await this.verifyPasswords(password, user.password)

        return this.generateToken(user)
    }

    async verifyPasswords(password: string, hashedPassword: string) {
        const passwordMatch = await bcrypt.compare(password, hashedPassword)
        if (!passwordMatch) {
            throw new HttpException('Неверный пароль', HttpStatus.BAD_REQUEST)
        }
    }

    async generateToken(user: User) {
        const payload: TokenPayloadInterface = { userId: user.id, phone: user.phone }
        return {
            token: this.jwtService.sign(payload),
            userId: payload.userId,
        }
    }
}

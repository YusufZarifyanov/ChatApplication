import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { UserDto } from "src/dto/user.dto";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcryptjs';
import { TokenPayloadInterface } from "src/interfaces/tokenPayload.interface";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async register(registrationData: UserDto) {
        const hashedPassword = await bcrypt.hash(registrationData.password, 10);

        try {
            const createdUser = await this.userService.create({
                ...registrationData,
                password: hashedPassword
            });
            return {
                ...createdUser,
                status: true
            };
        } catch (e) {
            throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST);
        }
    }

    async login(email: string, password: string) {
        const user = await this.userService.findOneByEmail(email);

        await this.verifyPasswords(password, user.password);

        return this.generateToken(user)
    }

    async verifyPasswords(password: string, hashedPassword: string) {
        const passwordMatch = await bcrypt.compare(password, hashedPassword);
        if (!passwordMatch) {
            throw new HttpException('Неверный пароль', HttpStatus.BAD_REQUEST);
        }
    }

    async generateToken(user: UserDto) {
        const payload: TokenPayloadInterface = { userId: user.id, email: user.email };
        return {
            token: this.jwtService.sign(payload),
            userId: payload.userId
        }
    }
}
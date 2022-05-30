import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "src/dto/user/create-user.dto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    register(@Body() userDto: CreateUserDto) {
       return this.authService.register(userDto);
    }

    @Post('login')
    login(@Body() {phone, password}) {
        return this.authService.login(phone, password)
    }
}
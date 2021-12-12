import { Body, Controller, Post } from "@nestjs/common";
import { UserDto } from "src/dto/user.dto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    register(@Body() userDto: UserDto) {
       return this.authService.register(userDto);
    }

    @Post('login')
    login(@Body() {email, password}) {
        return this.authService.login(email, password)
    }
}
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UploadedFile,
    UseGuards,
    UseInterceptors,
    Req,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { CreateUserDto } from 'src/dto/user/create-user.dto'
import { UpdateUserDto } from 'src/dto/user/update-user.dto'
import { JwtAuthGuard } from '../auth/jwt.auth.guard'
import { UserService } from './user.service'
import { Request } from 'express'

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    public async findUsers() {
        return await this.userService.findUsers()
    }

    @Get(':id')
    public async findUserById(@Param('id') id: number) {
        return await this.userService.findUserById(id)
    }

    @Post()
    public async createUser(@Body() userDto: CreateUserDto) {
        return await this.userService.createUser(userDto)
    }

    @Put(':id')
    public async updateUser(@Param('id') id: number, @Body() userDto: UpdateUserDto) {
        return await this.userService.updateUser(id, userDto)
    }

    @Delete(':id')
    public async deleteUser(@Param('id') id: number) {
        return await this.userService.deleteUser(id)
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('image'))
    uploadImage(@UploadedFile() image, @Req() request: Request) {
        const { userId }: any = request.user

        return this.userService.uploadImage(image, userId)
    }
}

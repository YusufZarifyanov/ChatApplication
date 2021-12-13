import { Controller, Get, Query } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { };

    @Get()
    getUserInfo(@Query() {userId}) {
        return this.userService.findOneById(userId);
    }

    @Get('/friend')
    addFriendToUser(@Query() { userId, friendEmail }) {
        return this.userService.addFriendToUser(userId, friendEmail);
    }

    @Get('/all-friends')
    getAllFriends(@Query() { userId }) {
        return this.userService.getAllUserFriends(userId);
    }

}
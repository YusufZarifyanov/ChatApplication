import { Controller, Get, Query } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { };

    @Get('/friend')
    addFriendToUser(@Query() { userId, friendId }) {
        return this.userService.addFriendToUser(userId, friendId);
    }

    @Get('/all-friends')
    getAllFriends(@Query() { userId }) {
        return this.userService.getAllUserFriends(userId);
    }

}
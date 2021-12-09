import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "src/repositories/user.repository";
import { UserService } from "./user.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository]),
    ],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}
import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { ChatService } from "./chast.service";

@Module({
    imports: [AuthModule],
    providers: [ChatService]
})
export class ChatModule { }
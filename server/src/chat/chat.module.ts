import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { MessageModule } from "src/message/message.module";
import { ChatGatewayService } from "./chat.service";

@Module({
    imports: [MessageModule],
    providers: [ChatGatewayService],
    exports: [ChatGatewayService]
})
export class ChatModule { }
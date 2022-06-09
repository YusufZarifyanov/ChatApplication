import { Module } from "@nestjs/common";
import { AuthModule } from "src/components/auth/auth.module";
import { MessageModule } from "src/components/message/message.module";
import { ChatGatewayService } from "./chat.service";

@Module({
    imports: [MessageModule, AuthModule],
    providers: [ChatGatewayService],
    exports: [ChatGatewayService]
})
export class ChatModule { }
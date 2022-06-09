import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './components/auth/auth.module'
import { DatabaseModule } from './database/database.module'
import { UserModule } from './components/user/user.module'
import { MessageModule } from './components/message/message.module'
import { ChatModule } from './components/chat/chat.module'
import * as path from 'path'
import { ServeStaticModule } from '@nestjs/serve-static'

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),
        DatabaseModule,
        UserModule,
        AuthModule,
        MessageModule,
        ChatModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}

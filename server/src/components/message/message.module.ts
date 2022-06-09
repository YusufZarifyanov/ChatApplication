import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MessageRepository } from 'src/repositories/message.repository'
import { MessageController } from './message.controller'
import { MessageService } from './message.service'
import { AuthModule } from '../auth/auth.module'
import { UserModule } from '../user/user.module'

@Module({
    imports: [TypeOrmModule.forFeature([MessageRepository]), AuthModule, UserModule],
    controllers: [MessageController],
    providers: [MessageService],
    exports: [MessageService],
})
export class MessageModule {}

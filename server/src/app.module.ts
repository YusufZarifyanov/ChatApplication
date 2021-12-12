import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ChatGateway } from './chat.gateway';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule, DatabaseModule, AuthModule, ChatGateway],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

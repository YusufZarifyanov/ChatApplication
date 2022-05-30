import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './components/auth/auth.module';
// import { ChatModule } from './chat/chat.module';
import { DatabaseModule } from './database/database.module';
// import { MessageModule } from './message/message.module';
import { UserModule } from './components/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    // ChatModule,
    // MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

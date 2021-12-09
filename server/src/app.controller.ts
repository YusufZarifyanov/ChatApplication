import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt.auth.guard';
import { UserDto } from './dto/user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
   getHello(@Body() dto: UserDto) {
    return this.appService.getHello(dto);
  }

  @Get('hello')
  @UseGuards(JwtAuthGuard)
  aaa() {
    return this.appService.aaa()
  }
}

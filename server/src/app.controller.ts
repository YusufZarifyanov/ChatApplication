import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  ping() {
    return this.appService.ping();
  }

  @Get('/sms') 
  sendSms(@Query('phone') phone: string) {
    console.log(phone)
    return this.appService.sendSms(phone)
  }
}
